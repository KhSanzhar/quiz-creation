import React, { useEffect, useState } from 'react';
import { Question } from '../../models';


interface Props {
  question: Question | null;
  addOrEditQuestion: (question: Question) => void;
}

const QuestionForm: React.FC<Props> = ({ question, addOrEditQuestion }) => {
  const [type, setType] = useState<'single' | 'multiple' | 'text'>('single');
  const [description, setDescription] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['']);
  const [points, setPoints] = useState<number>(0);
  const [correctOptions, setCorrectOptions] = useState<number[]>([]);

  useEffect(() => {
    if (question) {
      setType(question.type);
      setDescription(question.description);
      setOptions(question.options);
      setPoints(question.points);
      setCorrectOptions(question.correctOption);
    } else {
      resetForm();
    }
  }, [question]);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value as 'single' | 'multiple' | 'text');
    setOptions(['']);
    setCorrectOptions([]);
  };

  const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  const handleOptionChange = (index: number, text: string) => {
    const newOptions = [...options];
    newOptions[index] = text;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    const newCorrectOptions = correctOptions.filter(opt => opt !== index).map(opt => opt > index ? opt - 1: opt);
    setOptions(newOptions);
    setCorrectOptions(newCorrectOptions);
  };


  const toggleCorrectOption = (index: number) => {
    if (type === 'single') {
      setCorrectOptions([index]);
    } else {
      const currentIndex = correctOptions.indexOf(index);
      if (currentIndex === -1) {
        setCorrectOptions([...correctOptions, index]);
      } else {
        setCorrectOptions(correctOptions.filter(opt => opt !== index));
      }
    }
  };
  // const toggleCorrectOption = (index: number) => {
  //   const currentIndex = correctOptions.indexOf(index);
  //   if (currentIndex === -1) {
  //     if (type === 'single') {
  //       setCorrectOptions([index]);
  //     } else {
  //       setCorrectOptions([...correctOptions, index]);
  //     }
  //   } else if (type !== 'single') {
  //     setCorrectOptions(correctOptions.filter((optionIndex) => optionIndex !== index));
  //   }
  // };

  const handlePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPoints(Number(event.target.value));
  };

  const handleSubmit = () => {
    if (description && (options.length > 0 || type === 'text') && points > 0) {
      const newQuestion: Question = {
        id: question ? question.id : Date.now(),
        type,
        description,
        options,
        points,
        correctOption: correctOptions
      };
      addOrEditQuestion(newQuestion);
      resetForm();
    } else {
      alert('Please fill in all fields and select at least one correct answer.');
    }
  };

  const resetForm = () => {
    setDescription('');
    setOptions(['']);
    setPoints(0);
    setCorrectOptions([]);
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow max-w-4xl mx-auto my-4">
      <div className="mb-4">
        <label className="text-gray-700 font-semibold">Question Type</label>
        <select
          value={type}
          onChange={handleTypeChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="single">Single Choice</option>
          <option value="multiple">Multiple Choice</option>
          <option value="text">Text Answer</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="text-gray-700 font-semibold">Question Description</label>
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          // rows={3}
          placeholder="Enter question description"
        />
      </div>
      {type !== 'text' && options.map((option, index) => (
        <div key={index} className="flex items-center mb-2 space-x-2">
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Option text"
          />
          <input
            type="checkbox"
            checked={correctOptions.includes(index)}
            onChange={() => toggleCorrectOption(index)}
            className="rounded text-indigo-500"
          />
          <button onClick={() => removeOption(index)} className='text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline'>
            Delete
          </button>
        </div>
      ))}
      {type !== 'text' && (
        <button onClick={addOption} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Add Option
        </button>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Points</label>
        <input
          type="number"
          value={points}
          onChange={handlePointsChange}
          className="input input-bordered w-full"
          placeholder="Points for the question"
        />
      </div>
      <button onClick={handleSubmit} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit Question</button>
    </div>
  );
};

export default QuestionForm;
