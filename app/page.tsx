import Link from 'next/link';

export default function UnderConstruction() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col items-center justify-center text-center p-8">
      <div className="space-y-8 max-w-2xl">
      <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-500 leading-tight pb-3">
        Climbing Community <br />
        Coming Soon!
      </h1>

      
        <p className="text-lg md:text-xl text-slate-300 mb-8">
          We are building the ultimate platform for climbers to share and discover routes. 
          Join our waitlist to get early access!
        </p>

        <div className="animate-bounce">
          <Link 
            href="/signup"
            className="inline-block px-8 py-4 text-lg font-semibold text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition-colors duration-300 transform hover:scale-105"
          >
            Join Waitlist →
          </Link>
        </div>

        <p className="text-slate-400 text-sm mt-8">
          Already on the list? Stay tuned for launch updates!
        </p>
      </div>
    </div>
  );
}