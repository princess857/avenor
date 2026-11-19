import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center text-center p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 max-w-md w-full">
        <h1 className="font-serif text-6xl font-bold text-[#003B3D] mb-2">404</h1>
        <p className="text-gray-600 mb-6">Page not found</p>
        <Link to="/" className="bg-[#F4BE65] text-[#002B30] font-semibold px-6 py-3 rounded-xl hover:bg-[#FFD78D] transition inline-block">
          Return to Home
        </Link>
      </div>
    </div>
  )
}
