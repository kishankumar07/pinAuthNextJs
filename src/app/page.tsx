'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth(); 
  useEffect(() => {
   
    if (!user) {
      router.push('/login');
    } else {
      router.push('/dashboard'); 
    }
  }, [user, router]);

  return null;
}
