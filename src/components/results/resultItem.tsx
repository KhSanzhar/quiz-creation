import React, { useEffect, useState } from 'react';
import { Question } from '../../models';  
import { useParams } from 'react-router-dom';

interface ResultItemProps {
    question: Question;
    userAnswer: number[]; 
    isCorrect: boolean;
}

const ResultItem: React.FC<ResultItemProps> = ({question, userAnswer, isCorrect}) => {
    
    // const { resultId } = useParams<{ resultId: string }>();
    // const [results, setResult] = useState<any>(null);

    // useEffect(() => {
    //     const allResults = JSON.parse(localStorage.getItem('results') || '[]');
    //     const specificResult = allResults.find((r: any) => r.assignmentId === parseInt(resultId));
    //     setResult(specificResult);
    // }, [resultId]);

    
    return (
        <div className="p-4 border rounded mb-2">
            <p className="font-bold">{question.description}</p>
            {question.options.map((option, index) => (
                <div key={index} style={{ 
                    color: question.correctOption.includes(index) ? 'green' : (userAnswer.includes(index) ? 'red' : 'black'),
                    fontWeight: question.correctOption.includes(index) ? 'bold' : 'normal'
                }}>
                    {option}
                </div>
            ))}
            {!isCorrect && (
                <p style={{ color: 'red' }}>Your answer: {userAnswer.map(idx => question.options[idx]).join(', ')} was incorrect.</p>
            )}
        </div>
    );
};

export default ResultItem;
