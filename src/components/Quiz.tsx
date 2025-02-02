import { useState, useEffect } from 'react';

const SAMPLE_QUIZ_DATA = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct_answer: "Paris"
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correct_answer: "Mars"
  },
  {
    id: 3,
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correct_answer: "4"
  },
  {
    id: 4,
    question: "Which language is React built with?",
    options: ["Python", "Java", "JavaScript", "C++"],
    correct_answer: "JavaScript"
  },
  {
    id: 5,
    question: "What year was the first iPhone released?",
    options: ["2005", "2006", "2007", "2008"],
    correct_answer: "2007"
  }
];

interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
}

interface QuizState {
  questions: Question[];
  currentQuestion: number;
  score: number;
  showResults: boolean;
  selectedAnswer: string | null;
  isLoading: boolean;
  error: string | null;
  streak: number;
}

export default function Quiz() {
  const [state, setState] = useState<QuizState>({
    questions: [],
    currentQuestion: 0,
    score: 0,
    showResults: false,
    selectedAnswer: null,
    isLoading: true,
    error: null,
    streak: 0
  });

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      const response = await fetch('https://api.jsonserve.com/Uw5CrX');
      if (!response.ok) {
        throw new Error('API request failed');
      }
      const data = await response.json();
      setState(prev => ({ ...prev, questions: data, isLoading: false }));
    } catch (error) {
      console.log('Using sample quiz data due to API error');
      setState(prev => ({ 
        ...prev, 
        questions: SAMPLE_QUIZ_DATA, 
        isLoading: false 
      }));
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setState(prev => ({ ...prev, selectedAnswer: answer }));
  };

  const handleNextQuestion = () => {
    if (state.selectedAnswer === null) return;

    const correct = state.selectedAnswer === state.questions[state.currentQuestion].correct_answer;
    const newStreak = correct ? state.streak + 1 : 0;
    const streakBonus = newStreak >= 3 ? 5 : 0;
    
    setState(prev => ({
      ...prev,
      score: prev.score + (correct ? 10 + streakBonus : 0),
      currentQuestion: prev.currentQuestion + 1,
      selectedAnswer: null,
      streak: newStreak,
      showResults: prev.currentQuestion === prev.questions.length - 1
    }));
  };

  const restartQuiz = () => {
    setState({
      ...state,
      currentQuestion: 0,
      score: 0,
      showResults: false,
      selectedAnswer: null,
      streak: 0
    });
  };

  if (state.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{state.error}</div>
      </div>
    );
  }

  if (state.showResults) {
    return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg animate-bounce-in">
        <h2 className="text-3xl font-bold text-center mb-6">Quiz Complete! 🎉</h2>
        <div className="text-center mb-6">
          <p className="text-2xl font-semibold mb-2">Your Score: {state.score}</p>
          <p className="text-gray-600">
            {state.score >= 80 ? '🏆 Outstanding!' :
             state.score >= 60 ? '🌟 Great job!' :
             state.score >= 40 ? '👍 Good effort!' : '🎯 Keep practicing!'}
          </p>
        </div>
        <button
          onClick={restartQuiz}
          className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentQuestion];

  return (
    <div className="max-w-lg mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold">
            Question {state.currentQuestion + 1}/{state.questions.length}
          </span>
          <span className="text-lg font-semibold">
            Score: {state.score}
          </span>
        </div>
        {state.streak >= 3 && (
          <div className="text-center text-green-500 font-semibold mb-2">
            🔥 {state.streak} Streak! +5 bonus points on next correct answer!
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 animate-bounce-in">
        <h2 className="text-xl font-semibold mb-4">
          {currentQuestion.question}
          {state.streak > 0 && (
            <span className="ml-2 text-sm text-green-500">
              🔥 {state.streak} streak
            </span>
          )}
        </h2>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`quiz-option ${
                state.selectedAnswer === option
                  ? 'quiz-option-selected'
                  : 'quiz-option-unselected'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleNextQuestion}
        disabled={state.selectedAnswer === null}
        className={`w-full py-3 px-6 rounded-lg transition-colors ${
          state.selectedAnswer === null
            ? 'bg-gray-300 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
      >
        {state.currentQuestion === state.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
      </button>
    </div>
  );
}
