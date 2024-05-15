import React, { useState } from "react";
import QuestionForm from "./QuestionForm";
import { Link, useNavigate } from "react-router-dom";
import type { Question, Assignment } from "../../models";


const AssignmentComponent: React.FC = () => {
    const [title, setTitle] = useState<string>('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

    const navigate = useNavigate();

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const addOrEditQuestion = (question: Question) => {
        if (editingQuestion) {
            const updatedQuestions = questions.map((item) =>
                item.id === editingQuestion.id ? question : item
            );
            setQuestions(updatedQuestions);
        } else {
            setQuestions([...questions, { ...question, id: Date.now() }]);
        }
        setEditingQuestion(null);
    };

    const startEditing = (question: Question) => {
        setEditingQuestion(question);
    };

    const deleteQuestion = (questionId: number) => {
        if (window.confirm("Are you sure you want t odelete this question ?")) {
            const updatedQuestions = questions.filter((item) => item.id !== questionId);
            setQuestions(updatedQuestions);
        }
    };

    const saveAssignment = () => {
        if (title.trim() && questions.length > 0) {
            const newAssignment: Assignment = { 
                id: Date.now(), 
                title, 
                questions, 
                createdAt: new Date().toISOString(), 
                completed: false 
            };
            const existingAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
            existingAssignments.push(newAssignment);
            localStorage.setItem('assignments', JSON.stringify(existingAssignments));
            alert('Assignment saved successfully!');
            setTitle('');
            setQuestions([]);
            navigate('/student');
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
                    <div key={question.id} className="bg-white p-4 rounded-lg shadow-lg mb-4 flex justify-between items-center">
                        <div>
                            <p className="font-bold">{question.description}</p>
                            <p className="text-sm">{`Points: ${question.points}`}</p>
                            <p className="text-sm">Answers: {question.options.join(', ')}</p>
                        </div>
                        <div>
                            <button onClick={() => startEditing(question)} className="btn btn-warning mr-2">Edit</button>
                            <button onClick={() => deleteQuestion(question.id)} className="btn btn-error">Delete</button>
                        </div>
                    </div>
                ))}
                <QuestionForm question={editingQuestion} addOrEditQuestion={addOrEditQuestion} />
                <button onClick={saveAssignment} className="btn btn-primary mt-4">
                        Create assignment
                </button>
            </div>
        </div>
    );
};

export default AssignmentComponent;
