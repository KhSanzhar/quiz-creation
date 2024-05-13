import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import { Link } from "react-router-dom";
import type { Question, Assignment } from "../../models";


const AssignmentComponent: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const addOrEditQuestion = (question: Question) => {
        if (editingIndex !== null) {
            const updatedQuestions = questions.map((item, index) =>
                index === editingIndex ? question : item
            );
            setQuestions(updatedQuestions);
            setEditingIndex(null);
        } else {
            setQuestions([...questions, question]);
        }
    };

    const startEditing = (index: number) => {
        setEditingIndex(index);
    };

    const deleteQuestion = (index: number) => {
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
        if (editingIndex !== null && editingIndex >= index) {
            setEditingIndex(editingIndex - 1);
        }
    };

    const saveAssignment = () => {
        if (title.trim() && questions.length > 0) {
            const newAssignment: Assignment = { title, questions, createdAt: new Date().toISOString() };
            const existingAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
            existingAssignments.push(newAssignment);
            localStorage.setItem('assignments', JSON.stringify(existingAssignments));
            alert('Assignment saved successfully!');
            setTitle('');
            setQuestions([]);
        } else {
            alert('Please add a title and at least one question.');
        }
    }

    return (
        <div className="bg-white p-5 rounded-lg shadow max-w-4xl mx-auto my-4 mt-20">
            <div className="container mx-auto">
                <input 
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    placeholder="Name of assignment"
                    className="input input-bordered w-full max-w-xs"
                />
                {questions.map((question, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-lg mb-4 flex justify-between items-center">
                        <div>
                            <p className="font-bold">{question.description}</p>
                            <p className="text-sm">{`Points: ${question.points}`}</p>
                            <p className="text-sm">Answers: {question.options.join(', ')}</p>
                        </div>
                        <div>
                            <button onClick={() => startEditing(index)} className="btn btn-warning mr-2">Edit</button>
                            <button onClick={() => deleteQuestion(index)} className="btn btn-error">Delete</button>
                        </div>
                    </div>
                ))}
                <QuestionForm question={editingIndex !== null ? questions[editingIndex] : null} addOrEditQuestion={addOrEditQuestion} />
                <button onClick={saveAssignment} className="btn btn-primary mt-4">
                    <Link to='/student'>
                        Create assignment
                    </Link>
                </button>
            </div>
        </div>
    );
};

export default AssignmentComponent;
