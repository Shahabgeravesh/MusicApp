import { PracticeQuestion } from '../components/PracticeActivity';

export const practiceData: { [key: string]: PracticeQuestion[]} = {
  basics: 
  [
    {
      type: 'note_identification',
      question: 'Tap the note that is on the first line of the treble clef',
      options: ['C', 'D', 'E', 'F'],
      correctAnswer: 'E',
      hint: 'Remember: Every Good Boy Does Fine (E, G, B, D, F)'
    },
    {
      type: 'note_identification',
      question: 'Tap the note that is in the first space of the treble clef',
      options: ['C', 'D', 'E', 'F'],
      correctAnswer: 'F',
      hint: 'Remember: FACE spells the spaces (F, A, C, E)'
    },
    {
      type: 'note_identification',
      question: 'Tap the note that is on the second line of the treble clef',
      options: ['D', 'E', 'F', 'G'],
      correctAnswer: 'G',
      hint: 'Every Good Boy Does Fine - G is on the second line'
    },
    {
      type: 'note_identification',
      question: 'Tap the note that is in the second space of the treble clef',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'A',
      hint: 'FACE - A is in the second space'
    },
  ],
  notes: 
  [
    {
      type: 'note_identification',
      question: 'Tap the notes in order: C, D, E',
      options: ['C D E', 'D E F', 'E F G', 'A'],
      correctAnswer: 'C D E',
      hint: 'Follow the musical alphabet: C comes before D, D comes before E'
    },
    {
      type: 'note_identification',
      question: 'Tap the notes in order: F, G, A',
      options: ['E F G', 'F G A', 'G A B', 'C'],
      correctAnswer: 'F G A',
      hint: 'The musical alphabet goes: F, G, A, B, C, D, E'
    },
    {
      type: 'note_identification',
      question: 'Tap the note that comes after B in the musical alphabet',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 'C',
      hint: 'The musical alphabet repeats: A, B, C, D, E, F, G, then back to A'
    },
    {
      type: 'note_identification',
      question: 'Tap the note that comes before A in the musical alphabet',
      options: ['G', 'H', 'I', 'J'],
      correctAnswer: 'G',
      hint: 'Going backwards: A, G, F, E, D, C, B'
    },
  ],
  rhythm: 
  [
    {
      type: 'rhythm_tapping',
      question: 'Tap the rhythm: 1-2-3-4(quarter notes)',
      options: ['♩♩♩♩', '♩♫♩♫', '♩♩♫', '♫♫♩♩'],
      correctAnswer: '♩♩♩♩',
      hint: 'Each quarter note gets one beat in 4/4'
    },
    {
      type: 'rhythm_tapping',
      question: 'Tap the rhythm: 1-2alf notes)',
      options: ['♩♩,♩♫, ♩', '♩♩♩♩'],
      correctAnswer: '♩♩',
      hint: 'Each half note gets two beats in 4/4'
    },
    {
      type: 'rhythm_tapping',
      question: 'Tap the rhythm: 1-2-3 (eighth notes)',
      options: ['♫♫♫♫', '♩♩♩♩', '♩♫♩♫', '♫♩♫♩'],
      correctAnswer: '♫♫♫♫',
      hint: 'Each eighth note gets half a beat in 4/4'
    },
    {
      type: 'rhythm_tapping',
      question: 'Tap the rhythm: 1-4d)',
      options: ['♩♫♫♩', '♩♩♩♩', '♫♫♫♫', '♩♩♫♫'],
      correctAnswer: '♩♫♫♩',
      hint: 'Quarter note (1 beat) + two eighth notes (1 beat total) + quarter note (1 beat)'
    },
  ],
  scales: 
  [
    {
      type: 'scale_recognition',
      question: 'Tap the C major scale notes in order',
      options: ['C D E F G A B C', 'A B C D E F G A', 'G A B C D E F G', 'F G A B C D E F'],
      correctAnswer: 'C D E F G A B C',
      hint: 'C major scale: C, D, E, F, G, A, B, C'
    },
    {
      type: 'scale_recognition',
      question: 'Tap the G major scale notes in order',
      options: ['G A B C D E F# G', 'A B C# D E F# G# A', 'C D E F G A B C', 'D E F# G A B C# D'],
      correctAnswer: 'G A B C D E F# G',
      hint: 'G major scale: G, A, B, C, D, E, F#, G'
    },
    {
      type: 'scale_recognition',
      question: 'Tap the A minor scale notes in order',
      options: ['A B C D E F G A', 'C D E F G A B C', 'G A B C D E F G', 'F G A B C D E F'],
      correctAnswer: 'A B C D E F G A',
      hint: 'A natural minor scale: A, B, C, D, E, F, G, A'
    },
    {
      type: 'scale_recognition',
      question: 'Tap the pattern: whole, whole, half, whole, whole, whole, half',
      options: ['W W H W W W H', 'W H W W H W W', 'H W W H W W W', 'W WW H W W H'],
      correctAnswer: 'W W H W W W H',
      hint: 'This is the pattern for a major scale'
    },
  ],
  chords: 
  [
    {
      type: 'chord_building',
      question: 'Tap the notes for a C major triad',
      options: ['C E G', 'C D E', 'C F G', 'F'],
      correctAnswer: 'C E G',
      hint: 'A major triad: root (C) + major third (E) + perfect fifth (G)'
    },
    {
      type: 'chord_building',
      question: 'Tap the notes for a G major triad',
      options: ['G B D', 'G A B', 'G C D', 'C'],
      correctAnswer: 'G B D',
      hint: 'A major triad: root (G) + major third (B) + perfect fifth (D)'
    },
    {
      type: 'chord_building',
      question: 'Tap the notes for an A minor triad',
      options: ['A C E', 'A B C', 'A D E', 'D'],
      correctAnswer: 'A C E',
      hint: 'A minor triad: root (A) + minor third (C) + perfect fifth (E)'
    },
    {
      type: 'chord_building',
      question: 'Tap the notes for an F major triad',
      options: ['F A C', 'F G A', 'F B C', 'B'],
      correctAnswer: 'F A C',
      hint: 'A major triad: root (F) + major third (A) + perfect fifth (C)'
    },
  ],
}; 