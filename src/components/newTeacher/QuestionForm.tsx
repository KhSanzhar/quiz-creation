import React, { useState } from 'react';

interface Question {
    type: 'single' | 'multiple' | 'text';
    description: string;
    options: string[];
    points: number;
    correctOption: number[];
  }

interface Props {
  addQuestion: (question: Question) => void;
}

const QuestionForm: React.FC<Props> = ({ addQuestion }) => {
  const [type, setType] = useState<'single' | 'multiple' | 'text'>('single');
  const [description, setDescription] = useState<string>('');
  const [options, setOptions] = useState<string[]>(['']);
  const [points, setPoints] = useState<number>(0);
  const [correctOptions, setCorrectOptions] = useState<number[]>([]);

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

  const toggleCorrectOption = (index: number) => {
    if (type === 'single') {
      setCorrectOptions([index]);
    } else if (type === 'multiple') {
      const newCorrectOptions = [...correctOptions];
      const position = newCorrectOptions.indexOf(index);
      if (position > -1) {
        newCorrectOptions.splice(position, 1);
      } else {
        newCorrectOptions.push(index);
      }
      setCorrectOptions(newCorrectOptions);
    }
  };

  const handlePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPoints(Number(event.target.value));
  };

  const handleSubmit = () => {
    if (description && (options.length > 0 || type === 'text') && points > 0) {
      addQuestion({ type, description, options, points, correctOption: correctOptions });
      setDescription('');
      setOptions(['']);
      setPoints(0);
      setCorrectOptions([]);
    } else {
      alert('Please fill in all fields and select a correct answer.');
    }
  };

  return (
    <div className="p-4 border rounded">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Question Type</label>
        <select
          value={type}
          onChange={handleTypeChange}
          className="input input-bordered w-full"
        >
          <option value="single">Single Choice</option>
          <option value="multiple">Multiple Choice</option>
          <option value="text">Text Answer</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Question Description</label>
        <input
          type="text"
          value={description}
          onChange={handleDescriptionChange}
          className="input input-bordered w-full"
          placeholder="Enter question description"
        />
      </div>
      {type !== 'text' && options.map((option, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="input input-bordered flex-grow"
            placeholder="Option text"
          />
          <input
            type="checkbox"
            checked={correctOptions.includes(index)}
            onChange={() => toggleCorrectOption(index)}
            className="checkbox checkbox-primary ml-2"
          />
        </div>
      ))}
      {type !== 'text' && (
        <button onClick={addOption} className="btn btn-secondary">Add Option</button>
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
      <button onClick={handleSubmit} className="btn btn-primary">Submit Question</button>
    </div>
  );
};

export default QuestionForm;
