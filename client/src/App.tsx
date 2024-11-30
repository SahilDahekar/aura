import Landing from "./pages/Landing/Landing";
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from './context/AuthContext.tsx';
import { BrowserRouter, Route, Routes } from "react-router";
import Auth from './pages/Auth/Auth.tsx';
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import MyScan from "./components/MyScan/MyScan.tsx";
import MyResult from "./components/MyResult/MyResult.tsx";
import NewScan from "./components/NewScan/NewScan.tsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Landing />}/>
        <Route path='/auth' element={<Auth />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} >
        {/* <Route path='/dashboard' element={<Dashboard/>} > */}
          <Route index element={<NewScan />}/>
          <Route path='/dashboard/myscan' element={<MyScan />}/>
          <Route path='/dashboard/myresult' element={<MyResult />}/>
        </Route>
      </Routes> 
    </BrowserRouter>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppRouter />
      <Toaster />
    </AuthProvider>
  )
}

export default App;
