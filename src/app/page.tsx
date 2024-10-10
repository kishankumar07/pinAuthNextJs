'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth(); // Access the user from the auth context

  useEffect(() => {
    // If the user is not logged in, redirect to /login
    if (!user) {
      router.push('/login');
    } else {
      router.push('/dashboard'); // Or any other authenticated route
    }
  }, [user, router]);

  return null; // Optionally, return a loading spinner or a blank page
}
