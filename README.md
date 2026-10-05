# inPrime. — Photography & Film

Website studio foto dan video berbasis **Nuxt 4 / Vue 3, TypeScript, Tailwind CSS 4, dan GSAP 3**. Desain editorial dengan foto besar, warna ivory–charcoal, aksen terracotta, serta animasi yang mengikuti preferensi reduced motion.

## Menjalankan

Gunakan **Node 24 LTS** (`.nvmrc`) dan npm. Node 25 tidak termasuk engine yang didukung Nuxt versi ini.

```sh
npm ci
npm run dev
```

Ikuti URL yang tercetak di terminal (default port 3000). Pada workspace pengembangan ini port 3000 sudah terpakai, sehingga preview dapat memakai port lain.

```sh
npm run test        # Integritas konten, URL, kontak, dan kontrak CMS
npm run typecheck   # Vue + TypeScript strict
npm run build       # SSR dan prerender
npm run generate    # Website statis, hasil: .output/public
npm run format     # Format source
```

Node 24 lokal untuk sesi Windows ini tersimpan di `.runtime/node.exe` dan tidak ikut repository. Untuk memakainya tanpa mengganti instalasi sistem:

```powershell
$env:PATH = "$PWD\.runtime;$env:PATH"
npm run dev
```

## Halaman dan interaksi

- `/`: hero, selected perspectives, film/visual study, layanan, proses kerja, FAQ.
- `/work`: filter kategori yang tersimpan dalam query URL; setiap proyek punya URL sendiri.
- `/work/:slug`: cerita, galeri, kredit, dan navigasi proyek berikutnya.
- `/studio`: profil kolaborasi fotografer, videografer, dan editor.
- `/contact`: validasi form, penyusunan brief, unduh TXT, salin brief; email/WhatsApp muncul setelah kontak asli diisi.
- `/privacy`: penjelasan pemrosesan brief dan kredit gambar.
- `/admin/`: editor Decap CMS, terpisah dari bundle publik.

Form belum mengirim email dari server atau menyimpan lead. Brief dibuat di browser. Email/WhatsApp membuka aplikasi pengguna agar mereka dapat mengirim sendiri. Tidak ada nomor, alamat bisnis, testimoni, harga layanan, atau statistik klien rekaan.

## CMS lokal

Jalankan dua terminal dari root proyek:

```sh
npm run dev
npm run cms
```

Buka `http://localhost:PORT/admin/` dengan port development yang ditampilkan terminal. Klik **Login** pada local backend. Proxy hanya bind ke `127.0.0.1:8081`, dengan CORS default untuk origin localhost; jangan jalankan proxy ini di server publik.

Editor mengubah file yang benar-benar digunakan website:

| Koleksi | File | Konten |
| --- | --- | --- |
| Identity, homepage & services | `content/site.json` | Nama, lokasi, kontak, hero, tentang studio, foto, showreel, layanan, FAQ |
| Portfolio & galleries | `content/portfolio.json` | Proyek, kategori, slug, cerita, cover, galeri, kredit, status visual study |

Upload gambar melalui editor ke `public/uploads`. Gunakan nama file sederhana tanpa spasi. WebP/JPEG yang sudah dioptimalkan dianjurkan; upload CMS tidak otomatis membuat ukuran turunan. URL Unsplash berbentuk `https://images.unsplash.com/photo-...` tanpa query akan diunduh menjadi empat ukuran WebP oleh `npm run assets` (juga dijalankan sebelum build/generate). Setelah menambah URL Unsplash, jalankan perintah itu sebelum preview lokal. Gambar yang sudah tersedia dilewati.

Untuk proyek asli, matikan **Reference study**, isi tahun, cerita, dan kredit yang sesuai. Nilai slug harus unik dan jangan diganti setelah dipublikasikan tanpa menambah redirect. Header dan jumlah proyek mengikuti konten. Beberapa judul editorial dan copy layout ada di komponen Vue; panel tidak mengedit seluruh desain.

`reelUrl` menerima URL HTTPS langsung ke file video, bukan halaman YouTube/Vimeo. Jika kosong, tombol memutar slideshow GSAP yang jelas diberi label *visual study*, bukan showreel klien. Mode reduced motion memakai perpindahan frame manual.

## CMS produksi

Konfigurasi GitHub ada di `public/admin/config.yml` dan mengarah ke repository referensi `ariefmavlana/gsap-mavlana`, branch `main`. Perubahan konten pada branch main perlu melewati pemeriksaan build sebelum dipublikasikan.

1. Simpan implementasi ini di repository/branch tujuan dan sesuaikan `backend.repo` serta `backend.branch` bila berbeda.
2. Konfigurasikan GitHub OAuth melalui hosting yang mendukung Decap atau server OAuth tersendiri. Jika menggunakan server sendiri, set `backend.base_url` dan `backend.auth_endpoint` sesuai dokumentasinya. Secret hanya berada di penyedia autentikasi, tidak di file publik.
3. Pengguna CMS membutuhkan hak push pada repository tersebut. Sambungkan push konten ke build hosting.
4. Uji login, simpan perubahan, build, dan publikasi di preview sebelum mengaktifkan domain utama.

