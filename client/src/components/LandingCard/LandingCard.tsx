import { LocateFixed } from "lucide-react"
import { Button } from "../ui/button"

const LandingCard = () => {
  return (
    <div className="my-8">
        <div className="max-w-screen-xl mx-auto rounded-2xl bg-[#007aff] grid grid-cols-2 divide-x-2 divide-primary px-8 py-12">
          <div className="p-6 max-w-lg">
            <h3 className="text-5xl text-primary font-messina-mono font-bold mb-8">INTRODUCING AURA INSIGHT!</h3>
            <p className="mb-8 text-justify text-xl">A revolutionary, AI-powered vulnerability management workflow that starts with comprehensive tool integration, provides intelligent risk scoring, and creates your first unified security dashboard in less than 15 mins.</p>
            <Button size='lg' className="font-messina-mono font-bold">TAKE CONTROL OF YOUR SECURITY LANDSCAPE</Button>
          </div>
          <div className="p-6 grid justify-center">
            <h3 className="text-2xl text-primary font-bold mb-10 uppercase">Now You Can Expect:</h3>
            <ul className="text-xl flex flex-col gap-6">
              <li className="flex items-center gap-4">
                <span className="p-2 bg-primary rounded-full">
                  <LocateFixed className="text-popover" />
                </span>
                Instantly Consolidate Multiple Security Tools
              </li>
              <li className="flex items-center gap-4">
                <span className="p-2 bg-primary rounded-full">
                  <LocateFixed className="text-popover" />
                </span>
                Gain Comprehensive Vulnerability Visibility
              </li>
              <li className="flex items-center gap-4">
                <span className="p-2 bg-primary rounded-full">
                  <LocateFixed className="text-popover" />
                </span>
                At Least 50% Faster Risk Assessment
              </li>
              <li className="flex items-center gap-4">
                <span className="p-2 bg-primary rounded-full">
                  <LocateFixed className="text-popover" />
                </span>
                Significant Security Optimization
              </li>
            </ul>
          </div>
        </div>
      </div>
  )
}

export default LandingCard