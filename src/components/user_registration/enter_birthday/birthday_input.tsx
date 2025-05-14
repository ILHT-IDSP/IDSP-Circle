import { IInputProps } from '../register_types';
import { useMemo } from 'react';

export interface BirthdayInputProps extends IInputProps {
	onValidityChange?: (valid: boolean) => void;
}

export default function RegisterBirthdayInput({ value, onChange, onValidityChange }: BirthdayInputProps) {
	// Parse the value into year, month, day
	let year = '',
		month = '',
		day = '';
	if (value) {
		const date = new Date(value);
		if (!isNaN(date.getTime())) {
			year = String(date.getFullYear());
			month = String(date.getMonth() + 1).padStart(2, '0');
			day = String(date.getDate()).padStart(2, '0');
		}
	}

	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
	const months = Array.from({ length: 12 }, (_, i) => i + 1);
	const daysInMonth = (y: number, m: number) => new Date(y, m, 0).getDate();
	const days = year && month ? Array.from({ length: daysInMonth(Number(year), Number(month)) }, (_, i) => i + 1) : Array.from({ length: 31 }, (_, i) => i + 1);

	const handleChange = (type: 'year' | 'month' | 'day') => (e: React.ChangeEvent<HTMLSelectElement>) => {
		let newYear = year,
			newMonth = month,
			newDay = day;
		if (type === 'year') newYear = e.target.value;
		if (type === 'month') newMonth = e.target.value;
		if (type === 'day') newDay = e.target.value;
		if (newYear && newMonth && newDay) {
			// Construct ISO string (midnight UTC)
			const iso = new Date(Number(newYear), Number(newMonth) - 1, Number(newDay), 0, 0, 0, 0).toISOString();
			onChange({
				target: {
					name: 'birthday',
					value: iso,
				},
			} as React.ChangeEvent<HTMLInputElement>);
		}
	};

	// Only enable Next if all fields are selected
	const isValid = !!(year && month && day);
	useMemo(() => {
		if (onValidityChange) onValidityChange(isValid);
	}, [isValid, onValidityChange]);

	return (
		<div className='w-full'>
			<label className='block font-bold mb-2'>Birthday</label>
			<div className='flex gap-2'>
				<select
					className='rounded-2xl border border-gray-300 p-2 text-black bg-white'
					value={month}
					onChange={handleChange('month')}
				>
					<option value=''>Month</option>
					{months.map(m => (
						<option
							key={m}
							value={String(m).padStart(2, '0')}
						>
							{new Date(0, m - 1).toLocaleString('default', { month: 'long' })}
						</option>
					))}
				</select>
				<select
					className='rounded-2xl border border-gray-300 p-2 text-black bg-white'
					value={day}
					onChange={handleChange('day')}
					disabled={!month || !year}
				>
					<option value=''>Day</option>
					{days.map(d => (
						<option
							key={d}
							value={String(d).padStart(2, '0')}
						>
							{d}
						</option>
					))}
				</select>
				<select
					className='rounded-2xl border border-gray-300 p-2 text-black bg-white'
					value={year}
					onChange={handleChange('year')}
				>
					<option value=''>Year</option>
					{years.map(y => (
						<option
							key={y}
							value={y}
						>
							{y}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
