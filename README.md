# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


=> Sentence Construction Web Application

=> Overview
The Sentence Construction app is an interactive learning tool where users complete sentences by selecting words for blank spaces. Users are timed as they work through multiple questions, and their performance is scored at the end.

==> Core Components

=> Welcome Component

> Displays instructions to users before starting the challenge

> Instructions include:

 Fill all blanks to proceed to the next question.
 Click on filled blanks to unselect words.
 Score calculation at the end.

> Features a "Start Challenge" button that initiates the game

=> Question Component

Displays a sentence with blank spaces to fill.
Shows available word options for users to select.
Uses a 30-second timer for each question.
Tracks selected words in blanks.
Automatically submits when time runs out.
Handles user selections and deselections.

=> Results Component

Displays the completed sentences with user's answers.
Shows the final score based on correct answers.

=> Technical Structure

> State Management

Uses React hooks (useState, useEffect, useRef) for state management.
Main states include:

  selectedWords: Tracks words placed in blanks.
  availableOptions: Available words to choose from.
  timeLeft: Timer countdown.
  stage: Controls app flow ('welcome', 'playing', 'results').
  currentQuestionIndex: Tracks current question position.
  userAnswers: Stores all user responses.
  score: Calculates user performance.

=> Question Processing

Questions stored in questionData.jsx.
Questions include:

  Unique questionId
  Question text with blanks marked by underscores
  Answer options
  Correct answers for scoring


Questions are displayed by splitting text at underscores and inserting selected words.

=> Timer Logic

30-second countdown per question.
Automatically submits responses when time expires.
Clears interval when navigating away from question.

=> User Interaction

Click to select words and place in blanks.
Click filled blanks to unselect words.
Automatic progression to next question when all blanks are filled.

=> Data Structure
The application uses a JSON structure for questions with:

Test identification.
Multiple questions with:

  Question text containing blanks (marked by underscores).
  Multiple choice options.
  Correct answers for evaluation.