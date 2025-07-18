export interface LessonContent {
  id: number;
  title: string;
  titleFa: string;
  description: string;
  descriptionFa: string;
  category: 'basics' | 'notes' | 'rhythm' | 'scales' | 'chords' | 'theory';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  content: {
    sections: Array<{
      title: string;
      titleFa: string;
      content: string;
      contentFa: string;
      imageUrl?: string;
      audioUrl?: string;
    }>;
  };
  practice: {
    type: 'note_identification' | 'rhythm_tapping' | 'scale_recognition' | 'chord_building' | 'interval_recognition';
    exercises: Array<{
      question: string;
      questionFa: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
      explanationFa: string;
      imageUrl?: string;
      audioUrl?: string;
    }>;
  };
  quiz: {
    questions: Array<{
      question: string;
      questionFa: string;
      type: 'multiple_choice' | 'true_false' | 'matching' | 'fill_blank';
      options?: string[];
      correctAnswer: number | string | boolean;
      explanation: string;
      explanationFa: string;
      imageUrl?: string;
      audioUrl?: string;
    }>;
  };
  prerequisites: number[]; // lesson IDs that must be completed first
  learningObjectives: string[];
  learningObjectivesFa: string[];
}

export const curriculum: LessonContent[] = [
  // Module 1: Music Basics (Lessons 1-3)
  {
    id: 1,
    title: "What is Music?",
    titleFa: "موسیقی چیست؟",
    description: "Introduction to music and its fundamental concepts",
    descriptionFa: "معرفی موسیقی و مفاهیم اساسی آن",
    category: "basics",
    difficulty: "beginner",
    duration: 5,
    content: {
      sections: [
        {
          title: "Introduction to Music",
          titleFa: "معرفی موسیقی",
          content: "Music is the art of arranging sounds in time to produce a composition through the elements of melody, harmony, rhythm, and timbre. It is a universal language that expresses emotions and ideas.",
          contentFa: "موسیقی هنر چیدمان صداها در زمان برای ایجاد یک قطعه از طریق عناصر ملودی، هارمونی، ریتم و رنگ‌آمیزی صوتی است. موسیقی زبانی جهانی است که احساسات و ایده‌ها را بیان می‌کند.",
          imageUrl: "music_intro.jpg"
        },
        {
          title: "Elements of Music",
          titleFa: "عناصر موسیقی",
          content: "The four main elements of music are: Melody (tune), Harmony (chords), Rhythm (beat), and Timbre (tone color).",
          contentFa: "چهار عنصر اصلی موسیقی عبارتند از: ملودی (آهنگ)، هارمونی (آکوردها)، ریتم (ضرب) و رنگ‌آمیزی صوتی (رنگ صدا).",
          imageUrl: "music_elements.jpg"
        }
      ]
    },
    practice: {
      type: "note_identification",
      exercises: [
        {
          question: "Which element of music refers to the tune or main musical line?",
          questionFa: "کدام عنصر موسیقی به آهنگ یا خط موسیقایی اصلی اشاره دارد؟",
          options: ["Melody", "Harmony", "Rhythm", "Timbre"],
          correctAnswer: 0,
          explanation: "Melody is the tune or main musical line that you can sing or hum.",
          explanationFa: "ملودی آهنگ یا خط موسیقایی اصلی است که می‌توانید آن را بخوانید یا زمزمه کنید."
        }
      ]
    },
    quiz: {
      questions: [
        {
          question: "Music is the art of arranging sounds in time.",
          questionFa: "موسیقی هنر چیدمان صداها در زمان است.",
          type: "true_false",
          correctAnswer: true,
          explanation: "This is the fundamental definition of music.",
          explanationFa: "این تعریف اساسی موسیقی است."
        },
        {
          question: "How many main elements does music have?",
          questionFa: "موسیقی چند عنصر اصلی دارد؟",
          type: "multiple_choice",
          options: ["2", "3", "4", "5"],
          correctAnswer: 2,
          explanation: "Music has four main elements: melody, harmony, rhythm, and timbre.",
          explanationFa: "موسیقی چهار عنصر اصلی دارد: ملودی، هارمونی، ریتم و رنگ‌آمیزی صوتی."
        }
      ]
    },
    prerequisites: [],
    learningObjectives: [
      "Understand what music is",
      "Identify the four elements of music",
      "Recognize music as a universal language"
    ],
    learningObjectivesFa: [
      "درک اینکه موسیقی چیست",
      "شناسایی چهار عنصر موسیقی",
      "شناخت موسیقی به عنوان زبانی جهانی"
    ]
  },
  {
    id: 2,
    title: "The Musical Staff",
    titleFa: "خط حامل موسیقی",
    description: "Understanding the musical staff and its structure",
    descriptionFa: "درک خط حامل موسیقی و ساختار آن",
    category: "basics",
    difficulty: "beginner",
    duration: 8,
    content: {
      sections: [
        {
          title: "What is a Staff?",
          titleFa: "خط حامل چیست؟",
          content: "The staff is a set of five horizontal lines and four spaces that each represent a different musical pitch. Notes are placed on the lines and spaces to indicate their pitch.",
          contentFa: "خط حامل مجموعه‌ای از پنج خط افقی و چهار فاصله است که هرکدام نمایانگر یک زیر و بَم موسیقایی متفاوت هستند. نت‌ها روی خطوط و فضاها قرار می‌گیرند تا زیر و بَم آن‌ها را نشان دهند.",
          imageUrl: "staff_basic.jpg"
        },
        {
          title: "Lines and Spaces",
          titleFa: "خطوط و فضاها",
          content: "The five lines are counted from bottom to top. The four spaces are the areas between the lines. Each line and space represents a specific note.",
          contentFa: "پنج خط از پایین به بالا شمارش می‌شوند. چهار فاصله، مناطق بین خطوط هستند. هر خط و فاصله نمایانگر یک نت خاص است.",
          imageUrl: "staff_lines_spaces.jpg"
        }
      ]
    },
    practice: {
      type: "note_identification",
      exercises: [
        {
          question: "How many lines are in a musical staff?",
          questionFa: "چند خط در یک خط حامل موسیقی وجود دارد؟",
          options: ["3", "4", "5", "6"],
          correctAnswer: 2,
          explanation: "A musical staff has exactly 5 horizontal lines.",
          explanationFa: "یک خط حامل موسیقی دقیقاً 5 خط افقی دارد."
        }
      ]
    },
    quiz: {
      questions: [
        {
          question: "The staff has 5 lines and 4 spaces.",
          questionFa: "خط حامل 5 خط و 4 فاصله دارد.",
          type: "true_false",
          correctAnswer: true,
          explanation: "This is the standard structure of a musical staff.",
          explanationFa: "این ساختار استاندارد خط حامل موسیقی است."
        }
      ]
    },
    prerequisites: [1],
    learningObjectives: [
      "Identify the structure of a musical staff",
      "Count lines and spaces correctly",
      "Understand pitch representation"
    ],
    learningObjectivesFa: [
      "شناسایی ساختار خط حامل موسیقی",
      "شمارش صحیح خطوط و فضاها",
      "درک نمایش زیر و بَم"
    ]
  },
  {
    id: 3,
    title: "Clefs",
    titleFa: "کلیدها",
    description: "Learning about treble and bass clefs",
    descriptionFa: "آموزش کلیدهای سل و فا",
    category: "basics",
    difficulty: "beginner",
    duration: 10,
    content: {
      sections: [
        {
          title: "What are Clefs?",
          titleFa: "کلیدها چیستند؟",
          content: "Clefs assign individual notes to certain lines or spaces. The most common are the Treble Clef (G Clef) and Bass Clef (F Clef).",
          contentFa: "کلیدها به خطوط و فضاها نت‌های خاصی را اختصاص می‌دهند. رایج‌ترین کلیدها، کلید سل (کلید G) و کلید فا (کلید F) هستند.",
          imageUrl: "clefs_intro.jpg"
        },
        {
          title: "Treble Clef (G Clef)",
          titleFa: "کلید سل (کلید G)",
          content: "The treble clef is used for higher-pitched instruments and voices. The curl of the clef circles around the G line (second line from bottom).",
          contentFa: "کلید سل برای سازها و صداهای زیرتر استفاده می‌شود. حلقه کلید دور خط سل (خط دوم از پایین) می‌چرخد.",
          imageUrl: "treble_clef.jpg"
        },
        {
          title: "Bass Clef (F Clef)",
          titleFa: "کلید فا (کلید F)",
          content: "The bass clef is used for lower-pitched instruments and voices. The two dots are placed around the F line (fourth line from bottom).",
          contentFa: "کلید فا برای سازها و صداهای بم‌تر استفاده می‌شود. دو نقطه دور خط فا (خط چهارم از پایین) قرار می‌گیرند.",
          imageUrl: "bass_clef.jpg"
        }
      ]
    },
    practice: {
      type: "note_identification",
      exercises: [
        {
          question: "Which clef is used for higher-pitched instruments?",
          questionFa: "کدام کلید برای سازهای زیرتر استفاده می‌شود؟",
          options: ["Treble Clef", "Bass Clef", "Alto Clef", "Tenor Clef"],
          correctAnswer: 0,
          explanation: "The treble clef (G clef) is used for higher-pitched instruments and voices.",
          explanationFa: "کلید سل (کلید G) برای سازها و صداهای زیرتر استفاده می‌شود."
        }
      ]
    },
    quiz: {
      questions: [
        {
          question: "The treble clef circles around which line?",
          questionFa: "کلید سل دور کدام خط می‌چرخد؟",
          type: "multiple_choice",
          options: ["E line", "G line", "B line", "D line"],
          correctAnswer: 1,
          explanation: "The treble clef circles around the G line (second line from bottom).",
          explanationFa: "کلید سل دور خط سل (خط دوم از پایین) می‌چرخد."
        }
      ]
    },
    prerequisites: [2],
    learningObjectives: [
      "Identify treble and bass clefs",
      "Understand clef placement",
      "Recognize pitch ranges"
    ],
    learningObjectivesFa: [
      "شناسایی کلیدهای سل و فا",
      "درک جایگذاری کلیدها",
      "شناخت محدوده‌های زیر و بَم"
    ]
  },

  // Module 2: Notes and Pitches (Lessons 4-6)
  {
    id: 4,
    title: "Notes and Pitches",
    titleFa: "نت‌ها و زیر و بَم‌ها",
    description: "Mastering note reading and pitch recognition",
    descriptionFa: "تسلط بر خواندن نت و تشخیص زیر و بَم",
    category: "notes",
    difficulty: "beginner",
    duration: 12,
    content: {
      sections: [
        {
          title: "Musical Alphabet",
          titleFa: "الفبای موسیقی",
          content: "The musical alphabet uses the letters A, B, C, D, E, F, and G. After G, it starts over with A. This pattern repeats throughout the musical range.",
          contentFa: "الفبای موسیقی از حروف A، B، C، D، E، F و G استفاده می‌کند. بعد از G، دوباره با A شروع می‌شود. این الگو در تمام محدوده موسیقی تکرار می‌شود.",
          imageUrl: "musical_alphabet.jpg"
        },
        {
          title: "Note Names on the Staff",
          titleFa: "نام‌های نت روی خط حامل",
          content: "Each line and space on the staff represents a specific note. In treble clef, the lines from bottom to top are E, G, B, D, F. The spaces are F, A, C, E.",
          contentFa: "هر خط و فاصله روی خط حامل نمایانگر یک نت خاص است. در کلید سل، خطوط از پایین به بالا E، G، B، D، F هستند. فضاها F، A، C، E هستند.",
          imageUrl: "note_names_treble.jpg"
        }
      ]
    },
    practice: {
      type: "note_identification",
      exercises: [
        {
          question: "What note is on the first line of the treble clef?",
          questionFa: "کدام نت روی اولین خط کلید سل قرار دارد؟",
          options: ["C", "D", "E", "F"],
          correctAnswer: 2,
          explanation: "The first line (bottom line) of the treble clef is E.",
          explanationFa: "اولین خط (خط پایین) کلید سل E است."
        },
        {
          question: "What note is in the first space of the treble clef?",
          questionFa: "کدام نت در اولین فاصله کلید سل قرار دارد؟",
          options: ["C", "D", "E", "F"],
          correctAnswer: 3,
          explanation: "The first space (bottom space) of the treble clef is F.",
          explanationFa: "اولین فاصله (فاصله پایین) کلید سل F است."
        }
      ]
    },
    quiz: {
      questions: [
        {
          question: "How many letters are in the musical alphabet?",
          questionFa: "چند حرف در الفبای موسیقی وجود دارد؟",
          type: "multiple_choice",
          options: ["5", "6", "7", "8"],
          correctAnswer: 2,
          explanation: "The musical alphabet has 7 letters: A, B, C, D, E, F, G.",
          explanationFa: "الفبای موسیقی 7 حرف دارد: A، B، C، D، E، F، G."
        }
      ]
    },
    prerequisites: [3],
    learningObjectives: [
      "Learn the musical alphabet",
      "Identify notes on the treble clef",
      "Understand pitch relationships"
    ],
    learningObjectivesFa: [
      "یادگیری الفبای موسیقی",
      "شناسایی نت‌ها روی کلید سل",
      "درک روابط زیر و بَم"
    ]
  },

  // Module 3: Rhythm (Lesson 6-7)
  {
    id: 6,
    title: "Note Values and Durations",
    titleFa: "ارزش زمانی نت‌ها",
    description: "Understanding note values and how long each note lasts",
    descriptionFa: "درک ارزش زمانی نت‌ها و مدت زمان هر نت",
    category: "rhythm",
    difficulty: "beginner",
    duration: 10,
    content: {
      sections: [
        {
          title: "Note Values",
          titleFa: "ارزش نت‌ها",
          content: "Whole, half, quarter, eighth, and sixteenth notes each have different durations.",
          contentFa: "نت گرد، سفید، سیاه، چنگ و دولاچنگ هرکدام مدت زمان متفاوتی دارند.",
          imageUrl: "note_values.jpg"
        }
      ]
    },
    practice: {
      type: "rhythm_tapping",
      exercises: [
        {
          question: "How many beats does a whole note get in 4/4 time?",
          questionFa: "نت گرد در میزان ۴/۴ چند ضرب دارد؟",
          options: ["1", "2", "3", "4"],
          correctAnswer: 3,
          explanation: "A whole note gets 4 beats in 4/4 time.",
          explanationFa: "نت گرد در میزان ۴/۴ چهار ضرب دارد."
        }
      ]
    },
    quiz: {
      questions: [
        {
          question: "A quarter note gets 1 beat in 4/4 time.",
          questionFa: "نت سیاه در میزان ۴/۴ یک ضرب دارد.",
          type: "true_false",
          correctAnswer: true,
          explanation: "A quarter note gets exactly 1 beat in 4/4 time.",
          explanationFa: "نت سیاه دقیقاً یک ضرب در میزان ۴/۴ دارد."
        }
      ]
    },
    prerequisites: [5],
    learningObjectives: [
      "Understand note values",
      "Recognize durations of different notes"
    ],
    learningObjectivesFa: [
      "درک ارزش زمانی نت‌ها",
      "شناخت مدت زمان نت‌های مختلف"
    ]
  },
  {
    id: 7,
    title: "Time Signatures",
    titleFa: "کسر میزان",
    description: "Learning about time signatures and their meaning",
    descriptionFa: "آشنایی با کسر میزان و معنای آن‌ها",
    category: "rhythm",
    difficulty: "beginner",
    duration: 8,
    content: {
      sections: [
        {
          title: "What is a Time Signature?",
          titleFa: "کسر میزان چیست؟",
          content: "Time signatures tell you how many beats are in each measure and what note value gets the beat.",
          contentFa: "کسر میزان به شما می‌گوید در هر میزان چند ضرب وجود دارد و کدام نت ارزش یک ضرب را دارد.",
          imageUrl: "time_signature.jpg"
        }
      ]
    },
    practice: {
      type: "rhythm_tapping",
      exercises: [
        {
          question: "What does the top number in a time signature mean?",
          questionFa: "عدد بالایی در کسر میزان چه معنایی دارد؟",
          options: ["Number of beats per measure", "Note value", "Tempo", "Key"],
          correctAnswer: 0,
          explanation: "The top number tells you how many beats are in each measure.",
          explanationFa: "عدد بالایی تعداد ضرب‌های هر میزان را نشان می‌دهد."
        }
      ]
    },
    quiz: {
      questions: [
        {
          question: "4/4 is called common time.",
          questionFa: "۴/۴ به عنوان میزان رایج شناخته می‌شود.",
          type: "true_false",
          correctAnswer: true,
          explanation: "4/4 is the most common time signature and is called common time.",
          explanationFa: "۴/۴ رایج‌ترین کسر میزان است و به عنوان میزان رایج شناخته می‌شود."
        }
      ]
    },
    prerequisites: [6],
    learningObjectives: [
      "Understand time signatures",
      "Read and interpret time signatures"
    ],
    learningObjectivesFa: [
      "درک کسر میزان",
      "خواندن و تفسیر کسر میزان"
    ]
  },
  // Module 4: Scales (Lessons 9-11)
  {
    id: 9,
    title: "Minor Scales",
    titleFa: "گام‌های مینور",
    description: "Building minor scales and their patterns",
    descriptionFa: "ساخت گام‌های مینور و الگوهای آن‌ها",
    category: "scales",
    difficulty: "intermediate",
    duration: 12,
    content: {
      sections: [
        {
          title: "Minor Scale Pattern",
          titleFa: "الگوی گام مینور",
          content: "The natural minor scale pattern is: Whole, Half, Whole, Whole, Half, Whole, Whole.",
          contentFa: "الگوی گام مینور طبیعی: پرده، نیم‌پرده، پرده، پرده، نیم‌پرده، پرده، پرده.",
          imageUrl: "minor_scale_pattern.jpg"
        }
      ]
    },
    practice: {
      type: "scale_recognition",
      exercises: [
        {
          question: "What is the pattern of a natural minor scale?",
          questionFa: "الگوی گام مینور طبیعی چیست؟",
          options: ["W H W W H W W", "W W H W W W H", "H W W H W W W", "W W W H W W H"],
          correctAnswer: 0,
          explanation: "The natural minor scale pattern is Whole, Half, Whole, Whole, Half, Whole, Whole.",
          explanationFa: "الگوی گام مینور طبیعی: پرده، نیم‌پرده، پرده، پرده، نیم‌پرده، پرده، پرده است."
        }
      ]
    },
    quiz: {
      questions: [
        {
          question: "How many notes are in a natural minor scale?",
          questionFa: "چند نت در یک گام مینور طبیعی وجود دارد؟",
          type: "multiple_choice",
          options: ["6", "7", "8", "9"],
          correctAnswer: 2,
          explanation: "A natural minor scale has 8 notes (including the octave).",
          explanationFa: "یک گام مینور طبیعی ۸ نت دارد (شامل اکتاو)."
        }
      ]
    },
    prerequisites: [8],
    learningObjectives: [
      "Understand minor scale construction",
      "Learn minor scale pattern"
    ],
    learningObjectivesFa: [
      "درک ساخت گام مینور",
      "یادگیری الگوی گام مینور"
    ]
  },
  {
    id: 10,
    title: "Key Signatures",
    titleFa: "سرکلیدها",
    description: "Learning about key signatures and their importance",
    descriptionFa: "آشنایی با سرکلیدها و اهمیت آن‌ها",
    category: "scales",
    difficulty: "intermediate",
    duration: 10,
    content: {
      sections: [
        {
          title: "What is a Key Signature?",
          titleFa: "سرکلید چیست؟",
          content: "A key signature is a set of sharps or flats at the beginning of a staff, indicating the key of the music.",
          contentFa: "سرکلید مجموعه‌ای از دیزها یا بمل‌ها در ابتدای خط حامل است که کلید موسیقی را نشان می‌دهد.",
          imageUrl: "key_signature.jpg"
        }
      ]
    },
    practice: {
      type: "scale_recognition",
      exercises: [
        {
          question: "What does a key signature indicate?",
          questionFa: "سرکلید چه چیزی را نشان می‌دهد؟",
          options: ["Tempo", "Key", "Time signature", "Dynamics"],
          correctAnswer: 1,
          explanation: "A key signature tells you the key of the music.",
          explanationFa: "سرکلید کلید موسیقی را نشان می‌دهد."
        }
      ]
    },
    quiz: {
      questions: [
        {
          question: "A key signature is found at the beginning of the staff.",
          questionFa: "سرکلید در ابتدای خط حامل قرار دارد.",
          type: "true_false",
          correctAnswer: true,
          explanation: "Key signatures are always placed at the beginning of the staff.",
          explanationFa: "سرکلیدها همیشه در ابتدای خط حامل قرار می‌گیرند."
        }
      ]
    },
    prerequisites: [9],
    learningObjectives: [
      "Understand key signatures",
      "Identify sharps and flats in key signatures"
    ],
    learningObjectivesFa: [
      "درک سرکلیدها",
      "شناسایی دیزها و بمل‌ها در سرکلیدها"
    ]
  },
  {
    id: 11,
    title: "Intervals",
    titleFa: "فواصل",
    description: "Learning about intervals and their role in music",
    descriptionFa: "آشنایی با فواصل و نقش آن‌ها در موسیقی",
    category: "scales",
    difficulty: "intermediate",
    duration: 10,
    content: {
      sections: [
        {
          title: "What is an Interval?",
          titleFa: "فاصله چیست؟",
          content: "An interval is the distance between two notes. Intervals are named by counting the number of letter names from the first note to the second.",
          contentFa: "فاصله، فاصله بین دو نت است. فواصل با شمردن تعداد نام‌های نت از نت اول تا دوم نام‌گذاری می‌شوند.",
          imageUrl: "interval_intro.jpg"
        }
      ]
    },
    practice: {
      type: "interval_recognition",
      exercises: [
        {
          question: "What is the interval between C and E?",
          questionFa: "فاصله بین دو و می چیست؟",
          options: ["Second", "Third", "Fourth", "Fifth"],
          correctAnswer: 1,
          explanation: "C to E is a third (C-D-E).",
          explanationFa: "دو تا می یک فاصله سوم است (دو-ر-می)."
        }
      ]
    },
    quiz: {
      questions: [
        {
          question: "An interval is the distance between two notes.",
          questionFa: "فاصله، فاصله بین دو نت است.",
          type: "true_false",
          correctAnswer: true,
          explanation: "This is the definition of an interval.",
          explanationFa: "این تعریف فاصله است."
        }
      ]
    },
    prerequisites: [10],
    learningObjectives: [
      "Understand intervals",
      "Identify intervals by counting letter names"
    ],
    learningObjectivesFa: [
      "درک فواصل",
      "شناسایی فواصل با شمردن نام نت‌ها"
    ]
  },
  // Module 6: Chords (Lessons 13-14)
  {
    id: 13,
    title: "Chord Progressions",
    titleFa: "توالی آکوردها",
    description: "Learning about common chord progressions",
    descriptionFa: "آشنایی با توالی‌های رایج آکوردها",
    category: "chords",
    difficulty: "advanced",
    duration: 12,
    content: {
      sections: [
        {
          title: "What is a Chord Progression?",
          titleFa: "توالی آکورد چیست؟",
          content: "A chord progression is a series of chords played in sequence. Common progressions include I-IV-V-I and ii-V-I.",
          contentFa: "توالی آکورد مجموعه‌ای از آکوردهاست که به ترتیب نواخته می‌شوند. توالی‌های رایج شامل I-IV-V-I و ii-V-I هستند.",
          imageUrl: "chord_progression.jpg"
        }
      ]
    },
    practice: {
      type: "chord_building",
      exercises: [
        {
          question: "Which is a common chord progression in C major?",
          questionFa: "کدام یک توالی آکورد رایج در دو ماژور است؟",
          options: ["C-F-G-C", "C-D-E-F", "A-D-E-A", "G-C-D-G"],
          correctAnswer: 0,
          explanation: "C-F-G-C (I-IV-V-I) is a common progression in C major.",
          explanationFa: "C-F-G-C (I-IV-V-I) یک توالی رایج در دو ماژور است."
        }
      ]
    },
    quiz: {
      questions: [
        {
          question: "A ii-V-I progression is common in jazz music.",
          questionFa: "توالی ii-V-I در موسیقی جاز رایج است.",
          type: "true_false",
          correctAnswer: true,
          explanation: "The ii-V-I progression is a staple of jazz harmony.",
          explanationFa: "توالی ii-V-I یکی از پایه‌های هارمونی جاز است."
        }
      ]
    },
    prerequisites: [12],
    learningObjectives: [
      "Understand chord progressions",
      "Recognize common progressions"
    ],
    learningObjectivesFa: [
      "درک توالی آکوردها",
      "شناسایی توالی‌های رایج"
    ]
  },
  {
    id: 14,
    title: "Advanced Harmony",
    titleFa: "هارمونی پیشرفته",
    description: "Exploring advanced harmony concepts",
    descriptionFa: "بررسی مفاهیم پیشرفته هارمونی",
    category: "chords",
    difficulty: "advanced",
    duration: 15,
    content: {
      sections: [
        {
          title: "Seventh Chords",
          titleFa: "آکوردهای هفتم",
          content: "Seventh chords add a fourth note to the triad, creating richer harmony. Common types include major seventh, minor seventh, and dominant seventh.",
          contentFa: "آکوردهای هفتم یک نت چهارم به تریاد اضافه می‌کنند و هارمونی غنی‌تری ایجاد می‌کنند. انواع رایج شامل هفتم ماژور، هفتم مینور و هفتم غالب است.",
          imageUrl: "seventh_chord.jpg"
        }
      ]
    },
    practice: {
      type: "chord_building",
      exercises: [
        {
          question: "What notes make up a C major seventh chord?",
          questionFa: "نت‌های آکورد دو ماژور هفتم کدامند؟",
          options: ["C E G B", "C D E F", "A C E G", "C F A C"],
          correctAnswer: 0,
          explanation: "C-E-G-B forms a C major seventh chord.",
          explanationFa: "C-E-G-B یک آکورد دو ماژور هفتم را تشکیل می‌دهد."
        }
      ]
    },
    quiz: {
      questions: [
        {
          question: "A dominant seventh chord is built on the fifth degree of the scale.",
          questionFa: "آکورد هفتم غالب بر پایه درجه پنجم گام ساخته می‌شود.",
          type: "true_false",
          correctAnswer: true,
          explanation: "Dominant sevenths are built on the fifth degree (V) of the scale.",
          explanationFa: "آکورد هفتم غالب بر پایه درجه پنجم (V) گام ساخته می‌شود."
        }
      ]
    },
    prerequisites: [13],
    learningObjectives: [
      "Understand advanced harmony",
      "Learn about seventh chords"
    ],
    learningObjectivesFa: [
      "درک هارمونی پیشرفته",
      "یادگیری آکوردهای هفتم"
    ]
  }
];

// Additional lessons can be added here following the same structure
export const getLessonById = (id: number): LessonContent | undefined => {
  return curriculum.find(lesson => lesson.id === id);
};

export const getLessonsByCategory = (category: string): LessonContent[] => {
  return curriculum.filter(lesson => lesson.category === category);
};

export const getLessonsByDifficulty = (difficulty: string): LessonContent[] => {
  return curriculum.filter(lesson => lesson.difficulty === difficulty);
};

export const getPrerequisitesMet = (completedLessonIds: number[]): LessonContent[] => {
  return curriculum.filter(lesson => 
    lesson.prerequisites.every(prereq => completedLessonIds.includes(prereq))
  );
}; 