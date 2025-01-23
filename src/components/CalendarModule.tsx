'use client'

import { ru } from 'date-fns/locale'
import { useState } from 'react'
import { Calendar } from './ui/calendar'

const CalendarModule = ({ onSelect }: { onSelect: (date: Date) => void }) => {
	const [selectedDate, setSelectedDate] = useState<Date>()

	return (
		<div className='flex items-start gap-3 relative'>
			<span className='flex items-center justify-center rounded-[50%] bg-[#F2F5FA] translate-y-4 size-8 shadow-lg text-[#4A5660] font-medium'>
				1
			</span>
			{!selectedDate && (
				<span className='text-[#903939] text-[20px] absolute bottom-full font-medium left-1/2 -translate-x-[35%]'>
					Выберите дату!
				</span>
			)}
			<Calendar
				mode='single'
				showOutsideDays
				locale={ru}
				selected={selectedDate}
				className='w-full bg-white rounded-[12px] min-w-[330px] max-w-[330px] shadow-lg'
				fixedWeeks
				onSelect={selected => {
					if (selected) {
						onSelect(selected)
						setSelectedDate(selected)
					}
				}}
			/>
		</div>
	)
}

export default CalendarModule
