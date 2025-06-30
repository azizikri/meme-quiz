# MemeQuiz - Tebak Meme Seru! 🎉

A fun and interactive meme guessing game built with React, TypeScript, Vite, and Ant Design.

## Features

- 🎮 Interactive quiz interface with multiple-choice questions
- 🖼️ Image-based meme questions
- 📊 Score tracking and results display
- 📱 Responsive design that works on all devices
- 🎨 Beautiful UI built with Ant Design components
- ⚡ Fast development with Vite

## Technologies Used

- **React** - UI library
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Ant Design** - Comprehensive UI component library
- **React Router DOM** - Client-side routing

## Project Structure

```
src/
├── components/
│   ├── Home.tsx      # Landing page component
│   ├── Quiz.tsx      # Main quiz component
│   └── Result.tsx    # Results display component
├── types.ts          # TypeScript type definitions
├── App.tsx           # Main application component
├── App.css           # Application styles
└── main.tsx          # Application entry point

public/
├── quizData.json     # Quiz questions data
└── memes/            # Meme images directory
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository or navigate to the project directory
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How to Play

1. **Home Page**: Enter your name and select a difficulty level
2. **Quiz**: Answer multiple-choice questions about popular memes
3. **Results**: View your final score and choose to play again or return home

## Customization

### Adding New Questions

Edit the `public/quizData.json` file to add new questions:

```json
{
  "id": 6,
  "type": "image",
  "mediaUrl": "/memes/your-meme.jpg",
  "question": "What is this meme called?",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "correctAnswer": "Option 1"
}
```

### Adding Meme Images

Place your meme images in the `public/memes/` directory and reference them in the `quizData.json` file.

## Features Implemented

- ✅ React with TypeScript
- ✅ Ant Design UI components
- ✅ React Router for navigation
- ✅ Responsive design
- ✅ Quiz logic with scoring
- ✅ Interactive question interface
- ✅ Results page with replay functionality
- ✅ Form validation
- ✅ Loading states
- ✅ Error handling

## Component Architecture

### Home Component

- Uses Ant Design `Card`, `Form`, `Input`, `Select`, and `Button` components
- Form validation for user input
- Navigation to quiz with player data

### Quiz Component

- Fetches quiz data from JSON file
- Manages quiz state (current question, score, etc.)
- Interactive answer selection with visual feedback
- Progress tracking and navigation

### Result Component

- Displays final score with contextual messages
- Uses Ant Design `Result` component for polished UI
- Options to replay or return to home

## Browser Support

This application supports all modern browsers including:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.
