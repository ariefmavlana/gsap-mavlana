import { access, mkdir, writeFile } from "node:fs/promises";
import site from "../content/site.json" with { type: "json" };
import portfolio from "../content/portfolio.json" with { type: "json" };

const sources = [
  ...new Set([
    site.heroImage,
    site.studioImage,
    ...portfolio.projects.flatMap((project) => [
      project.image,
      ...project.gallery,
    ]),
  ]),
].filter((source) => source.startsWith("https://images.unsplash.com/"));
await mkdir(new URL("../public/images/", import.meta.url), { recursive: true });
for (const source of sources) {
  const id = new URL(source).pathname.slice(1);
  await Promise.all(
    [480, 800, 1200, 1800].map(async (width) => {
      const file = new URL(
        `../public/images/${id}-${width}.webp`,
        import.meta.url,
      );
      try {
        await access(file);
        return;
      } catch {
        /* Fetch only missing assets. */
      }
      for (let attempt = 0; attempt < 4; attempt++) {
        try {
          const response = await fetch(
            `${source}?fit=crop&w=${width}&q=82&fm=webp`,
            { signal: AbortSignal.timeout(25000) },
          );
          if (
            !response.ok ||
            !response.headers.get("content-type")?.startsWith("image/")
          )
            throw new Error(`${source}: ${response.status}`);
          await writeFile(file, new Uint8Array(await response.arrayBuffer()));
          break;
        } catch (error) {
          if (attempt === 3) throw error;
        }
      }
    }),
  );
  console.log(`Downloaded ${id} (4 responsive sizes)`);
}