Dokumentasi: [GitHub backend](https://decapcms.org/docs/github-backend/), [proxy lokal](https://decapcms.org/docs/decap-proxy/). OAuth produksi belum diaktifkan. Deployment Vercel melayani website statis; gunakan editor lokal sampai penyedia OAuth dikonfigurasi.

## SEO dan publikasi

Set **domain HTTPS asli** dalam `NUXT_PUBLIC_SITE_URL` pada environment build. Default localhost dan domain sementara *.vercel.app sengaja menghasilkan `noindex, nofollow` dan `Disallow: /` agar preview tidak terindeks.

```sh
NUXT_PUBLIC_SITE_URL=https://DOMAIN-ASLI npm run generate
```

Di PowerShell, set `$env:NUXT_PUBLIC_SITE_URL` sebelum menjalankan build. Upload isi `.output/public` ke hosting statis. `vercel.json` menggunakan npm ci, npm run generate, validasi output, dan .output/public dengan security/cache headers. Vercel memakai VERCEL_PROJECT_PRODUCTION_URL untuk canonical bila NUXT_PUBLIC_SITE_URL belum diisi. Domain *.vercel.app tetap noindex; set domain bisnis HTTPS untuk indexing. Node 24 LTS dipakai di CI dan hosting. netlify.toml dan public/_headers tersedia sebagai alternatif. Jangan menggunakan rewrite semua URL ke homepage berstatus 200 karena itu menimbulkan soft 404.

HTML konten diprerender, termasuk halaman proyek. Metadata per halaman meliputi title, description, canonical tanpa query, Open Graph, Twitter card, `lang=id`, serta Organization dan breadcrumb JSON-LD. Sitemap `/sitemap.xml` mengikuti daftar proyek. Foto hero menggunakan fetch priority tinggi; galeri memakai lazy loading, dimensi eksplisit, dan responsive srcset.

Sebelum domain live: isi kontak dan lokasi asli, ganti visual study dengan portofolio yang memiliki izin publikasi, tambahkan showreel, periksa canonical/robots/sitemap pada hasil build, lalu daftarkan domain di Google Search Console. LocalBusiness schema belum dipasang karena alamat/kota layanan belum diberikan. SEO teknis bukan jaminan peringkat.

## Struktur dan pemeliharaan

- `app/pages`: halaman dan metadata.
- `app/components`: header/footer, gambar, kartu proyek, modal reel.
- `app/composables/useMotion.ts`: lifecycle GSAP, SplitText, ScrollTrigger, matchMedia, cleanup saat navigasi.
- `shared/content.ts`: skema Zod, validasi konten, resolver foto.
- `server/routes`: generator robots dan sitemap.
- `scripts/fetch-assets.mjs`: unduhan foto saat build, tanpa API key.
- `public/admin/vendor/decap-cms.js`: editor Decap 3.16.3 yang diunduh dari distribusi npm resmi; license header upstream dipertahankan. Editor tidak dimuat di halaman pengunjung.

Dependencies dan lockfile dipin untuk build yang dapat diulang. Node punya jalur LTS; Vue, Tailwind, GSAP, dan Nuxt tidak diberi klaim LTS yang tidak dijanjikan vendor. Tinjau pembaruan dependency berkala, uji typecheck/build/interaksi setelah upgrade, lalu deploy melalui preview.

## Referensi GSAP

Ditulis ulang dari arah interaksi [gsap-mavlana](https://github.com/ariefmavlana/gsap-mavlana) commit `c7f2f1a3bc5802690d194772cccbdd194dfc4cc9`:

| Referensi React | Implementasi Vue |
| --- | --- |
| HeroSection + SplitText | Reveal hero per kata dan parallax foto |
| ClipPathTitle / MessageSection | Reveal konten editorial saat memasuki viewport |
| FlavorSlider | Cerita proses horizontal dengan ScrollTrigger pin pada desktop |
| VideoPinSection | Clip-path reveal pada media dan modal film/visual study |
| ScrollSmoother | Scroll native untuk anchor, keyboard, touch, dan reduced motion |

Tidak membawa foto produk, video minuman, font Proxima proprietary, atau ketergantungan React dari referensi.

## Catatan audit

Build dan generate berhasil pada Node 24.21.0. Build Windows menampilkan warning upstream Nitro terkait resolusi cache driver `file:` serta unused imports; build SSR juga menampilkan deprecation warning upstream Vue. Tidak disembunyikan dengan filter log.

Audit npm pada 5 Oktober 2026 menemukan advisory transitif pada **braces <=3.0.3** (nested-pattern denial of service) dan **node-forge <=1.4.0** (verifikasi signature RSA). Registry saat pemeriksaan masih memberikan versi tersebut sebagai latest. Temuan menjalar ke dependency Nuxt melalui tooling glob dan server pengembangan. Jangan memakai `npm audit fix --force` yang mengusulkan downgrade Nuxt ke versi lama. Jalankan ulang `npm audit` sebelum rilis dan upgrade setelah patch kompatibel tersedia.

Pilihan deployment yang disiapkan adalah output statis: pengunjung menerima HTML/CSS/JS/media, tanpa menjalankan Nuxt dev server, Decap proxy, atau dependency Node di server publik. Ini membatasi permukaan runtime; bukan klaim seluruh dependency bebas kerentanan. Login CMS produksi dan integrasi hosting tetap harus dikonfigurasi dan diverifikasi.

Foto referensi menggunakan [lisensi Unsplash](https://unsplash.com/license), disajikan lokal, dan ditandai sebagai studi visual. Tidak ada klaim bahwa foto-foto itu hasil kerja inPrime.

## Pemeriksaan PR dan deployment

GitHub Actions menjalankan npm run check: format Prettier, integritas konten, typecheck, static generation, serta pemeriksaan HTML/metadata/aset/JSON-LD/sitemap/404. Deploy Vercel memakai output statis tanpa Node server, Decap proxy, atau OAuth secrets. Hubungkan repository ke project Vercel agar push ke main menerbitkan perubahan berikutnya.
