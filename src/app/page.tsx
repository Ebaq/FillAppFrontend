'use client'

import CalendarModule from '@/components/CalendarModule'
import MainModule from '@/components/MainModule'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import dayjs from 'dayjs'
import { TriangleAlert } from 'lucide-react'
import { useRef, useState } from 'react'
import {
	CreateNewBook,
	FillGuardAndCaramel,
	ResetProducts,
	SelectBook,
	SelectFile,
	StartFill,
	StartInventory,
} from '../../wailsjs/go/main/App'
import './globals.css'

export type ProgramError = {
	StatusCode: string
	Block: string
	Message: string
}

export type ProgramResponse = {
	Products: string[]
	GuardProducts: string[]
}

const Sheets: Record<number, string> = {
	0: 'накл вс.',
	1: 'накл пн.',
	2: 'накл вт.',
	3: 'накл ср',
	4: 'накл чт.',
	5: 'накл  пт',
	6: 'накл сб',
}

function App() {
	const [fileName, setFileName] = useState<string>('')
	const [secondFileName, setSecondFileName] = useState<string>('')
	const [bookName, setBookName] = useState<string>('')
	const [result, setResult] = useState<string[]>([])
	const [resultGuard, setResultGuard] = useState<string[]>([])
	const [isPending, setIsPending] = useState<boolean>(false)
	const [date, setDate] = useState<string>('')
	const [caramel, setCaramel] = useState<string>('')
	const [sheetName, setSheetName] = useState<string>('')
	const { login, isAuthenticated } = useAuth()
	const inputRef = useRef<HTMLInputElement>(null)

	const { toast } = useToast()

	const read = () => {
		setIsPending(true)
		if (sheetName.length) {
			SelectFile(sheetName)
				.then(res => {
					const name = res.split('\\')[res.split('\\').length - 1]
					setFileName(name)
				})
				.catch(e => {
					console.log(e)
					let err
					try {
						err = JSON.parse(e) as ProgramError
					} catch (e) {
						console.log(e)
					}
					toast({
						title: err?.Message,
						description: `Код ошибки: ${err?.StatusCode}${err?.Block}`,
					})
				})
				.finally(() => {
					setIsPending(false)
				})
		} else {
			setIsPending(false)
			toast({
				title: 'Необходимо выбрать корректную дату!',
				description: 'Код ошибки: 0x1front',
			})
		}
	}

	const readSecond = () => {
		setIsPending(true)
		if (sheetName.length) {
			SelectFile(sheetName)
				.then(res => {
					const name = res.split('\\')[res.split('\\').length - 1]
					setSecondFileName(name)
				})
				.catch(e => {
					let err
					try {
						err = JSON.parse(e) as ProgramError
					} catch (e) {
						console.log(e)
					}
					toast({
						title: err?.Message,
						description: `Код ошибки: ${err?.StatusCode}${err?.Block}`,
					})
				})
				.finally(() => {
					setIsPending(false)
				})
		} else {
			setIsPending(false)
			toast({
				title: 'Необходимо выбрать корректную дату!',
				description: 'Код ошибки: 0x1front',
			})
		}
	}

	const readBook = () => {
		setIsPending(true)
		SelectBook()
			.then(res => {
				const name = res.split('\\')[res.split('\\').length - 1]
				setBookName(name)
			})
			.catch(e => {
				let err
				try {
					err = JSON.parse(e) as ProgramError
				} catch (e) {
					console.log(e)
				}
				toast({
					title: err?.Message,
					description: `Код ошибки: ${err?.StatusCode}${err?.Block}`,
				})
			})
			.finally(() => {
				setIsPending(false)
			})
	}

	const start = async () => {
		setIsPending(true)
		setTimeout(async () => {
			try {
				const res = (await StartFill(date)) as ProgramResponse

				console.log(res)
				console.log(res.Products)
				console.log(res.GuardProducts)

				setResult(res.Products ?? [])
				setResultGuard(res.GuardProducts ?? [])

				if (
					(!res.Products || !res.Products.length) &&
					(!res.GuardProducts || !res.GuardProducts.length)
				) {
					toast({
						description: 'Все продукты успешно занесены в книгу!',
						variant: 'success',
						style: {
							backgroundColor: '#22c55e',
						},
					})
				}
			} catch (e: any) {
				let err
				console.log(e)
				try {
					err = JSON.parse(e) as ProgramError
				} catch (e) {
					console.log(e)
				}
				toast({
					title: err?.Message,
					description: `Код ошибки: ${err?.StatusCode}${err?.Block}`,
				})
			} finally {
				setIsPending(false)
			}
		}, 400)
	}

	const startFillGuardAndCaramel = async () => {
		setIsPending(true)
		try {
			await FillGuardAndCaramel(bookName, caramel, date)
		} catch (e) {
			console.log(e)
		} finally {
			setIsPending(false)
		}
	}

	const handleSetDate = (date: Date) => {
		setDate(dayjs(date).format('MM-DD-YY'))
		const weekday: number = date.getDay()

		setSheetName(Sheets[weekday])
	}

	const resetProducts = () => {
		console.log('reset')
		ResetProducts().then(() => {
			setFileName('')
			setSecondFileName('')
			setResult([])
			setResultGuard([])
			toast({
				description: 'Продукты успешно сброшены!',
				variant: 'success',
				style: {
					backgroundColor: '#22c55e',
				},
			})
		})
	}

	if (!isAuthenticated) {
		return (
			<div className='w-screen h-screen relative overflow-hidden flex bg-[#fff]'>
				{/* <div className='absolute backdrop-blur-md w-screen h-screen bg-[#fff]/20 z-[1]'></div> */}
				<div className='wave z-[0]'></div>
				<div
					className='flex flex-col gap-[55px] min-w-screen min-h-screen w-screen h-screen justify-center p-[95px] relative overflow-hidden main items-center z-10'
					onClick={() => {
						inputRef.current?.focus()
					}}
				>
					<InputOTP
						ref={inputRef}
						maxLength={4}
						tabIndex={1}
						autoFocus
						onComplete={async value => {
							login(value).catch(e => {
								console.log(e, 'test')
							})
						}}
						className='z-[2] bg-white'
					>
						<InputOTPGroup>
							<InputOTPSlot
								autoFocus
								index={0}
								className='text-black font-medium text-[48px]'
							/>
							<InputOTPSlot
								index={1}
								className='text-black font-medium text-[48px]'
							/>
							<InputOTPSlot
								index={2}
								className='text-black font-medium text-[48px]'
							/>
							<InputOTPSlot
								index={3}
								hidden
								className='text-black font-medium text-[48px]'
							/>
						</InputOTPGroup>
					</InputOTP>
				</div>
			</div>
		)
	}
	return (
		<div className='w-screen h-screen bg-[#fff]'>
			<div
				data-auth={isAuthenticated}
				className='flex flex-col gap-[55px] min-w-screen min-h-screen w-screen h-screen justify-start p-[95px] bg-[#fff] relative overflow-hidden main'
			>
				<div className='wave animate-wave'></div>
				<form className='flex gap-[144px] z-10 content justify-between animate-show'>
					<CalendarModule onSelect={handleSetDate} />
					<MainModule
						date={date}
						fileName={fileName}
						secondFileName={secondFileName}
						bookName={bookName}
						caramel={caramel}
						isPending={isPending}
						read={read}
						readSecond={readSecond}
						readBook={readBook}
						resetProducts={resetProducts}
						setCaramel={setCaramel}
						start={start}
						startFillGuardAndCaramel={startFillGuardAndCaramel}
					/>
					<div className='flex flex-col gap-8 min-w-[240px]'>
						<div className='flex flex-col gap-[10px]'>
							<button
								onClick={e => {
									e.preventDefault()
									setIsPending(true)
									StartInventory().finally(() => {
										setIsPending(false)
									})
								}}
								disabled={!bookName.length || isPending}
								className='bg-[#3A903D]/30 flex gap-[15px] items-center h-[40px] rounded-lg px-3 font-medium self-center transition-all duration-200 hover:bg-[#3A903D]/40 w-full text-[#4A5660] disabled:bg-[#215223]/30'
							>
								<img src='./icons/inventIcon.svg' alt='' />
								Данные для инвента
							</button>
							<div className='relative'>
								{/* {(!bookName.length || !date.length) && (
								<div className='absolute w-[100%] h-[calc(100%+20px)] bg-black/20 backdrop-blur-sm flex items-center justify-center -top-[10px] left-0 rounded-lg text-white gap-2'>
									<Lock size={48} className='min-w-12 min-h-12' />
									<span className='text-[16px] text-white font-medium'>
										Приложите необходимые файлы
									</span>
								</div>
							)} */}
								<button
									onClick={e => {
										e.preventDefault()
										setIsPending(true)
										CreateNewBook(date)
											.catch(e => {
												console.log(e)
											})
											.finally(() => {
												setIsPending(false)
											})
									}}
									disabled={!bookName.length || !date.length || isPending}
									className='bg-[#3A903D]/30 flex gap-[15px] items-center h-[40px] rounded-lg px-3 font-medium self-center transition-all duration-200 hover:bg-[#3A903D]/40 w-full text-[#4A5660] disabled:bg-[#215223]/30'
								>
									<img src='./icons/SheetsIcon.svg' alt='' />
									Создать новую книгу
								</button>
							</div>
						</div>
						<div className='flex flex-col gap-[10px]'>
							{isPending && (
								<div className='flex gap-[18px] bg-[#F2F4F7] shadow-lg rounded-lg px-4 py-[18px] max-w-[260px] items-center'>
									<TriangleAlert
										size={48}
										className='min-w-[48px] min-h-[48px] text-[#903939]'
									/>
									<span className='text-[22px] text-[#903939] font-medium leading-[26px]'>
										Программа выполняется
									</span>
								</div>
							)}
							{!isPending && (
								<div className='flex gap-[18px] bg-[#F2F4F7] shadow-lg rounded-lg px-[8px] py-[16px] max-w-[260px] items-center'>
									<span className='text-[22px] text-[#399039] font-medium leading-[26px] text-center'>
										Программа завершила выполнение
									</span>
								</div>
							)}
						</div>
					</div>
				</form>
				<div className='flex flex-col gap-[20px] w-full h-full z-10 animate-show'>
					<span className='text-[32px] font-medium'>
						Продукты, которые не были найдены
					</span>
					<textarea
						readOnly
						className='resize-none w-full h-full bg-[#D9D9D9] rounded-lg outline-none p-6'
						value={`${
							!!result.length
								? 'Не найдено в шведском столе:\n' + result.join(', ')
								: ''
						}\n${
							!!resultGuard.length
								? 'Не найдено в общевойсковом пайке:\n' + resultGuard.join(', ')
								: ''
						}`}
					></textarea>
				</div>
			</div>
		</div>
	)
}

export default App
