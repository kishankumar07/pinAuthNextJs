'use client'

import { useState,FormEvent } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import bcrypt from 'bcryptjs';
import Link from "next/link"
import toast,{Toaster} from 'react-hot-toast'

const Register = ()=>{
      const [userName,setUserName] = useState('');
      const [pin,setPin] = useState('')
     
      const router = useRouter();

      const handleRegister = async(e:FormEvent)=>{
            e.preventDefault();

            if(!userName || !pin){
                  toast.error('All fields are required');return;
            }

            //Validation for existing user in the supabase db
            const {data:existingUser} = await supabase.from('users').select('*').eq('username',userName).single();

            if(existingUser){
                  toast.error('User already exists!');return;
            }

            const saltRounds = 10;
            const hashedPin = await bcrypt.hash(pin, saltRounds);
            //Insert new user
            const {error} = await supabase.from('users').insert([{username:userName,pin:hashedPin,role:'MEMBER'}]);


            if(error){
                  
                  toast.error('Login failed! Failed to fetch user')
            }else{
                  

                  toast.success('Register successful!');
                  
                  setTimeout(() => {
                        router.push('/login');
                      }, 2000);
            }
      }

      return(
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center min-h-screen">
                  <div className="bg-white p-10 rounded-lg shadow-md w-96">

                  <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Register</h1>
                  <form onSubmit={handleRegister} className="flex flex-col gap-4">
                        <div>
                              <input className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" value={userName}  onChange={(e)=>setUserName(e.target.value)} placeholder="Enter Username"/>
                        </div>
                        <div>
                             
                              <input className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" value={pin} onChange={(e)=>{setPin(e.target.value)}} placeholder="Enter Pin"/>
                        </div>
                        <button className="w-full py-3 mt-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300" type="submit">Register</button>
                  </form>
                  <p className="mt-4 text-center text-gray-600">
                       Already have an account? {' '}
                       <Link href='/login' className="text-blue-500 hover:text-blue-700 font-semibold">Login</Link>
                        </p>
                  </div>
                  <Toaster/>
            </div>
      )
}

export default Register