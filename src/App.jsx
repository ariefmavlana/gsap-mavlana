import gsap from 'gsap'
import NavBar from './components/NavBar'
import HeroSection from './sections/HeroSection'
import { ScrollSmoother, ScrollTrigger } from 'gsap/all'
import MessageSection from './sections/MessageSection'
import { useGSAP } from '@gsap/react'
import FlavorSection from './sections/FlavorSection'
import FooterSection from './sections/FooterSection'
import BenefitSection from './sections/BenefitSection'
import NutritionSection from './sections/NutritionSection'
import TestimonialSection from './sections/TestimonialSection'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const App = () => {
  useGSAP(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    })
  })

  return (
    <main>
      <NavBar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <HeroSection />
          <MessageSection />
          <FlavorSection />
          <NutritionSection />

          <div>
            <BenefitSection />
            <TestimonialSection />
          </div>

          <FooterSection />
        </div>
      </div>
    </main>
  )
}

export default App