# Quiz Challenge App

A dynamic quiz application with gamification features built using React, TypeScript, and Tailwind CSS.

## Features

- 📝 Interactive quiz interface
- 🎯 Real-time score tracking
- 🔥 Streak bonus system
- 🎮 Gamification elements
- 🎨 Clean and intuitive design
- 📱 Responsive layout
- ✨ Animated transitions

## Tech Stack

- React with TypeScript
- Tailwind CSS for styling
- Vite for build tooling

## Gamification Elements

1. **Point System**
   - 10 points for each correct answer
   - Streak bonus: +5 points for maintaining a 3+ answer streak

2. **Achievement Messages**
   - Dynamic feedback based on performance
   - Streak notifications
   - End-of-quiz celebrations

3. **Visual Feedback**
   - Animated transitions
   - Interactive UI elements
   - Progress tracking

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   └── Quiz.tsx    # Main quiz component
├── App.tsx         # App root component
├── index.css       # Global styles
└── index.tsx       # Entry point
```

## Screenshots

This section will be populated with screenshots of the application in action.

## How It Works

1. Start Screen:
   - Welcome message
   - Game rules and instructions
   - Start button to begin the quiz

2. Quiz Interface:
   - Question counter
   - Score display
   - Streak indicator
   - Multiple choice options
   - Next question button

3. Results Screen:
   - Final score display
   - Performance feedback
   - Option to retry the quiz

## API Integration

The quiz questions are fetched from: `https://api.jsonserve.com/Uw5CrX`

The API returns questions in the following format:
```typescript
interface Question {
  id: number;
  question: string;
  options: string[];
  correct_answer: string;
}
