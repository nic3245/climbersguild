'use client'
import { signup } from './signup_action'
import { useState, FormEvent } from 'react'

export default function LoginPage() {
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [termsError, setTermsError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const formData = new FormData(event.currentTarget); // Extract the FormData object from the event object
    const email = formData.get('email') as string | null;
    const password = formData.get('password');
    const confirmPassword = formData.get('confirm-password');
    const terms = (event.currentTarget.elements.namedItem('terms') as HTMLInputElement).checked;

    if (email === null || email === '') {
      setEmailError('Email is required')
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
  

    if (!terms) {
      setTermsError('You must accept the terms and conditions')
      setTimeout(() => {
        setTermsError(null);
      }, 3000); // clear error message after 3 seconds
      return;
    }

    if (password === null || password === '') {
      setPasswordError('Password is required')
      setTimeout(() => {
        setPasswordError(null);
      }, 3000); // clear error message after 3 seconds
      return;
    }

    console.log(typeof password)

    if (password && typeof password === 'string' && password.length < 6) {
      setPasswordError('Password must be at least 6 characters long')
      setTimeout(() => {
        setPasswordError(null);
      }, 3000); // clear error message after 3 seconds
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match')
      setTimeout(() => {
        setPasswordError(null);
      }, 3000); // clear error message after 3 seconds
      return;
    }
    
    setPasswordError(null)
    return await signup(formData)
  }

  return (


    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img className="w-8 h-8 mr-2" src="favicon.ico" alt="logo"></img>
              Climber&apos;s Guild    
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Create an account
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
                      <div>
                          <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                          <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required>
                          </input>
                      </div>
                      {passwordError && (
                        <p className="text-sm text-red-500 dark:text-red-400">
                          {passwordError}
                        </p>
                      )}
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required
                            >
                      </input>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="/terms">Terms and Conditions</a></label>
                          </div>
                          
                      </div>
                      {termsError && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">{termsError}</p>
                          )}
                      <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                          Already have an account? <a href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
  )
}