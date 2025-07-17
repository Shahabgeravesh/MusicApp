import { QuizQuestion } from '../components/Quiz';

export const quizData: { [key: string]: QuizQuestion[] } = {
  basics: [
    {
      question: 'How many lines are on a standard music staff?',
      options: ['3', '4', '5', '6'],
      correctAnswer: '5',
    },
    {
      question: 'Which clef is also called the G clef?',
      options: ['Treble', 'Bass', 'Alto', 'Tenor'],
      correctAnswer: 'Treble',
    },
  ],
  notes: [
    {
      question: 'Which note comes after E in the musical alphabet?',
      options: ['F', 'G', 'A', 'B'],
      correctAnswer: 'F',
    },
    {
      question: 'What are the notes in the A minor scale?',
      options: ['A B C D E F G', 'C D E F G A B', 'G A B C D E F', 'F G A B C D E'],
      correctAnswer: 'A B C D E F G',
    },
  ],
  rhythm: [
    {
      question: 'What is the time signature for common time?',
      options: ['2/4', '3/4', '4/4', '6/8'],
      correctAnswer: '4/4',
    },
    {
      question: 'How many beats does a half note get in 4/4?',
      options: ['1', '2', '3', '4'],
      correctAnswer: '2',
    },
  ],
  scales: [
    {
      question: 'What is the first note of the C major scale?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'C',
    },
    {
      question: 'Which scale has the pattern W H W W H W W?',
      options: ['Major', 'Minor', 'Pentatonic', 'Chromatic'],
      correctAnswer: 'Minor',
    },
  ],
  chords: [
    {
      question: 'How many notes are in a triad?',
      options: ['2', '3', '4', '5'],
      correctAnswer: '3',
    },
    {
      question: 'Which of these is a C major chord?',
      options: ['C E G', 'C D E', 'C F G', 'A B C'],
      correctAnswer: 'C E G',
    },
  ],
}; 