'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import Link from 'next/link'
import Image from 'next/image'

export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [showAlert, setShowAlert] = useState(false)
  const [firstname, setFirstname] = useState<string>('')
  const [lastname, setLastname] = useState<string>('')
  const [sex, setSex] = useState<string>('')
  const [dob, setDob] = useState<string>('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`first_name, last_name, sex, dob, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) throw error

      if (data) {
        setFirstname(data.first_name || '')
        setLastname(data.last_name || '')
        setSex(data.sex || '')
        setDob(data.dob || '')
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      console.log(error)
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile() {
    try {
      setLoading(true)
      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        first_name: firstname,
        last_name: lastname,
        sex,
        dob,
        avatar_url: avatarUrl,
        updated_at: new Date().toISOString(),
      })
      if (error) throw error
        // Show themed alert
        setShowAlert(true)
        setTimeout(() => setShowAlert(false), 3000)
    } catch (error) {
      console.log(error)
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
  }

  const uploadAvatar = async (file: File) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${user?.id}-avatar.${fileExt}`
    const { error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file)
    
    if (!error) setAvatarUrl(fileName)
    return error
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      )}

      {/* Themed Alert */}
      {showAlert && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2 animate-fade-in-up">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link href="/" className="flex items-center mb-6 text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-orange-100 to-orange-500">
          <Image 
            className="w-8 h-8 mr-2" 
            src="/favicon.ico" 
            alt="logo" 
            width={32} 
            height={32}
          />
          Your Account
        </Link>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Update Profile
            </h1>

            <form onSubmit={(e) => {
            e.preventDefault()
            updateProfile()
          }}>
            {/* Profile Image Upload */}
            <div className="mb-8 flex justify-center">
              <div className="relative w-32 h-32">
                <div 
                  className="w-full h-full rounded-full border-4 border-white dark:border-gray-800 bg-cover bg-center"
                  style={{ backgroundImage: `url(${avatarUrl || ''})` }}
                >
                  <input 
                    type="file" 
                    id="upload_profile" 
                    hidden 
                    onChange={async (e) => {
                      const file = e.target.files?.[0]
                      if (file) await uploadAvatar(file)
                    }}
                  />
                  <label 
                    htmlFor="upload_profile" 
                    className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-sm cursor-pointer hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    <svg className="w-6 h-6 text-gray-800 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </label>
                </div>
              </div>
            </div>

              {/* Form Fields */}
              <div className="space-y-4 md:space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstname"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="sex" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Gender
                    </label>
                    <select
                      id="sex"
                      value={sex}
                      onChange={(e) => setSex(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="dob" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dob"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {loading ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}