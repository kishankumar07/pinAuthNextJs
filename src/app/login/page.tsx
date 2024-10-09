'use client'

import { FormEvent, ReactNode, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Login(){
      const [userName,setUsername] = useState('');
      const [pin,setPin] = useState('');
      const [error,setError] = useState <string | null>(null);
      const router = useRouter();

      const handleLogin = async(e:FormEvent)=>{
            e.preventDefault();
            const {data,error} = await supabase.from('users').select('*').eq('username',userName).eq('pin',pin).single();

            if(error){
                  setError('Error fetching user');
                  console.error(error)
            }else if(data.length === 0){
                  setError('invalid username or pin');
            }else{
                  //If everything is correct
                  console.log('User authenticated:',data[0]);
                  setError(null)
                  router.push('/dashboard')
            }
      }

      return(
            <div>
                  <h1>Login</h1>
                  <form onSubmit={(e)=>{handleLogin(e)}}>
                        <div>
                              <label htmlFor="">Username</label>
                              <input type="text" value={userName} onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        <div>
                              <label htmlFor="">PIN</label>
                              <input className="text-gray-950" type="text" value={pin} onChange={(e)=>setPin(e.target.value)}/>
                        </div>
                        <button type="submit">Login</button>
                  </form>
            </div>
      )
}