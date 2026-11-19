import { Loader2 } from 'lucide-react'

export default function LoadingState({ message = 'Loading...', className = '' }) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 gap-3 ${className}`}>
      <Loader2 className="w-8 h-8 text-[#003B3D] dark:text-[#54D2C0] animate-spin" />
      <p className="text-sm text-[#64748B] dark:text-[#94A3B8]">{message}</p>
    </div>
  )
}
