'use client'

import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
      const {user} = useAuth()
      return (
            <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/bg-pic.jpg')" }}>
            <div className="bg-white bg-opacity-75 rounded-lg p-8 shadow-lg text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome, {user || 'Guest'}!</h1>
              <p className="text-lg text-gray-900">We&apos;re glad to have you here.</p>
             
            </div>
          </div>
      );
    }
    