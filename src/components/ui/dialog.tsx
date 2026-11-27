import { Dialog as DialogPrimitive } from '@base-ui/react/dialog'
import { X } from 'lucide-react'
import type * as React from 'react'
import { cn } from '@/lib/utils'

function Dialog(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}

function DialogPortal(props: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogBackdrop({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-backdrop"
      className={cn(
        'fixed inset-0 z-50 bg-slate-950/92 backdrop-blur-xs transition-opacity duration-150',
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  ...props
}: DialogPrimitive.Popup.Props & { children?: React.ReactNode }) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(
          'fixed inset-0 z-50 flex flex-col items-center justify-center p-4 pt-16 pb-8 outline-none',
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('text-base font-bold text-white', className)}
      {...props}
    />
  )
}

function DialogClose({
  className,
  children,
  ...props
}: DialogPrimitive.Close.Props & { children?: React.ReactNode }) {
  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      className={cn(
        'grid size-9 place-items-center rounded-full border border-white/25 bg-white/15 text-white transition hover:bg-white/25',
        className
      )}
      {...props}
    >
      {children ?? <X size={18} aria-hidden="true" />}
    </DialogPrimitive.Close>
  )
}

export { Dialog, DialogBackdrop, DialogClose, DialogContent, DialogPortal, DialogTitle }
