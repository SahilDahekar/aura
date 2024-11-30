import { Link } from "react-router"
import { Button } from "../ui/button"
import { MoveRight } from "lucide-react"

const Header = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-10 pb-10 pt-36">
        <div className="">
          <h1 className="uppercase text-8xl text-primary font-bold  font-messina-mono tracking-tight">Control <span className="text-white block">your <span className="-ml-8">security</span></span> assessment</h1>
        </div>
        {/* <div className="mt-5 text-5xl">
          <p>
            Typewritter div
          </p>
        </div> */}
        <div className="mt-5 text-4xl max-w-4xl">
          <p>Unified vulnerability management platform that brings all your security tools together</p>
        </div>
        <div className="flex gap-4 my-8">
          <Link to='/auth'><Button size='lg' className="font-bold text-lg font-messina-mono">Get Started for Free</Button></Link>
          <Button size='lg' variant='secondary' className="font-bold font-messina-mono">Learn More <MoveRight /></Button>
        </div>
    </div>
  )
}

export default Header