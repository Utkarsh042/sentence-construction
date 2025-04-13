import { useState, useEffect, useRef } from 'react';

function Question({ question, onSubmit, questionNumber, totalQuestions, onQuit }) {
  const [selectedWords, setSelectedWords] = useState(Array(4).fill(null));
  const [availableOptions, setAvailableOptions] = useState([...question.options]);
  const [timeLeft, setTimeLeft] = useState(30);
  const timerRef = useRef(null);
  
  const questionParts = question.question.split('_____________');
  
  useEffect(() => {
    setSelectedWords(Array(4).fill(null));
    setAvailableOptions([...question.options]);
    setTimeLeft(30);
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          const filledAnswer = selectedWords.map(word => word || "");
          onSubmit(filledAnswer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [question, onSubmit]);
  
  const handleWordSelect = (word) => {
    const newSelectedWords = [...selectedWords];
    const firstEmptyIndex = newSelectedWords.findIndex(w => w === null);
    
    if (firstEmptyIndex !== -1) {
      newSelectedWords[firstEmptyIndex] = word;
      setSelectedWords(newSelectedWords);
      setAvailableOptions(availableOptions.filter(option => option !== word));
    }
  };
  
  const handleBlankClick = (index) => {
    if (selectedWords[index] !== null) {
      setAvailableOptions([...availableOptions, selectedWords[index]]);
      
      const newSelectedWords = [...selectedWords];
      newSelectedWords[index] = null;
      setSelectedWords(newSelectedWords);
    }
  };
  
  const handleNext = () => {
    onSubmit(selectedWords);
  };
  
  const allBlanksAreFilled = selectedWords.every(word => word !== null);
  
  return (
    <div className="bg-gray-50 flex flex-col items-center pt-10 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Sentence Construction Challenge</h1>
      
      {/* Timer */}
      <div className="flex items-center mb-10">
        <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center">
          <span className={`text-lg font-semibold ${timeLeft <= 10 ? 'text-red-600' : 'text-blue-800'}`}>
            {timeLeft}
          </span>
        </div>
        <span className="ml-2 text-gray-600">seconds left</span>
      </div>
      
      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl mb-8">
        <p className="text-lg">
          {questionParts.map((part, index) => (
            <span key={index}>
              {part}
              {index < questionParts.length - 1 && (
                <span
                  onClick={() => handleBlankClick(index)}
                  className="inline-block bg-gray-200 rounded px-4 py-1 mx-1 min-w-32 text-center cursor-pointer"
                >
                  {selectedWords[index] || ''}
                </span>
              )}
            </span>
          ))}
        </p>
      </div>
      
      {/* Word Options */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {availableOptions.map((option, index) => (
          <button
            key={index}
            onClick={() => handleWordSelect(option)}
            className="border border-blue-500 text-blue-600 rounded-md px-6 py-2 hover:bg-blue-50 transition-colors"
          >
            {option}
          </button>
        ))}
      </div>
      
      {/* Navigation */}
      <div className="w-full max-w-3xl flex justify-between">
        <button 
          onClick={onQuit}
          className="border border-red-500 text-red-600 rounded px-8 py-2 hover:bg-red-50 transition-colors"
        >
          Quit
        </button>
        
        <div className="text-center text-lg font-medium">
          Question {questionNumber} of {totalQuestions}
        </div>
        
        <button
          onClick={handleNext}
          disabled={!allBlanksAreFilled}
          className={`rounded px-8 py-2 ${
            allBlanksAreFilled
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Question;