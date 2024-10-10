'use client'

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import toast,{Toaster} from 'react-hot-toast'


export default function Login(){
      const [userName,setUsername] = useState('');
      const [pin,setPin] = useState('');
      const router = useRouter();
      const {login} = useAuth()

      const handleLogin = async (e: FormEvent) => {
            e.preventDefault();
            if (!userName || !pin) {
                  toast.error('Username and Pin are required.');
                  return; 
            }
            try {
                  const isSuccess = await login(userName, pin); 
                 
            
                  if (isSuccess) {
                    toast.success('Login successful!');
                    setTimeout(()=>{
                          router.push('/dashboard');  // Redirect only if login is successful
                    },2000)
                  }
                } catch (error) {
                  console.error('error at login page:',error)
              toast.error('Login failed. Please check your credentials.');
            }
          };
      return(
            <div className="bg-gradient-to-br from-blue-800 to-indigo-300 min-h-screen flex items-center justify-center">
                  <div className="bg-white p-10 rounded-lg shadow-md w-96">

                  <h1 className="text-3xl  font-bold mb-6 text-center text-gray-800">Login</h1>
                  <form className=" flex flex-col gap-4 " onSubmit={(e)=>{handleLogin(e)}}>
                        <div>
                              
                              <input className=" rounded-md p-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" placeholder="Enter Username" type="text" value={userName} onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        <div>
                             
                              <input className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Pin" type="password" value={pin} onChange={(e)=>setPin(e.target.value)}/>
                        </div>
                        <button type="submit" className="w-full py-3 mt-4  bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300">Login</button>
                  </form>
                  <p className="mt-4 text-center text-gray-600">
                        Don &apos;t have an account? <Link className="text-blue-600 hover:text-blue-700 font-semibold" href='/register'>Sign Up</Link> 
                        </p>
                  </div>
                  <Toaster/>
            </div>
            
      )
}