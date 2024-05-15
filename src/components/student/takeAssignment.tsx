import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Question, Assignment } from '../../models';
import { time } from 'console';

const TakeAssignment: React.FC = () => {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [answers, setAnswers] = useState<{ [key: number]: any }>({});

  useEffect(() => {
    const loadedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
    const foundAssignment = loadedAssignments.find((ass: Assignment) => ass.id.toString() === testId);
    if (foundAssignment) {
      setAssignment(foundAssignment);
    } else {
      alert('Assignment not found!');
      navigate('/'); // Redirect to a safe page if the assignment is not found
    }
  }, [testId, navigate]);

  const handleAnswerChange = (questionIndex: number, answer: any) => {
    setAnswers({
      ...answers,
      [questionIndex]: answer
    });
  };

  const submitAssignment = () => {
    if (assignment) {
        let score = 0;
        let total = 0;
        const detailedResults = assignment.questions.map((question, index) => {
            const userAnswer = answers[index];
            const correctAnswer = question.correctOption;
            const isCorrect = question.type === 'multiple' ?
                              JSON.stringify(userAnswer.sort()) === JSON.stringify(correctAnswer.sort()) :
                              userAnswer === correctAnswer[0];

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

        const updatedAssignment = {
            ...assignment,
            completed: true
        };

        const existingAssignments: Assignment[] = JSON.parse(localStorage.getItem('assignments') || '[]');
        const updatedAssignments = existingAssignments.map(ass => ass.id === assignment.id ? updatedAssignment : ass);
        localStorage.setItem('assignments', JSON.stringify(updatedAssignments));

        const newResult = {
            assignmentId: assignment.id,
            title: assignment.title,
            score,
            total,
            detailedResults,
            completed: true
        };
        localStorage.setItem('results', JSON.stringify([...JSON.parse(localStorage.getItem('results') || '[]'), newResult]));
        
        alert('Assignment submitted! Your score: ' + score + ' out of ' + total);
        navigate('/results');
    } else {
        alert('No assignment found to submit.');
    }
};


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
      <button onClick={submitAssignment} className="btn btn-primary mt-4">Submit Assignment</button>
    </div>
  );
};

export default TakeAssignment;

























// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Question, Assignment } from '../../models';


// const TakeAssignment: React.FC = () => {
//   const { testId } = useParams<{ testId: string }>();
//   const [assignment, setAssignment] = useState<Assignment | null>(null);
//   const [answers, setAnswers] = useState<{ [key: number]: any }>({});

//   const navigate = useNavigate();

//   useEffect(() => {
//     const loadedAssignments = JSON.parse(localStorage.getItem('assignments') || '[]');
//     const foundAssignment = loadedAssignments.find((ass: Assignment) => ass.id?.toString() === testId);
//     if (foundAssignment) {
//       setAssignment(foundAssignment);
//     } else {
//       alert('Assignment not found!');
//       navigate('/');
//     }
//   }, [testId, navigate]);

//   const handleAnswerChange = (questionIndex: number, answer: any) => {
//     setAnswers({
//       ...answers,
//       [questionIndex]: answer
//     });
//   };



//   const submitAssignment = () => {
//     let score = 0;
//     let total = 0;
//     const detailedResults = assignment?.questions.map((question, index) => {
//       const userAnswer = answers[index];
//       const correctAnswer = question.correctOption;
//       const isCorrect = question.type === 'multiple' ?
//                         JSON.stringify(userAnswer.sort()) === JSON.stringify(correctAnswer.sort()) :
//                         userAnswer[0] === correctAnswer[0];

      

//       if (question.type !== 'text' && isCorrect) {
//         score += question.points;
//         total += question.points;
//       }

//       return {
//         question,
//         userAnswer,
//         isCorrect
//       };
//     });

//     setAssignment({ ...assignment, completed: true })
//   }

//   if (!assignment) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto mt-24">
//       <h1 className="text-2xl font-bold mb-4">{assignment.title}</h1>
//       {assignment.questions.map((question, index) => (
//         <div key={index} className="mb-6">
//           <p className="mb-2 font-semibold">{question.description}</p>
//           {question.type === 'text' ? (
//             <input
//               type="text"
//               value={answers[index] || ''}
//               onChange={(e) => handleAnswerChange(index, e.target.value)}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//             />
//           ) : (
//             question.options.map((option, optIndex) => (
//               <div key={optIndex}>
//                 <input
//                   type={question.type === 'multiple' ? 'checkbox' : 'radio'}
//                   name={`question-${index}`}
//                   value={optIndex}
//                   checked={answers[index]?.includes(optIndex)}
//                   onChange={(e) => {
//                     const selectedOption = parseInt(e.target.value, 10);
//                     if (question.type === 'multiple') {
//                       const updatedOptions = answers[index] ? [...answers[index]] : [];
//                       if (e.target.checked) {
//                         updatedOptions.push(selectedOption);
//                       } else {
//                         const optionIndex = updatedOptions.indexOf(selectedOption);
//                         if (optionIndex > -1) {
//                           updatedOptions.splice(optionIndex, 1);
//                         }
//                       }
//                       handleAnswerChange(index, updatedOptions);
//                     } else {
//                       handleAnswerChange(index, [selectedOption]);
//                     }
//                   }}
//                 />
//                 {option}
//               </div>
//             ))
//           )}
//         </div>
//       ))}
//       <button onClick={submitAssignment} className="btn btn-primary mt-4">
//       {/* <button onClick={() => console.log('Submitted Answers:', answers)} className="btn btn-primary mt-4"> */}
//         <Link to='/results'>
//           Submit Assignment
//         </Link>
//       </button>
//     </div>
//   );
// };

// export default TakeAssignment;
