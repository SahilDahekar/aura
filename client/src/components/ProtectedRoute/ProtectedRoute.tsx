import { useAuth } from "@/context/AuthContext";
import { PropsWithChildren, useEffect } from "react"
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children } : PropsWithChildren) => {
    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(auth?.user === null){
            navigate('/auth', { replace: true });
        }
    }, [navigate, auth]);

    return <>{children}</>;
}

export default ProtectedRoute;