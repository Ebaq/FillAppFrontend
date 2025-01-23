'use client'

import { CircleAlert, Lock, RefreshCcw, SendHorizontal } from 'lucide-react'
import { FC } from 'react'
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from './ui/tooltip'

interface MainModuleProps {
	date: string
	fileName: string
	secondFileName: string
	bookName: string
	caramel: string
	isPending: boolean
	read: () => void
	readSecond: () => void
	readBook: () => void
	resetProducts: () => void
	setCaramel: (caramel: string) => void
	start: () => void
	startFillGuardAndCaramel: () => void
}

const MainModule: FC<MainModuleProps> = ({
	date,
	fileName,
	secondFileName,
	bookName,
	caramel,
	isPending,
	read,
	readSecond,
	readBook,
	resetProducts,
	setCaramel,
	start,
	startFillGuardAndCaramel,
}) => {
	return (
		<div className='flex flex-col gap-[20px]'>
			<div className='flex items-start gap-3'>
				<span className='flex items-center justify-center rounded-[50%] bg-[#F2F5FA] translate-y-4 size-8 min-w-8 min-h-8 shadow-lg text-[#4A5660] font-medium'>
					2
				</span>
				<div className='flex flex-col gap-3'>
					<div className='flex gap-[8px] items-center'>
						<button
							className='flex gap-[15px] border-[1px] border-[#F2F4F7] rounded-lg items-center pr-[10px] relative max-w-[320px] w-[320px] cursor-pointer group/btn'
							onClick={e => {
								e.preventDefault()
								read()
							}}
							disabled={isPending}
						>
							<span className='bg-[#F2F4F7] flex items-center justify-center h-[40px] w-24 min-w-24 rounded-lg px-3 text-black font-medium self-center transition-all duration-200 group-hover/btn:bg-[#F2F4F7]/80'>
								{!fileName.length ? (
									<img src='/icons/LoadFile.svg' alt='' />
								) : (
									<img src='/icons/File.svg' alt='' />
								)}
							</span>
							<span className='text-base text-start w-full max-w-[65%] text-nowrap break-words font-medium truncate'>
								{fileName.length ? fileName : 'Выберите файл накладной'}
							</span>
						</button>
						<TooltipProvider>
							<Tooltip delayDuration={200}>
								<TooltipTrigger
									onClick={e => {
										e.preventDefault()
									}}
								>
									<CircleAlert
										className='min-w-[18px] min-h-[18px]'
										size={18}
									/>
								</TooltipTrigger>
								<TooltipContent
									side='right'
									className='bg-white max-w-[250px] flex items-center justify-center p-3 rounded-xl rounded-bl-[0px] -translate-y-[60%]'
								>
									<p className='text-[#4A5660] text-[16px]'>
										Необходимо приложить файл накладной (шведский стол или
										общевойсковой паек).
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<div className='flex gap-[8px] items-center'>
						<button
							className='flex gap-[15px]  border-[1px] border-[#F2F4F7] rounded-lg items-center pr-[10px] relative max-w-[320px] w-[320px] cursor-pointer group/btn'
							onClick={e => {
								e.preventDefault()
								readSecond()
							}}
							disabled={isPending}
						>
							<span className='bg-[#F2F4F7] flex items-center justify-center h-[40px] w-24 min-w-24 rounded-lg px-3 text-black font-medium self-center transition-all duration-200 group-hover/btn:bg-[#F2F4F7]/80'>
								{!secondFileName.length ? (
									<img src='/icons/LoadFile.svg' alt='' />
								) : (
									<img src='/icons/File.svg' alt='' />
								)}
							</span>
							<span className='text-base text-start w-full max-w-[65%] text-nowrap break-words font-medium truncate'>
								{secondFileName.length
									? secondFileName
									: 'Выберите файл накладной'}
							</span>
						</button>
						<TooltipProvider>
							<Tooltip delayDuration={200}>
								<TooltipTrigger
									onClick={e => {
										e.preventDefault()
									}}
								>
									<CircleAlert
										className='min-w-[18px] min-h-[18px]'
										size={18}
									/>
								</TooltipTrigger>
								<TooltipContent
									side='right'
									className='bg-white max-w-[250px] flex items-center justify-center p-3 rounded-xl rounded-bl-[0px] -translate-y-[60%]'
								>
									<p className='text-[#4A5660] text-[16px]'>
										Необходимо приложить файл накладной (шведский стол или
										общевойсковой паек).
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<div className='flex gap-[8px] items-center'>
						<button
							className='flex gap-[15px] border-[1px] border-[#F2F4F7] justify-start rounded-lg items-center pr-[10px] relative max-w-[320px] w-[320px] cursor-pointer group/btn'
							onClick={e => {
								e.preventDefault()
								console.log('click')
								readBook()
							}}
							disabled={isPending}
						>
							<span className='bg-[#F2F4F7] flex items-center justify-center h-[40px] w-24 min-w-24 rounded-lg px-3 text-black font-medium self-center transition-all duration-200 group-hover/btn:bg-[#F2F4F7]/80'>
								{!bookName.length ? (
									<img src='/icons/LoadFile.svg' alt='' />
								) : (
									<img src='/icons/File.svg' alt='' />
								)}
							</span>
							<span className='text-base w-full max-w-[65%] text-start text-nowrap break-words font-medium truncate'>
								{bookName.length ? bookName : 'Выберите файл книги'}
							</span>
						</button>
						<TooltipProvider>
							<Tooltip delayDuration={200}>
								<TooltipTrigger
									onClick={e => {
										e.preventDefault()
									}}
								>
									<CircleAlert
										className='min-w-[18px] min-h-[18px]'
										size={18}
									/>
								</TooltipTrigger>
								<TooltipContent
									side='right'
									className='bg-white max-w-[250px] flex items-center justify-center p-3 rounded-xl rounded-bl-[0px] -translate-y-[60%]'
								>
									<p className='text-[#4A5660] text-[16px]'>
										Необходимо приложить файл накладной (шведский стол или
										общевойсковой паек).
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
				</div>
			</div>
			<span className='bg-[#4A5660]/25 h-[1px] w-[50%] translate-x-[50%]' />
			<div className='flex flex-col gap-[20px]'>
				<div className='flex flex-col gap-4'>
					<div className='flex gap-3 items-center relative'>
						<span className='flex items-center justify-center rounded-[50%] bg-[#F2F5FA] size-8 min-w-8 min-h-8 shadow-lg text-[#4A5660] font-medium'>
							3
						</span>
						<button
							onClick={e => {
								e.preventDefault()
								resetProducts()
							}}
							disabled={isPending}
							className='bg-[#3A903D]/30 flex gap-[29px] items-center h-[40px] rounded-lg px-3 font-medium self-center transition-all duration-200 hover:bg-[#3A903D]/40 w-full text-[#4A5660]'
						>
							<RefreshCcw className='text-[#3A903D]' />
							Сбросить данные накладных
						</button>
						<TooltipProvider>
							<Tooltip delayDuration={200}>
								<TooltipTrigger
									onClick={e => {
										e.preventDefault()
									}}
								>
									<CircleAlert
										className='min-w-[18px] min-h-[18px]'
										size={18}
									/>
								</TooltipTrigger>
								<TooltipContent
									side='right'
									className='bg-white max-w-[250px] flex items-center justify-center p-3 rounded-xl rounded-bl-[0px] -translate-y-[60%]'
								>
									<p className='text-[#4A5660] text-[16px]'>
										Необходимо приложить файл накладной (шведский стол или
										общевойсковой паек).
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<span className='bg-[#4A5660]/25 h-[1px] w-[50%] translate-x-[50%]' />
					<div className='flex gap-3 items-center relative'>
						{((!fileName.length && !secondFileName.length) ||
							!bookName.length) && (
							<div className='absolute w-[calc(100%-20px)] h-[calc(100%+36px)] bg-black/20 backdrop-blur-sm flex items-center justify-center -top-[18px] left-0 rounded-lg text-white gap-2 z-20'>
								<Lock size={48} className='min-w-12 min-h-12' />
								<span className='text-[16px] text-white font-medium'>
									Приложите необходимые файлы
								</span>
							</div>
						)}
						<span className='flex items-center justify-center rounded-[50%] bg-[#F2F5FA] size-8 min-w-8 min-h-8 shadow-lg text-[#4A5660] font-medium'>
							4
						</span>
						<button
							onClick={e => {
								e.preventDefault()
								start()
							}}
							disabled={
								(!fileName.length && !secondFileName.length) ||
								!bookName.length ||
								isPending
							}
							data-blur={
								(!fileName.length && !secondFileName.length) || !bookName.length
							}
							className='bg-[#3A903D]/30 flex gap-[29px] items-center h-[40px] rounded-lg px-3 font-medium self-center transition-all duration-200 hover:bg-[#3A903D]/40 w-full text-[#4A5660] data-[blur="true"]:blur-md z-0'
						>
							<SendHorizontal className='text-[#3A903D]' />
							Запустить заполнение книги
						</button>
						<TooltipProvider>
							<Tooltip delayDuration={200}>
								<TooltipTrigger
									onClick={e => {
										e.preventDefault()
									}}
								>
									<CircleAlert
										className='min-w-[18px] min-h-[18px]'
										size={18}
									/>
								</TooltipTrigger>
								<TooltipContent
									side='right'
									className='bg-white max-w-[250px] flex items-center justify-center p-3 rounded-xl rounded-bl-[0px] -translate-y-[60%]'
								>
									<p className='text-[#4A5660] text-[16px]'>
										Необходимо приложить файл накладной (шведский стол или
										общевойсковой паек).
									</p>
								</TooltipContent>
							</Tooltip>
						</TooltipProvider>
					</div>
					<span className='bg-[#4A5660]/25 h-[1px] w-[50%] translate-x-[50%]' />
				</div>
				<div className='flex gap-[12px] items-center relative'>
					{(!bookName.length || !date.length) && (
						<div className='absolute w-[calc(100%-20px)] h-[calc(100%+36px)] bg-black/20 backdrop-blur-sm flex items-center justify-center -top-[18px] left-0 rounded-lg text-white gap-2 z-10'>
							<Lock size={48} className='min-w-12 min-h-12' />
							<span className='text-[16px] text-white font-medium'>
								Приложите необходимые файлы
							</span>
						</div>
					)}
					<span className='flex items-center justify-center rounded-[50%] bg-[#F2F5FA] size-8 min-w-8 min-h-8 shadow-lg text-[#4A5660] font-medium'>
						5
					</span>
					<input
						type='text'
						placeholder='Карамель'
						className='bg-[#D9D9D9] border-[#FFFFFF] placeholder:text-[#4A5660]/50 font-medium h-[40px] rounded-[6px] border-2 placeholder:text-center outline-none px-[10px] w-[108px]'
						onChange={e => {
							setCaramel(e.target.value)
						}}
						value={caramel}
					/>
					<button
						onClick={e => {
							e.preventDefault()
							startFillGuardAndCaramel()
						}}
						disabled={!bookName.length || !date.length || isPending}
						data-blur={!bookName.length || !date.length}
						className='bg-[#3A903D]/30 flex gap-[15px] items-center h-[40px] rounded-lg px-3 font-medium self-center transition-all duration-200 hover:bg-[#3A903D]/40 w-full text-[#4A5660] data-[blur="true"]:blur-md z-0'
					>
						<SendHorizontal className='text-[#3A903D]' />
						Караул/карамель
					</button>
					<TooltipProvider>
						<Tooltip delayDuration={200}>
							<TooltipTrigger
								onClick={e => {
									e.preventDefault()
								}}
							>
								<CircleAlert className='min-w-[18px] min-h-[18px]' size={18} />
							</TooltipTrigger>
							<TooltipContent
								side='right'
								className='bg-white max-w-[250px] flex items-center justify-center p-3 rounded-xl rounded-bl-[0px] -translate-y-[60%]'
							>
								<p className='text-[#4A5660] text-[16px]'>
									Необходимо приложить файл накладной (шведский стол или
									общевойсковой паек).
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</div>
	)
}

export default MainModule
