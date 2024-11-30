import Footer from "@/components/Footer/Footer"
import Header from "@/components/Header/Header"
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
      <div>
        <div className="max-w-xl rounded-md bg-[#007aff] grid grid-cols-2 divide-y">
          <div className="">
            <h3 className="text-4xl text-primary font-messina-mono font-bold">INTRODUCING AURA INSIGHT!</h3>
            <p>A revolutionary, AI-powered vulnerability management workflow that starts with comprehensive tool integration, provides intelligent risk scoring, and creates your first unified security dashboard in less than 15 mins.</p>
            <Button className="">TAKE CONTROL OF YOUR SECURITY LANDSCAPE</Button>
          </div>
          <div className="">
            <h3>Now You Can Expect:</h3>
            <ul>
              <li>Instantly Consolidate Multiple Security Tools</li>
              <li>Gain Comprehensive Vulnerability Visibility</li>
              <li>At Least 50% Faster Risk Assessment</li>
              <li>Significant Security Optimization</li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Landing