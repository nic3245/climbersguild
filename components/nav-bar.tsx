'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'

import { User } from '@supabase/supabase-js'

export default function NavBar() {
  const [user, setUser] = useState<null | User>(null)
  const supabase = createClient()

  useEffect(() => {
    const getAuthUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    getAuthUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription?.unsubscribe()
  })

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.href = '/login' // Redirect to login page after sign out
  }

  return (
    <nav className="absolute top-0 right-0 p-4 flex gap-4">
      {user ? (
        <div className="flex gap-2">
          <Link
            href="/account"
            className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors duration-300"
          >
            Account
          </Link>
          <button
            onClick={handleSignOut}
            className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors duration-300"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <>
          <Link
            href="/signup"
            className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors duration-300"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors duration-300"
          >
            Login
          </Link>
        </>
      )}
    </nav>
  )
}