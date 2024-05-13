import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Question, Assignment } from '../../models';


const TakeAssignment: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});
  const [results, setResults] = useState<{ score: number, total: number, detailedResult: any[] } | null>()


  useEffect(() => {
    const loadedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    if (testId !== undefined) {
      const id = parseInt(testId, 10);

      if (!isNaN(id) && loadedAssignments[id]) {
        setAssignment(loadedAssignments[id]);
      } else {
        alert('Test not found!');
      }
    }
  }, [testId]);

  const handleAnswerChange = (questionIndex: number, answer: string | number[]) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer
    });
  };

  const submitAnswers = () => {
    console.log('Submitted Answers:', answers);
    alert('Answers submitted!');
    // Optionally redirect or handle next steps
  };

  const submitAssignment = () => {
    let score = 0;
    let total = 0;
    const detailedResults = assignment?.questions.map((question, index) => {
      const userAnswer = answers[index];
      const correctAnswer = question.correctOption;
      const isCorrect = question.type === 'multiple' ?
                        JSON.stringify(userAnswer.sort()) === JSON.stringify(correctAnswer.sort()) :
                        userAnswer[0] === correctAnswer[0];

      

      if (question.type !== 'text' && isCorrect) {
        score += question.points;
        total += question.points;
      }

      return {
        question,
        userAnswer,
        isCorrect
      };
    });


    const newResult = {
      score,
      total,
      detailedResults,
      completed: true,
      title: assignment?.title,
      createdAt: assignment?.createdAt
    };

    const existingResults = JSON.parse(localStorage.getItem('results') || '[]');
    existingResults.push(newResult);
    localStorage.setItem('results', JSON.stringify(existingResults));

    alert('Assignment submitted! Your score: ' + score + ' out of ' + total);
  }

  if (!assignment) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-24">
      <h1 className="text-2xl font-bold mb-4">{assignment.title}</h1>
      {assignment.questions.map((question, index) => (
        <div key={index} className="mb-6">
          <p className="mb-2 font-semibold">{question.description}</p>
          {question.type === 'text' ? (
            <input
              type="text"
              value={answers[index] || ''}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          ) : (
            question.options.map((option, optIndex) => (
              <div key={optIndex}>
                <input
                  type={question.type === 'multiple' ? 'checkbox' : 'radio'}
                  name={`question-${index}`}
                  value={optIndex}
                  checked={answers[index]?.includes(optIndex)}
                  onChange={(e) => {
                    const selectedOption = parseInt(e.target.value, 10);
                    if (question.type === 'multiple') {
                      const updatedOptions = answers[index] ? [...answers[index]] : [];
                      if (e.target.checked) {
                        updatedOptions.push(selectedOption);
                      } else {
                        const optionIndex = updatedOptions.indexOf(selectedOption);
                        if (optionIndex > -1) {
                          updatedOptions.splice(optionIndex, 1);
                        }
                      }
                      handleAnswerChange(index, updatedOptions);
                    } else {
                      handleAnswerChange(index, [selectedOption]);
                    }
                  }}
                />
                {option}
              </div>
            ))
          )}
        </div>
      ))}
      <button onClick={submitAssignment} className="btn btn-primary mt-4">
      {/* <button onClick={() => console.log('Submitted Answers:', answers)} className="btn btn-primary mt-4"> */}
        <Link to='/results'>
          Submit Assignment
        </Link>
      </button>
    </div>
  );
};

export default TakeAssignment;
