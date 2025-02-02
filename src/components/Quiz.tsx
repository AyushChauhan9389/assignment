import { useState, useEffect } from 'react';

interface Option {
  id: number;
  description: string;
  is_correct: boolean;
  photo_url?: string | null;
}

interface Question {
  id: number;
  description: string;
  options: Option[];
  detailed_solution: string;
  topic: string;
}

interface QuizData {
  id: number;
  title: string;
  description: string;
  topic: string;
  duration: number;
  questions: Question[];
  questions_count: number;
}

interface QuizState {
  quizData: QuizData | null;
  questions: Question[];
  currentQuestion: number;
  score: number;
  showResults: boolean;
  selectedAnswer: string | null;
  isLoading: boolean;
  error: string | null;
  streak: number;
  showSolution: boolean;
}

const mockData = {
  "id": 60,
  "title": "Genetics and Evolution",
  "description": "",
  "topic": "The Molecular Basis of Inheritance",
  "duration": 15,
  "questions_count": 10,
  "questions": [
    {
      "id": 3342,
      "description": "If the base sequence in DNA is 5' AAAT 3' then the base sequence in mRNA is :",
      "topic": "Molecular Basis Of Inheritance",
      "detailed_solution": "To determine the mRNA sequence from the given DNA sequence, we follow the principles of transcription, where RNA is synthesized complementary to the DNA template strand. Here's the step-by-step process:\r\n\r\nGiven DNA Sequence:\r\n5\r\n′\r\n \r\n𝐴\r\n𝐴\r\n𝐴\r\n𝑇\r\n \r\n3\r\n′\r\n5 \r\n′\r\n AAAT3 \r\n′\r\n \r\nTranscription Rules:\r\nComplementary Base Pairing:\r\n\r\nAdenine (A) in DNA pairs with Uracil (U) in RNA.\r\nThymine (T) in DNA pairs with Adenine (A) in RNA.\r\nCytosine (C) pairs with Guanine (G), and vice versa.\r\nRNA is synthesized in the 5' to 3' direction, complementary to the 3' to 5' DNA template strand.\r\n\r\nDNA Template Strand:\r\nTo determine the template strand, we first identify the complementary strand of the given DNA sequence. The template strand is:\r\n\r\n3\r\n′\r\n \r\n𝑇\r\n𝑇\r\n𝑇\r\n𝐴\r\n \r\n5\r\n′\r\n3 \r\n′\r\n TTTA5 \r\n′\r\n \r\nmRNA Sequence:\r\nThe mRNA is transcribed from the template strand using complementary base pairing:\r\n\r\n5\r\n′\r\n \r\n𝐴\r\n𝐴\r\n𝐴\r\n𝑈\r\n \r\n3\r\n′\r\n5 \r\n′\r\n AAAU3 \r\n′\r\n \r\nFinal Answer:\r\nThe base sequence in mRNA is: 5' AAAU 3'.",
      "options": [
        {
          "id": 13379,
          "description": "5'UUUU3'",
          "is_correct": false
        },
        {
          "id": 13380,
          "description": "3'UUUU5'",
          "is_correct": false
        },
        {
          "id": 13381,
          "description": "5'AAAU3'",
          "is_correct": true
        },
        {
          "id": 13382,
          "description": "3'AAAU5'",
          "is_correct": false
        }
      ]
    },
    {
      "id": 3315,
      "description": "Avery, MacLeod and Mc Carty used the S(virulent) and R (avirulent) strains of streptococcus pneumoniae. They isolated and purified protein, DNA, RNA from the bacteria and treated them with related enzymes. They concluded that :",
      "topic": "Molecular Basis Of Inheritance",
      "detailed_solution": "**Explanation:**\n\n* Transformation is a process by which genetic material is transferred from one organism to another.\n* In the Griffith's experiment, heat-killed S (virulent) strain of Streptococcus pneumoniae transformed the R (avirulent) strain into the S strain.\n* Avery, MacLeod, and McCarty conducted experiments to identify the transforming agent.\n* They treated the heated S strain bacteria with enzymes that break down proteins, DNA, and RNA.\n* Only the enzyme that broke down DNA inactivated the transforming agent.\n* This experiment demonstrated that DNA was the transforming agent, responsible for transferring the genetic information that allowed the R strain to become virulent.",
      "options": [
        {
          "id": 13271,
          "description": "DNA was transforming agent",
          "is_correct": true
        },
        {
          "id": 13272,
          "description": "RNA was transforming agent",
          "is_correct": false
        },
        {
          "id": 13273,
          "description": "Protein was transforming agent",
          "is_correct": false
        },
        {
          "id": 13274,
          "description": "All are correct",
          "is_correct": false
        }
      ]
    },
    {
      "id": 3381,
      "description": "Identify the characteristic which is not applicable to the genetic code:",
      "topic": "Molecular Basis Of Inheritance",
      "detailed_solution": "**The answer is correct because:**\n\n* The genetic code is characterized by the following properties:\n* It is **specific**, meaning that each codon codes for a specific amino acid.\n* It is **universal**, meaning that the same codon codes for the same amino acid in all organisms.\n* It is **non-overlapping**, meaning that each nucleotide is used only once in a codon.\n* It is **degenerate**, meaning that most amino acids are coded for by more than one codon.\n\n**Non-polarity** is not a characteristic of the genetic code. Non-polarity refers to the chemical nature of certain amino acids, not to the genetic code itself.",
      "options": [
        {
          "id": 13535,
          "description": "Non-Polar",
          "is_correct": true
        },
        {
          "id": 13536,
          "description": "Non-Overlapping",
          "is_correct": false
        },
        {
          "id": 13537,
          "description": "Commaless",
          "is_correct": false
        },
        {
          "id": 13538,
          "description": "Universal",
          "is_correct": false
        }
      ]
    }
  ]
};

