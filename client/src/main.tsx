import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router";
import App from './App.tsx'
import Auth from './pages/Auth/Auth.tsx';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from './context/AuthContext.tsx';


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<App />}/>
        <Route path='/auth' element={<Auth />} />
      </Routes> 
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
      <Toaster />
    </AuthProvider>
  </StrictMode>,
)
