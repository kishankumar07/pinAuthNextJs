'use client'

import {createContext,useContext,useState,useEffect} from 'react'
import {supabase} from '@/lib/supabaseClient'
import { useRouter } from 'next/navigation'

const AuthContext = createContext(null);

export const AuthProvider = ({children})=>{
      const [user,setUser] = useState(null);
      const router = useRouter()

      useEffect(()=>{
            //This part checks whether the user is logged in on Mount
            const session = supabase.auth.session()
            setUser(session?.user ?? null)

            //Listen for auth state changes
            const {data:listener} = supabase.auth.onAuthStateChange((event,session)=>{
                  if(session?.user){
                        setUser(session.user);
                  }else{
                        setUser(null);
                        router.push('/login'); //Redirect to login if no user
                  }
            })

            return ()=>{
                  listener?.unsubscribe();
            }
      },[])

      return (
            <AuthContext.Provider value={{user,setUser}}>
                  {children}
            </AuthContext.Provider>
      )
}

export const useAuth = ()=>useContext(AuthContext)