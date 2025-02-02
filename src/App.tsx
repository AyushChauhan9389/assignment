import { useState } from 'react';
import Quiz from './components/Quiz';

export default function App() {
  const [isStarted, setIsStarted] = useState(false);

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-xl shadow-2xl p-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">🎯 Quiz Challenge</h1>
          <p className="text-gray-600 mb-8">
            Test your knowledge and earn points! Get bonus points for answer streaks!
          </p>
          <ul className="text-left text-gray-600 mb-8 space-y-2">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Answer questions correctly
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Maintain streaks for bonus points
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span> Challenge yourself to get the highest score
            </li>
          </ul>
          <button
            onClick={() => setIsStarted(true)}
            className="w-full py-4 px-6 bg-blue-500 text-white rounded-lg text-lg font-semibold hover:bg-blue-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 py-8">
      <Quiz />
    </div>
  );
}
