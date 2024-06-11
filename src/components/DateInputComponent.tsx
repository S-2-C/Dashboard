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
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex items-center">
                <h2 className="text-2xl font-bold text-gray-800 mr-4">Select a Date:</h2>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={date}
                    onChange={handleDateChange}
                    required
                    className="block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        </div>
    );
};

export default DateInputComponent;
