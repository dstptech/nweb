import HomeHero from './HomeHero'
import HomeWhoWeAre from './HomeWhoWeAre'
import HomeExpertise from './HomeExpertise'
import HomeWhyPartner from './HomeWhyPartner'
import HowWeWork from '../../components/sections/HowWeWork'

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HomeHero />
      <HomeWhoWeAre />
      <HomeExpertise />
      <HomeWhyPartner />
      <HowWeWork />
    </div>
  )
}
