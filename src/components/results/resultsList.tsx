import React, { useEffect, useState } from 'react';
import ResultItem from './resultItem';

const ResultsList: React.FC = () => {
    const [results, setResults] = useState<any[]>([]); 

    useEffect(() => {
        const loadedResults = JSON.parse(localStorage.getItem('results') || '[]');
        const completedResults = loadedResults.filter((result: any) => result.completed);
        setResults(completedResults);
    }, []);

    return (
        <div className="container mx-auto mt-20">
            {results.length > 0 ? results.map((result, index) => (
                <div key={index} className="mb-6">
                    <h2 className="text-xl font-bold mb-2">Assignment: {result.title} - Score: {result.score} / {result.total}</h2>
                    {result.detailedResults.map((detail: any, idx: number) => (
                        <ResultItem
                            key={idx}
                            question={detail.question}
                            userAnswer={detail.userAnswer}
                            isCorrect={detail.isCorrect}
                        />
                    ))}
                </div>
            )) : <p>No completed assignments found.</p>}
        </div>
    );
};

export default ResultsList;
