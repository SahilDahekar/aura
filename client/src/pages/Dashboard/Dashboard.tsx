import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { NavLink, Outlet } from "react-router"

const Dashboard = () => {
  const auth = useAuth();
  const { toast } = useToast();

  console.log(auth);

  function handleLogout(){
      auth?.logout();
      toast({
          title : `Logged out successfully`
      });
  }

  return (
    <div>
      <div className="flex h-screen">
        <div className="px-6 py-8 flex flex-col justify-between border-r border-r-primary min-w-[300px]">
          <div className="flex flex-col gap-4 ">
          <NavLink to='/dashboard/'>
                <Button variant='outline' className="font-messina-mono font-bold w-full uppercase">New Scan</Button>
            </NavLink>
            <NavLink to='/dashboard/myscan'>
                <Button variant='outline' className="font-messina-mono font-bold w-full uppercase">My Scans</Button>
            </NavLink>
            {/* <NavLink to='/dashboard/myresult'>
                <Button variant='outline' className="font-messina-mono font-bold w-full uppercase">My Results</Button>
            </NavLink> */}
          </div>
          <div>
            <Button variant='secondary' onClick={handleLogout} className="font-messina-mono font-bold w-full">LOGOUT</Button>
          </div>
        </div>

        <div className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </div>
    </div>
    </div>
  )
}

export default Dashboard