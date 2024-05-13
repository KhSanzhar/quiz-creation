import React, { useEffect, useState } from "react";
import { Question, Assignment } from "../../models";


const Dashboard: React.FC = () => {

    const [assignments, setAssignments] = useState<Assignment[]>([]);

    useEffect(() => {
        let loadedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');

        loadedAssignments = loadedAssignments.sort((a: Assignment, b: Assignment) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setAssignments(loadedAssignments);
    }, []);

    return (
        <div className="container mx-auto mt-20">
            <h1 className="text-2xl font-bold mb-4">Available Assignments</h1>
            <ul className="list-none pl-0">
                {assignments.map((assignment, index) => (
                    <li key={index} className="mb-4 p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow">
                        <button
                            className="text-blue-600 hover:text-blue-800 font-semibold"
                            onClick={() => window.location.href = `/test/${index}`}
                        >
                            {assignment.title} - {new Date(assignment.createdAt).toLocaleDateString()}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;