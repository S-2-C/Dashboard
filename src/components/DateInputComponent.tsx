import React, { useState } from 'react';
import { fetchHistoricCalls } from '../fetching/fetchinglistCallsByDate';

interface DateInputComponentProps {
    setResponse: React.Dispatch<React.SetStateAction<any>>;
    date: string;
    setDate: React.Dispatch<React.SetStateAction<string>>;
}

const DateInputComponent: React.FC<DateInputComponentProps> = ({ setResponse, date, setDate }) => {
    const [error, setError] = useState<string | null>(null);

    const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedDate = e.target.value;
        setDate(selectedDate);
        if (selectedDate) {
            try {
                const data = await fetchHistoricCalls(selectedDate);
                setResponse(data);
                setError(null);
            } catch (error: any) {
                setError(error.message || 'No data found for the selected date');
            }
        } else {
            setError('Please provide a valid date');
        }
    };

    return (
        <div className="p-4 rounded-lg border border-gray-300 text-center shadow-md w-full h-full flex items-center justify-center">
            <div className="flex items-center w-full">
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={handleDateChange}
                    required
                    className="p-4 rounded-lg border border-gray-300 bg-blue-50 text-center shadow-md w-full h-full flex items-center justify-center"/>
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
    );
};

export default DateInputComponent;
