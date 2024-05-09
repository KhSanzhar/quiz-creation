import React, { useState } from "react";
import QuestionForm from "./QuestionForm";

interface Question {
    description: string;
    options: string[];
    points: number;
}

const Assignment: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [questions, setQuestions] = useState<Question[]>([]);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const addQuestion = (question: Question) => {
        setQuestions([...questions, question]);
    };

    const saveAssignment = () => {
        console.log('Saving quiz', { title, questions });
    };

    return (
        <div className="container mx-auto px-4 mt-10">
            <input 
                type="text"
                value={title}
                onChange={handleTitleChange}
                placeholder="Name of assignment"
                className="input input-bordered w-full mb-4"
            />
            {questions.map((question, index) => (
                <div key={index} className="card bg-white p-4 mb-2 shadow-md rounded-lg">
                    <h5 className="text-lg font-bold mb-2">{question.description}</h5>
                    <p className="mb-1">{`Points: ${question.points}`}</p>
                    <p>Answers: {question.options.join(', ')}</p>
                </div>
            ))}
            <QuestionForm addQuestion={addQuestion} />
            <button onClick={saveAssignment} className="btn btn-primary mt-4">Create assignment</button>
        </div>
    );
};

export default Assignment;