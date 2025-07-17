export default {
  home: {
    title: 'Welcome to Music Theory App!',
    subtitle: 'Learn the basics of music theory, scales, and rhythm.'
  },
  lessons: {
    0: {
      title: 'What is Music?',
      text: 'Music is the art of arranging sounds in time to produce a composition through the elements of melody, harmony, rhythm, and timbre. It is a universal language that expresses emotions and ideas.'
    },
    1: {
      title: 'The Staff',
      text: 'The staff is a set of five horizontal lines and four spaces that each represent a different musical pitch. Notes are placed on the lines and spaces to indicate their pitch.'
    },
    2: {
      title: 'Clefs',
      text: 'Clefs assign individual notes to certain lines or spaces. The most common are the Treble Clef (G Clef) and Bass Clef (F Clef).'
    },
    3: {
      title: 'Notes and Pitches',
      text: 'Notes are symbols that represent musical sounds. The main notes are C, D, E, F, G, A, and B. Their position on the staff tells you their pitch.'
    },
    4: {
      title: 'Rests',
      text: 'Rests are symbols that indicate silence in music. Each rest has a specific duration, just like notes.'
    },
    5: {
      title: 'Note Values',
      text: 'Notes can be whole, half, quarter, eighth, or sixteenth notes. Each type has a different duration.'
    },
    6: {
      title: 'Time Signatures',
      text: 'A time signature tells you how many beats are in each measure and what note value gets the beat. Common time is 4/4.'
    },
    7: {
      title: 'Major Scales',
      text: 'A major scale is a sequence of notes with a specific pattern of whole and half steps. The C major scale is C D E F G A B C.'
    },
    8: {
      title: 'Minor Scales',
      text: 'A minor scale has a different pattern of whole and half steps. The A minor scale is A B C D E F G A.'
    },
    9: {
      title: 'Key Signatures',
      text: 'Key signatures tell you which notes are sharp or flat throughout a piece. They are shown at the beginning of each staff.'
    },
    10: {
      title: 'Intervals',
      text: 'An interval is the distance between two notes. Common intervals are seconds, thirds, fourths, fifths, etc.'
    },
    11: {
      title: 'Chords',
      text: 'A chord is a group of notes played together. The most basic chord is the triad, made of three notes.'
    },
    12: {
      title: 'Basic Rhythm',
      text: 'Rhythm is the pattern of sounds and silences in music. Practice clapping or tapping different note values.'
    },
    13: {
      title: 'Putting It All Together',
      text: 'Now you know the basics of reading music, scales, rhythm, and chords. Keep practicing and exploring new music!'
    }
  },
  practice: {
    basics: [
      {
        question: 'What note is on the first line of the treble clef?',
        options: ['C', 'D', 'E', 'F']
      },
      {
        question: 'What note is in the first space of the treble clef?',
        options: ['C', 'D', 'E', 'F']
      },
      {
        question: 'How many lines are in a musical staff?',
        options: ['3', '4', '5', '6']
      }
    ],
    notes: [
      {
        question: 'What are the notes in the C major scale?',
        options: ['C D E F G A B', 'A B C D E F', 'G A B C D E F', 'F G A B C D E']
      },
      {
        question: 'Which note comes after G in the musical alphabet?',
        options: ['A', 'B', 'C', 'D']
      }
    ],
    rhythm: [
      {
        question: 'How many beats does a whole note get in 4/4?',
        options: ['1', '2', '3', '4']
      },
      {
        question: 'How many beats does a quarter note get in 4/4?',
        options: ['1', '2', '3', '4']
      }
    ],
    scales: [
      {
        question: 'What is the pattern of whole and half steps in a major scale?',
        options: ['W W H W W W H', 'W H W W H W W', 'H W W H W W W', 'W WW H W W H']
      },
      {
        question: 'What is the first note of the A minor scale?',
        options: ['A', 'B', 'C', 'D']
      }
    ],
    chords: [
      {
        question: 'What notes make up a C major triad?',
        options: ['C E G', 'C D E', 'C F G', 'A']
      },
      {
        question: 'How many notes are in a basic triad?',
        options: ['2', '3', '4', '5']
      }
    ]
  },
  quiz: {
    basics: [
      {
        question: 'How many lines are on a standard music staff?',
        options: ['3', '4', '5', '6']
      },
      {
        question: 'Which clef is also called the G clef?',
        options: ['Treble', 'Bass', 'Alto', 'Tenor']
      }
    ],
    notes: [
      {
        question: 'Which note comes after E in the musical alphabet?',
        options: ['F', 'G', 'A', 'B']
      },
      {
        question: 'What are the notes in the A minor scale?',
        options: ['A B C D E F G', 'C D E F G A B', 'G A B C D E F', 'F G A B C D E']
      }
    ],
    rhythm: [
      {
        question: 'What is the time signature for common time?',
        options: ['2/4', '3/4', '4/4', '6/8']
      },
      {
        question: 'How many beats does a half note get in 4/4?',
        options: ['1', '2', '3', '4']
      }
    ],
    scales: [
      {
        question: 'What is the first note of the C major scale?',
        options: ['A', 'B', 'C', 'D']
      },
      {
        question: 'Which scale has the pattern W H W W H W W?',
        options: ['Major', 'Minor', 'Pentatonic', 'Chromatic']
      }
    ],
    chords: [
      {
        question: 'How many notes are in a triad?',
        options: ['2', '3', '4', '5']
      },
      {
        question: 'Which of these is a C major chord?',
        options: ['C E G', 'C D E', 'C F G', 'A B C']
      }
    ]
  },
  // UI Elements
  practice_activity_title: 'Practice Activity',
  quiz_title: 'Quiz',
  question_progress: 'Question {{current}} of {{total}}',
  next_question_button: 'Next Question',
  next_button: 'Next',
  finish_button: 'Finish',
  correct_alert_title: 'Correct!',
  correct_alert_message: 'Great job!',
  incorrect_alert_title: 'Incorrect',
  incorrect_alert_message: 'The correct answer was',
  ok_button: 'OK',
  settings: {
    title: 'Settings',
    subtitle: 'Change language, theme, and more.'
  },
  language: 'Language',
  english: 'English',
  farsi: 'Farsi',
}; 