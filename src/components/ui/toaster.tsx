'use client'

import {
	Toast,
	ToastClose,
	ToastDescription,
	ToastProvider,
	ToastTitle,
	ToastViewport,
} from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'

export function Toaster() {
	const { toasts } = useToast()

	return (
		<ToastProvider>
			{toasts.map(function ({ id, title, description, action, ...props }) {
				return (
					<Toast
						key={id}
						{...props}
						className='bg-red-700 text-white border-none mt-[10px]'
					>
						<div className='grid gap-1'>
							{title && (
								<ToastTitle className='text-white text-[18px]'>
									{title}
								</ToastTitle>
							)}
							{description && (
								<ToastDescription className='!text-[16px]'>
									{description}
								</ToastDescription>
							)}
						</div>
						{action}
						<ToastClose />
					</Toast>
				)
			})}
			<ToastViewport />
		</ToastProvider>
	)
}
