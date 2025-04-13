import { useState, useEffect } from 'react';
import Welcome from './components/Welcome';
import Question from './components/Question';
import Results from './components/Results';
import { jsonData } from './data/questionData';

function App() {
  const [stage, setStage] = useState('welcome'); // 'welcome', 'playing', 'results'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    
    const questionsData = jsonData.data.questions;
    setQuestions(questionsData);
  }, []);

  const startGame = () => {
    setStage('playing');
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setScore(0);
  };

  const handleAnswerSubmit = (answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = answer;
    setUserAnswers(updatedAnswers);
    
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = JSON.stringify(answer) === JSON.stringify(currentQuestion.correctAnswer);
    
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStage('results');
    }
  };

  const navigateToHome = () => {
    setStage('welcome');
  };

  const quitGame = () => {
    if (confirm('Are you sure you want to quit? Your progress will be lost.')) {
      setStage('welcome');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
        {stage === 'welcome' && (
          <Welcome onStart={startGame} />
        )}
        
        {stage === 'playing' && questions.length > 0 && (
          <Question 
            question={questions[currentQuestionIndex]} 
            onSubmit={handleAnswerSubmit}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onQuit={quitGame}
          />
        )}
        
        {stage === 'results' && (
          <Results 
            questions={questions}
            userAnswers={userAnswers}
            score={score}
            onPlayAgain={startGame}
            onHome={navigateToHome}
          />
        )}
      </div>
    </div>
  );
}

export default App;