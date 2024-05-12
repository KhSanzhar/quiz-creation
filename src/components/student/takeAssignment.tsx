import React, { useEffect, useState } from "react";
import Assignment from "../newTeacher/Assignment";

const TakeAssignment: React.FC = () => {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);

    useEffect(() => {
        const loadedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
        setAssignments(loadedAssignments);
    }, []);

    const selectAssignment = (assignment: Assignment) => {
        setSelectedAssignment(assignment);
    };

    return (
        <div>
            {!selectedAssignment ? (
                <div>
                    {assignments.map((assignment, index) =>(
                        <button key={index} onClick={() => selectAssignment(assignment)}>
                            {assignment.title}
                        </button>
                    ))}
                </div>
            ) : (
                <div>
                    <h1>{selectedAssignment.title}</h1>
                    {selectedAssignment .questions.map((question, index) => (
                        <div key={index}>
                            <p>{question.description}</p>
                            {question.options.map((option, optIndex) => (
                                <div key={optIndex}>
                                    <input 
                                        type="radio"
                                        name={`question-${index}`}
                                    />
                                    {option}
                                </div>
                            ))}
                        </div>
                    ))}
                    <button onClick={() => setSelectedAssignment(null)}>
                        Back To Tests
                    </button>
                </div>
            )}
        </div>
    );
};

export default TakeAssignment;