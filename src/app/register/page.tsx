'use client'

import { useState,FormEvent } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"
import Link from "next/link"

const Register = ()=>{
      const [userName,setUserName] = useState('');
      const [pin,setPin] = useState('')
      const [error,setError] = useState <string | null> (null)
      const [success,setSuccess] = useState(false);
      const router = useRouter();

      const handleRegister = async(e:FormEvent)=>{
            e.preventDefault();
            setError(null);
            setSuccess(false);

            if(!userName || !pin){
                  setError('Both fields are required');return;
            }

            //Validation for existing user in the supabase db
            const {data:existingUser} = await supabase.from('users').select('*').eq('username',userName).single();

            if(existingUser){
                  setError('Username already taken');return;
            }

            //Insert new user
            const {error} = await supabase.from('users').insert([{username:userName,pin,role:'MEMBER'}]);


            if(error){
                  setError('Error creating account');
                  console.error(error)
            }else{
                  setSuccess(true);
                  router.push('/login');
            }
      }

      return(
            <div>
                  <h1>Register</h1>
                  {error && <p style={{color:'red'}}>{error}</p>}
                  {success && <p style={{color:'green'}}>Registration successful!</p>}

                  <form onSubmit={handleRegister}>
                        <div>
                              <label htmlFor="">UserName</label>
                              <input type="text" value={userName}  onChange={(e)=>setUserName(e.target.value)}/>
                        </div>
                        <div>
                              <label htmlFor="">Pin</label>
                              <input type="password" value={pin} onChange={(e)=>{setPin(e.target.value)}}/>
                        </div>
                        <button type="submit">Register</button>
                  </form>
                  <p className="cursor-pointer">
                        Don &apos;t have an account? <Link href='/login'>Sign in</Link>
                        </p>

            </div>
      )
}

export default Register