import { useState } from "react";
import { Button } from "../ui/button";
import { Menu, X } from "lucide-react";
import { Link, NavLink } from "react-router";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
    const auth = useAuth();
    const { toast } = useToast();

    console.log(auth);

    function handleLogout(){
        auth?.logout();
        toast({
            title : `Logged out ${auth?.user?.name}`
        });
    }

    const[menu, setMenu] = useState<boolean>(false);

    return (
    <div className="">
        <nav className="fixed w-full backdrop-blur-lg top-0 flex justify-between items-center px-10 py-6 shadow-md border-b border-primary">
            <p className="font-playwrite italic font-black text-2xl text-primary">
                AURA
            </p>
            <ul className="hidden md:flex space-x-12 font-messina-mono uppercase">
                <li><NavLink to='/#feature' className='hover:underline underline-offset-4 transition-transform'>Features</NavLink></li>
                <li><NavLink to='/#howitworks' className='hover:underline underline-offset-4 transition-transform'>How it works</NavLink></li>
                <li><NavLink to='/#pricing' className='hover:underline underline-offset-4 transition-transform'>Pricing</NavLink></li>
                <li><NavLink to='/#contact' className='hover:underline underline-offset-4 transition-transform'>Contact</NavLink></li>
            </ul>
            <div className="hidden md:block">
                { 
                    auth?.user ? <Button onClick={handleLogout} className="font-messina-mono font-bold">LOGOUT</Button> : <Link to='/auth'><Button className="font-messina-mono font-bold">SIGN IN</Button></Link>
                }
            </div>
            <Button variant="ghost" size="icon" className="md:hidden text-white" onClick={() => setMenu(!menu)}>
                {menu ? <X /> : <Menu />}
            </Button>
        </nav>

        {menu && (
        <div className="md:hidden">
            <ul className="">
                <li className="px-6 py-4 border-b"><NavLink to='/#feature' className='hover:underline underline-offset-4 transition-transform'>Features</NavLink></li>
                <li className="px-6 py-4 border-b"><NavLink to='/#howitworks' className='hover:underline underline-offset-4 transition-transform'>How it works</NavLink></li>
                <li className="px-6 py-4 border-b"><NavLink to='/#pricing' className='hover:underline underline-offset-4 transition-transform'>Pricing</NavLink></li>
                <li className="px-6 py-4 border-b"><NavLink to='/#contact' className='hover:underline underline-offset-4 transition-transform'>Contact</NavLink></li>
            </ul>
        </div>)}

    </div>
    )
}

export default Navbar