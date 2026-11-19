import { useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

export function Modal({ isOpen, onClose, title, children, footer, size = 'md' }) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-[600px]',
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className={`admin-glass-surface ${sizeClasses[size]} fixed left-1/2 top-1/2 z-[1001] flex max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl border outline-none`}>
          <div className="flex min-h-16 items-center justify-between gap-4 border-b border-[#E2E8F0] px-4 py-3 sm:px-6 dark:border-[#1E3A3D]">
            <Dialog.Title className="font-semibold text-[#0F172A] dark:text-white">
              {title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close dialog"
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[#64748B] hover:bg-gray-100 dark:text-[#94A3B8] dark:hover:bg-[#163A3F]"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">{children}</div>
          {footer && <div className="flex justify-end gap-3 border-t border-[#E2E8F0] p-4 sm:p-6 dark:border-[#1E3A3D]">{footer}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
