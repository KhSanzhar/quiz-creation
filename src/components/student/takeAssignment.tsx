import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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

const TakeTest: React.FC = () => {
  const { testId } = useParams<{ testId?: string }>();  // Помечаем testId как необязательный
  const [assignment, setAssignment] = useState<Assignment | null>(null);

  useEffect(() => {
    const loadedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    // Обеспечиваем, что testId определен перед его использованием
    if (testId !== undefined) {
      const id = parseInt(testId, 10);
      if (!isNaN(id) && id >= 0 && id < loadedAssignments.length) {
        setAssignment(loadedAssignments[id]);
      } else {
        alert('Test not found!');
      }
    }
  }, [testId]);

  return (
    <div className="container mx-auto mt-10">
      {assignment ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{assignment.title}</h1>
          {assignment.questions.map((question, index) => (
            <div key={index} className="mb-6">
              <p className="mb-2 font-semibold">{question.description}</p>
              {question.options.map((option, optIndex) => (
                <div key={optIndex}>
                  <input type="radio" name={`question-${index}`} id={`option-${index}-${optIndex}`} />
                  <label htmlFor={`option-${index}-${optIndex}`}>{option}</label>
                </div>
              ))}
            </div>
          ))}
        </>
      ) : (
        <p>Loading test...</p>
      )}
    </div>
  );
};

export default TakeTest;
