import Landing from "./pages/Landing/Landing";
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from './context/AuthContext.tsx';
import { BrowserRouter, Route, Routes } from "react-router";
import Auth from './pages/Auth/Auth.tsx';
import Dashboard from "./pages/Dashboard/Dashboard.tsx";
import TestForm from "./components/TestForm/TestForm.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Landing />}/>
        <Route path='/auth' element={<Auth />} />
        <Route path='/dashboard' element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path='/test' element={<TestForm />} />
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
