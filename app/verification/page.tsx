import Link from 'next/link'
import Image from 'next/image'

export default function VerificationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800"> 
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Link href="/" className="flex items-center mb-6 text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-b from-orange-100 to-orange-500">
              <Image className="w-8 h-8 mr-2" src="/favicon.ico" alt="logo" width={32} height={32}></Image>
              Climber&apos;s Guild    
          </Link>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">

        <div className="p-6 space-y-4 md:space-y-6 sm:p-8 text-center">


          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Verify Your Email
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400">
            We&apos;ve sent a verification link to your email address. 
            Please check your inbox and click the link to activate your account.
          </p>

          <div className="mt-4 text-sm text-gray-500 dark:text-gray-300">
            <p>Didn&apos;t receive the email?</p>
            <div className="mt-2 space-y-2">
              <button className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-500 transition-colors">
                Resend Verification Email
              </button>
              <p className="mt-4">
                Still having trouble?{' '}
                <Link 
                  href="mailto:dev@climbersguild.com" 
                  className="text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-500 transition-colors"
                >
                  Contact Support
                </Link>
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Link 
              href="/login" 
              className="text-white bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg transition-colors duration-300 inline-block"
            >
              Return to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}