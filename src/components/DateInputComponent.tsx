import React, { useState } from 'react';
import { fetchHistoricCalls } from '../fetching/fetchinglistCallsByDate';


interface DateInputComponentProps {
    setResponse: React.Dispatch<React.SetStateAction<any>>;
}

const DateInputComponent: React.FC<DateInputComponentProps> = ({ setResponse }) => {
    const [date, setDate] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (date) {
            try {
                const data = await fetchHistoricCalls(date);
                console.log(data);
                setResponse(data);
                setError(null);
            } catch (error: any) {
                setError(error.message || 'Error fetching data');
            }
        } else {
            setError('Please provide a valid date');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Select a Date</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DateInputComponent;
