import React, { useState } from 'react';
import { Option } from '../../models';


interface OptionProps {
    option: Option;
    onTextChange: (id: number, value: string) => void;
    onCorrectChange: (id: number) => void;
}

const OptionInput: React.FC<OptionProps> = ({ option, onTextChange, onCorrectChange }) => (
    <div className="flex items-center mb-4">
        <input 
            type="text"
            value={option.value}
            onChange={(e) => onTextChange(option.id, e.target.value)}
            className="shadow appearance-none border rounded mr-3 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
        />
        <input
            type="radio"
            name="correctAnswer"
            checked={option.isCorrect}
            onChange={() => onCorrectChange(option.id)}
            className="form-radio h-5 w-5 text-blue-600"
        />
    </div>
);

const CreateQuiz: React.FC = () => {
    const [description, setDescription] = useState<string>('');
    const [options, setOptions] = useState<Option[]>([
        { id: 1, value: '', isCorrect: false},
        { id: 2, value: '', isCorrect: false},
        { id: 3, value: '', isCorrect: false},
        { id: 4, value: '', isCorrect: false},
    ]);
    const [timeLimit, setTimeLimit] = useState<string>('');

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleOptionChange = (id: number, value: string) => {
        setOptions(options.map(option => option.id === id ? { ...option, value } : option));
    };

    const handleCorrectAnswer = (id: number) => {
        setOptions(options.map(option => ({ ...option, isCorrect: option.id === id })));
    };

    const handleTimeLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTimeLimit(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log({ description, options, timeLimit });
    };

    return (
        <div className="mt-20">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                        Description of test:
                    </label>
                    <textarea 
                        id="description" 
                        value={description} 
                        onChange={handleDescriptionChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    {options.map(option => (
                        <OptionInput
                            key={option.id}
                            option={option}
                            onTextChange={handleOptionChange}
                            onCorrectChange={handleCorrectAnswer}
                        />
                    ))}
                </div>
                <div className="mb-6">
                    <label htmlFor="timeLimit" className="block text-gray-700 text-sm font-bold mb-2">
                        Time:
                    </label>
                    <input
                        type="number"
                        id="timeLimit"
                        value={timeLimit}
                        onChange={handleTimeLimitChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Create test
                </button>
            </form>
        </div>
    );
};

export default CreateQuiz;
