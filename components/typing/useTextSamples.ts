import { useCallback } from "react";

type TextType = "common" | "quotes" | "code" | "numbers";

const textSamples = {
  common: [
    "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once, making it perfect for typing practice.",
    "In the heart of the bustling city, people walked briskly along the sidewalks, each absorbed in their own thoughts and daily routines.",
    "Technology has revolutionized the way we communicate, work, and live our daily lives in ways that were unimaginable just a few decades ago.",
    "The gentle rain fell steadily on the roof, creating a soothing rhythm that helped everyone in the house fall into a peaceful sleep.",
    "Learning to type efficiently is a valuable skill that can significantly improve your productivity and make computer work much more enjoyable.",
  ],
  quotes: [
    "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. Your time is limited, so don't waste it living someone else's life. - Steve Jobs",
    "The future belongs to those who believe in the beauty of their dreams. Success is not final, failure is not fatal. - Eleanor Roosevelt",
    "Be yourself; everyone else is already taken. Life is what happens to you while you're busy making other plans. - Oscar Wilde",
    "In three words I can sum up everything I've learned about life: it goes on. The best way out is always through. - Robert Frost",
  ],
  code: [
    "function calculateWPM(characters, timeInMinutes) { return Math.round((characters / 5) / timeInMinutes); }",
    "const handleKeyPress = (event) => { if (event.key === 'Enter') { submitForm(); } else if (event.key === 'Escape') { cancelForm(); } };",
    "class TypingTester extends Component { constructor(props) { super(props); this.state = { wpm: 0, accuracy: 100 }; } }",
    "import React, { useState, useEffect } from 'react'; export default function App() { return <div>Hello World</div>; }",
    "const data = await fetch('/api/typing-stats').then(res => res.json()); if (data.success) { updateStats(data.results); }",
  ],
  numbers: [
    "1234567890 9876543210 1357924680 2468013579 1122334455 9988776655 1010101010 2020202020 3030303030",
    "12345 67890 54321 09876 11223 34455 66778 89900 13579 24680 97531 86420 55443 32211 99887 76654",
    "100 200 300 400 500 600 700 800 900 1000 1100 1200 1300 1400 1500 1600 1700 1800 1900 2000",
    "3.14159 2.71828 1.41421 1.73205 0.57721 0.69314 2.30258 1.09861 0.36787 2.00855 1.64872 0.91893",
    "Phone: 555-123-4567 Date: 12/34/5678 ID: 987-65-4321 Code: ABC123XYZ789 PIN: 9876 SSN: 123-45-6789",
  ],
};

export function useTextSamples() {
  const getRandomText = useCallback((type: TextType): string => {
    const texts = textSamples[type];
    return texts[Math.floor(Math.random() * texts.length)];
  }, []);

  return { getRandomText };
}
