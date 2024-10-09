 import {supabase} from '@/lib/supabaseClient'

 export default function Home(){
  async function fetchData(){
   
    const {data,error} = await supabase.from('users').select('*');
    if(error){
      console.error('error fetching data',error);
    }else{
      console.log('data fetched :',data)
    }
    // console.log('data is=================',data)
  }
  fetchData()
  return <h1>Welcome to pin auth app</h1>
 }
   