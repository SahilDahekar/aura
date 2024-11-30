import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
import LandingCard from "@/components/LandingCard/LandingCard"
import LandingGrid from "@/components/LandingGrid/LandingGrid"
import Navbar from "@/components/Navbar/Navbar"
import { Button } from "@/components/ui/button"


const Landing = () => {
  return (
    <div className="relative">
      <Navbar />
      <Header />
      <div>
        <h2 className="uppercase text-5xl font-messina-mono font-bold text-center">Aura Platform</h2>
      </div>
      <LandingCard />
      <LandingGrid />
      <div className="max-w-screen-xl mx-auto border-4 py-12 h-[500px] grid place-content-center px-4 border-primary rounded-xl my-16 bg-">
        <h2 className="text-7xl font-messina-mono font-black uppercase text-center mb-8">Unify Your Security. <br/>Simplify Your Risk.</h2>
        <div className="flex gap-6 justify-center">
          <Button className="font-messina-mono font-bold uppercase text-xl py-6 px-8">Start free Security Scan</Button>
          <Button variant='outline' className="font-messina-mono font-bold hover:border-primary hover:bg-inherit hover:text-primary uppercase text-xl py-6 px-8">Learn more</Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Landing