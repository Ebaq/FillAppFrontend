'use client'

import { Calendar } from '@/components/ui/calendar'
import { useToast } from '@/hooks/use-toast'
import { ru } from 'date-fns/locale'
import dayjs from 'dayjs'
import { useState } from 'react'
import {
	FillGuardAndCaramel,
	ResetProducts,
	SelectBook,
	SelectFile,
	StartFill,
} from '../../wailsjs/go/main/App'
import './globals.css'

type ProgramError = {
	StatusCode: string
	Block: string
	Message: string
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
	const [isPending, setIsPending] = useState<boolean>(false)
	const [date, setDate] = useState<string>('')
	const [sel, setSel] = useState<Date>()
	const [caramel, setCaramel] = useState<string>('')
	const [sheetName, setSheetName] = useState<string>('')

	const { toast } = useToast()

	const read = () => {
		setIsPending(true)
		if (sheetName.length) {
			SelectFile(sheetName)
				.then(res => setFileName(res))
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

	const readSecond = () => {
		setIsPending(true)
		if (sheetName.length) {
			SelectFile(sheetName)
				.then(res => setFileName(res))
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
			.then(res => setBookName(res))
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
				const res = await StartFill(date)

				if (res.length) {
					setResult(res)
				}
			} catch (e) {
				let err
				try {
					err = JSON.parse(e as string) as ProgramError
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

	const handleSetDate = (selected: Date) => {
		setDate(dayjs(selected).format('MM-DD-YY'))
		setSel(selected)
		// setWeekDay(selected.)
		// setSheetName(selected?.getDay())
		const weekday: number = selected.getDay()

		setSheetName(Sheets[weekday])
	}

	return (
		<>
			<div className='flex flex-col gap-[40px] min-w-screen min-h-screen w-full h-full items-center justify-start py-[32px]'>
				<form className='flex flex-col gap-[20px] items-start max-w-[330px]'>
					{/* <DatePicker
						className='w-full date-panel'
						locale={gregorian_ru}
						inputClass='w-full datePicker'
						style={{
							background: 'transparent',
							borderColor: '#80cbc4',
							borderWidth: '2px',
							outline: 'none',
							borderRadius: 6,
							color: '#000',
							paddingLeft: 10,
							fontWeight: 500,
							fontSize: 24,
						}}
						showOtherDays
						weekStartDayIndex={1}
						containerStyle={{
							width: '100%',
						}}
						format='DD.MM.YYYY'
						value={dayjs(date).format('DD.MM.YYYY')}
						onChange={selected => {
							console.log(selected)
							if (
								selected!.toString().length <= 10
								// dayjs(selected!.toDate().toDateString()).toString()
							) {
								setDate(
									dayjs(selected!.toDate().toDateString()).format('MM-DD-YY')
								)
								setWeekDay(selected?.weekDay.name!)
							}
						}}
					/> */}
					<Calendar
						mode='single'
						showOutsideDays
						locale={ru}
						selected={sel}
						className='w-full bg-white rounded-[12px] min-w-[330px] max-w-[330px]'
						fixedWeeks
						onSelect={selected => {
							if (selected) {
								handleSetDate(selected)
							}
						}}
					/>
					{/*<div className='text-white'>Загрузите файл</div>*/}
					<div className='flex gap-[15px] items-start max-w-full'>
						<button
							onClick={e => {
								e.preventDefault()
								read()
							}}
							disabled={!date.length}
							className='bg-green-400 flex items-center h-[40px] rounded-lg px-3 text-black font-medium self-center disabled:bg-red-500 transition-all duration-200 hover:bg-green-500'
						>
							Выбрать
						</button>
						<span className='text-lg font-normal w-full max-w-[65%] text-wrap break-words'>
							{fileName.length ? fileName : 'Выберите файл накладной'}
						</span>
					</div>
					<div className='flex gap-[15px] items-start max-w-full'>
						<button
							onClick={e => {
								e.preventDefault()
								readSecond()
							}}
							disabled={!date.length}
							className='bg-green-400 flex items-center h-[40px] rounded-lg px-3 text-black font-medium self-center disabled:bg-red-500 transition-all duration-200 hover:bg-green-500'
						>
							Выбрать
						</button>
						<span className='text-lg font-normal w-full max-w-[65%] text-wrap break-words'>
							{secondFileName.length
								? secondFileName
								: 'Выберите файл накладной'}
						</span>
					</div>
					<div className='flex gap-[15px] items-start max-w-full'>
						<button
							onClick={e => {
								e.preventDefault()
								readBook()
							}}
							className='bg-green-400 flex items-center h-[40px] rounded-lg px-3 text-black font-medium hover:bg-green-500 transition-all duration-200'
						>
							Выбрать
						</button>
						<span className='text-lg font-normal w-full max-w-[65%] text-wrap break-words'>
							{bookName.length ? bookName : 'Выберите файл книги'}
						</span>
					</div>
					<button
						disabled={!fileName.length || !bookName.length || isPending}
						className='bg-green-400 flex items-center h-[40px] rounded-lg px-3 text-black font-medium self-center disabled:bg-red-500 transition-all duration-200 hover:bg-green-500'
						onClick={e => {
							e.preventDefault()
							start()
						}}
					>
						Запустить
					</button>
					<button
						onClick={e => {
							e.preventDefault()
							ResetProducts().then(res => {
								toast({
									description: 'Продукты успешно сброшены!',
									variant: 'success',
									style: {
										backgroundColor: '#22c55e',
									},
								})
							})
						}}
						className='bg-green-400 flex items-center h-[40px] rounded-lg px-3 text-black font-medium hover:bg-green-500 transition-all duration-200'
					>
						Сбросить продукты
					</button>
					<input
						type='text'
						placeholder='Карамель'
						className='bg-transparent border-[#80cbc4] h-[40px] w-full rounded-[6px] border-2 placeholder:text-center outline-none px-[10px]'
						onChange={e => {
							setCaramel(e.target.value)
						}}
						value={caramel}
					/>
					<button
						disabled={!bookName.length || !date.length || isPending}
						className='bg-green-400 flex items-center h-[40px] rounded-lg px-3 text-black font-medium self-center disabled:bg-red-500 transition-all duration-200 hover:bg-green-500'
						onClick={e => {
							e.preventDefault()
							startFillGuardAndCaramel()
						}}
					>
						Заполнить караул и карамель
					</button>
				</form>
				{!!result.length && !isPending && (
					<div className=''>
						{result.map((el, index) => {
							return index == 0 ? <span>{el}</span> : <span>, {el}</span>
						})}
					</div>
				)}
				{isPending && (
					<div className=''>
						<span>Идет работа программы, пожалуйста дождитесь завершения</span>
					</div>
				)}
			</div>
		</>
	)
}

export default App
