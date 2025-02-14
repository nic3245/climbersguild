'use client'
import { login } from './login_action'
import { useState, FormEvent } from 'react'
import Link from 'next/link'
import Image from 'next/image'

// export default function LoginPage() {
//   return (
//     <form>
//       <label htmlFor="email">Email:</label>
//       <input id="email" name="email" type="email" required />
//       <label htmlFor="password">Password:</label>
//       <input id="password" name="password" type="password" required />
//       <button formAction={login}>Log in</button>
//     </form>
//   )
// }
export default function LoginPage() {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string | null;
    const password = formData.get('password');

    if (email === null || email === '') {
      setEmailError('Email is required');
      setTimeout(() => {
        setEmailError(null);
      }, 3000); // clear error message after 3 seconds
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !emailRegex.test(email)) {
      setEmailError('Invalid email address');
      setTimeout(() => {
        setEmailError(null);
      }, 3000); // clear error message after 3 seconds
      return;
    }

    if (password === null || password === '') {
      setPasswordError('Password is required');
      setTimeout(() => {
        setPasswordError(null);
      }, 3000); // clear error message after 3 seconds
      return;
    }
    
    const { loginError } = await login(formData)

    if (loginError) {
      setPasswordError(loginError);
      setTimeout(() => {
        setPasswordError(null);
      }, 3000); // clear error message after 3 seconds
      return;
  }

  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800"> 
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link href="/" className="flex items-center mb-6 text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-orange-100 to-orange-500">
              <Image className="w-8 h-8 mr-2" src="/favicon.ico" alt="logo" width={32} height={32}></Image>
              Climber&apos;s Guild    
          </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Login
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit} noValidate>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com" required>
                        </input>
                    </div>
                    {emailError && (
                      <p className="mt-2 text-sm text-red-600 dark:text-red-500">{emailError}</p>
                    )}
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                        </input>
                    </div>
                    {passwordError && (
                      <p className="text-sm text-red-500 dark:text-red-400">
                        {passwordError}
                      </p>
                    )}
                    
                    <button type="submit" className="w-full text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don&apos;t have an account? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup here</a>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </div>
)
}