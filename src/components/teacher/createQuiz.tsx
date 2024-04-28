import React, { HtmlHTMLAttributes, useState } from "react";

interface Option {
    id: number;
    value: string;
    isCorrect: boolean;
}

const CreateQuiz: React.FC = () => {
    const [description, setDescription] = useState('');
    const [options, setOptions] = useState<Option[]>([
        { id: 1, value: '', isCorrect: false},
        { id: 2, value: '', isCorrect: false},
        { id: 3, value: '', isCorrect: false},
        { id: 4, value: '', isCorrect: false},
    ]);
    const [timeLimit, setTimeLimit] = useState('');

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleOptionChange = (id: number, value: string) => {
        setOptions(options.map(option => option.id === id ? {...option, value } : option));
    }

    const handleCorrectAnswer = (id: number) => {
        setOptions(options.map(option => ({
            ...option,
            isCorrect: option.id === id
        })));
    };

    const handleTimeLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTimeLimit(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log({description, options, timeLimit});
    };


    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="description">Description of test:</label>
                <textarea id="description" value={description} onChange={handleDescriptionChange} />
            </div>
            <div>
                {options.map(option => (
                    <div>
                        <input
                            type="text"
                            value={option.value}
                            onChange={e => handleOptionChange(option.id, e.target.value)}
                        />
                        <input
                            type="radio"
                            name="correctAnwer"
                            checked={option.isCorrect}
                            onChange={() => handleCorrectAnswer(option.id)}
                        />
                    </div>
                ))}
            </div>
            <div>
                <label htmlFor="timeLimit">Time:</label>
                <input
                    type="number"
                    id="timeLimit"
                    value={timeLimit}
                    onChange={handleTimeLimitChange}
                />
            </div>
            <button type="submit">Create test</button>
        </form>
    );
};

export default CreateQuiz;