export default function Quiz() {
  const [state, setState] = useState<QuizState>({
    quizData: null,
    questions: [],
    currentQuestion: 0,
    score: 0,
    showResults: false,
    selectedAnswer: null,
    isLoading: true,
    error: null,
    streak: 0,
    showSolution: false
  });

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      // Using the provided quiz data
      setState(prev => ({ 
        ...prev,
        quizData: mockData,
        questions: mockData.questions,
        isLoading: false 
      }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        error: 'Failed to load quiz questions', 
        isLoading: false 
      }));
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setState(prev => ({ ...prev, selectedAnswer: answer }));
  };

  const handleNextQuestion = () => {
    if (state.selectedAnswer === null) return;

    const currentQuestion = state.questions[state.currentQuestion];
    const selectedOption = currentQuestion.options.find(opt => opt.description === state.selectedAnswer);
    const correct = selectedOption?.is_correct || false;
    const newStreak = correct ? state.streak + 1 : 0;
    const streakBonus = newStreak >= 3 ? 5 : 0;
    
    setState(prev => ({
      ...prev,
      score: prev.score + (correct ? 10 + streakBonus : 0),
      currentQuestion: prev.currentQuestion + 1,
      selectedAnswer: null,
      streak: newStreak,
      showResults: prev.currentQuestion === prev.questions.length - 1,
      showSolution: false
    }));
  };

  const toggleSolution = () => {
    setState(prev => ({ ...prev, showSolution: !prev.showSolution }));
  };

  const restartQuiz = () => {
    setState({
      ...state,
      currentQuestion: 0,
      score: 0,
      showResults: false,
      selectedAnswer: null,
      streak: 0,
      showSolution: false
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

  if (!state.quizData || state.questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">No quiz questions available</div>
      </div>
    );
  }

  if (state.showResults) {
    return (
      <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg animate-bounce-in">
        <h2 className="text-3xl font-bold text-center mb-6">Quiz Complete! 🎉</h2>
        <div className="text-center mb-6">
          <h3 className="text-xl font-semibold mb-2">{state.quizData.title}</h3>
          <p className="text-gray-600 mb-4">Topic: {state.quizData.topic}</p>
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
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center mb-2">{state.quizData.title}</h2>
        <p className="text-gray-600 text-center mb-4">Topic: {state.quizData.topic}</p>
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
        <h3 className="text-xl font-semibold mb-4">
          {currentQuestion.description}
          {state.streak > 0 && (
            <span className="ml-2 text-sm text-green-500">
              🔥 {state.streak} streak
            </span>
          )}
        </h3>
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleAnswerSelect(option.description)}
              className={`quiz-option ${
                state.selectedAnswer === option.description
                  ? 'quiz-option-selected'
                  : 'quiz-option-unselected'
              }`}
            >
              {option.description}
            </button>
          ))}
        </div>

        {state.selectedAnswer && (
          <div className="mt-4">
            <button
              onClick={toggleSolution}
              className="text-blue-500 hover:text-blue-600 underline"
            >
              {state.showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
            {state.showSolution && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="prose" dangerouslySetInnerHTML={{ __html: currentQuestion.detailed_solution }} />
              </div>
            )}
          </div>
        )}
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
