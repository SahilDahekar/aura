import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  import {
    checkAuthStatus,
    loginUser,
    logoutUser,
    signupUser,
  } from "../lib/apiCommunicators";

  
  type User = {
    name: string;
    email: string;
  };
  type UserAuth = {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
  };
  const AuthContext = createContext<UserAuth | null>(null);
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
  
    async function checkStatus() {
      try {
        const data = await checkAuthStatus();
        if (data) {
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
        }
      } catch (error) {

      } finally {
        setIsLoading(false);
      }
    }
  
    useEffect(() => {
      checkStatus();
    }, []);
  
    
    const login = async (email: string, password: string) => {
      const data = await loginUser(email, password);
      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsLoggedIn(true);
  
        checkStatus();
      }
    };
    const signup = async (name: string, email: string, password: string) => {
      const data = await signupUser(name, email, password);
      if (data) {
        setUser({ email: data.email, name: data.name });
        setIsLoggedIn(true);
  
        checkStatus();
      }
    };
    const logout = async () => {
      await logoutUser();
      setIsLoggedIn(false);
      setUser(null);
    };
  
    const value = {
      user,
      isLoggedIn,
      isLoading,
      login,
      logout,
      signup,
    };
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  };
  
  export const useAuth = () => {
    const context = useContext(AuthContext);
  
    if(context === undefined){
      throw new Error("useAuth must be used inside AuthProvider/AuthContext");
    }
  
    return context;
  };