'use client'

import {createContext,useState,ReactNode,useContext, useEffect} from 'react'
import toast from 'react-hot-toast'
import {supabase} from '@/lib/supabaseClient'
import { useRouter } from "next/navigation";
import bcrypt from 'bcryptjs'

interface AuthcontextType{
      user:string|null;
      login:(username:string,pin:string) => Promise<boolean>
      logout:()=>void
}



// To create the context
const AuthContext = createContext<AuthcontextType|undefined>(undefined)

export const AuthProvider = ({children}:{children:ReactNode}) =>{
      const [user,setUser] = useState<string|null>(null)
      const router = useRouter()

      //login
      const login = async (username: string, pin: string): Promise<boolean> => {
            try {
              const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('username', username)
                .single();
        
              console.log('API response:', { data, error });
        
              if (error || !data) {
                toast.error('Invalid username or pin.');
                return false; 
              }
        
              const isMatch = await bcrypt.compare(pin, data.pin);
              if (!isMatch) {
                  toast.error('Invalid username or pin.');
                  return false; 
              }
  
              
              setUser(username);
              return true;  
        
            } catch (err) {
              console.error('Unexpected error during login:', err);
              toast.error('An unexpected error occurred. Please try again.');
              return false;  
            }
          };
          

      //logout
      const logout = ()=>{
            setUser(null);
      }

      
  useEffect(() => {
      const savedUser = localStorage.getItem('authUser');
      if (savedUser) {
        setUser(savedUser);  
      }
      
    }, []);

    useEffect(() => {
      if (user) {
        localStorage.setItem('authUser', user);
        router.push('/dashboard')
      } else {
        localStorage.removeItem('authUser');
        
            router.push('/login'); 
          
      }
    }, [user,router]);



      return(
            <AuthContext.Provider value={{user,login,logout}}>
                  {children}
            </AuthContext.Provider>
      )
}


export const useAuth = () => {
      const context = useContext(AuthContext);
      if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
      }
      return context;
    };