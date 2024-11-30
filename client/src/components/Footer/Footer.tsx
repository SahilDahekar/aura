import { Github, Linkedin, Twitter } from "lucide-react"
import { Link } from "react-router"

const Footer = () => {
  return (
    <div className="flex justify-between px-6 max-w-screen-xl mx-auto font-messina-mono text-muted-foreground border-t-2 py-6">
        <p>
            @2024 AURA. All rights reserved.
        </p>
        <div className="flex gap-6">
            <Link to='#' className="hover:text-primary">
                <Github/>
            </Link>
            <Link to='#' className="hover:text-primary">
                <Linkedin/>
            </Link>
            <Link to='#' className="hover:text-primary">
                <Twitter/>
            </Link>
        </div>
    </div>
  )
}

export default Footer