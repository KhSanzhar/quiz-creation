import React, { useEffect, useState } from "react";

interface Question {
    type: 'single' | 'multiple' | 'text';
    description: string;
    options: string[];
    points: number;
    correctOption: number[];
  }
  
  interface Assignment {
    title: string;
    questions: Question[];
  }


const Dashboard: React.FC = () => {

    const [assignments, setAssignments] = useState<Assignment[]>([]);

    useEffect(() => {
        const loadedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
        setAssignments(loadedAssignments);
    }, []);

    return (
        <div className="container mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-4">Available Assignments</h1>
            <ul className="list-disc pl-5">
                {assignments.map((assignment, index) => (
                    <li key={index}>
                        <button
                            className="text-blue-600 hover:text-blue-800"
                            onClick={() => window.location.href = `/test/${index}`}
                        >
                            {assignment.title}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;