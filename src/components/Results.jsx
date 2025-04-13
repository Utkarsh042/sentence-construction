function Results({ questions, userAnswers, score, onPlayAgain, onHome }) {
    return (
      <div>
        <h2 className="text-2xl font-bold text-center mb-6">Your Results</h2>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-8 text-center">
          <p className="text-xl">
            Your score: <span className="font-bold text-blue-600">{score} out of {questions.length}</span>
          </p>
        </div>
        
        <div className="space-y-6 mb-8">
          <h3 className="text-xl font-semibold">Answer Review:</h3>
          
          {questions.map((question, index) => {
            const isCorrect = JSON.stringify(userAnswers[index]) === JSON.stringify(question.correctAnswer);
            
            return (
              <div 
                key={index} 
                className={`p-4 rounded-lg ${
                  isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}
              >
                <div className="flex items-center mb-2">
                  <span className="font-semibold">Question {index + 1}:</span>
                  <span 
                    className={`ml-2 px-2 py-1 text-sm rounded ${
                      isCorrect ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
                  >
                    {isCorrect ? 'Correct' : 'Incorrect'}
                  </span>
                </div>
                
                <p className="mb-4">{displayQuestion(question.question, userAnswers[index] || [])}</p>
                
                {!isCorrect && (
                  <div className="mt-2">
                    <p className="text-sm font-semibold">Correct answer:</p>
                    <p className="text-sm">{displayQuestion(question.question, question.correctAnswer)}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={onHome}
            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
          >
            Home
          </button>
          <button
            onClick={onPlayAgain}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-200"
          >
            Play Again
          </button>
        </div>
      </div>
    );
  }
  
  function displayQuestion(questionText, answers) {
    const parts = questionText.split('_____________');
    let result = '';
    
    parts.forEach((part, index) => {
      result += part;
      if (index < parts.length - 1) {
        result += answers[index] ? ` ${answers[index]} ` : ' _____ ';
      }
    });
    
    return result;
  }
  
  export default Results;