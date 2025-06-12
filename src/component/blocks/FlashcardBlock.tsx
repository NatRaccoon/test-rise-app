'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

type FlashcardProps = {
  front: string;
  back: string;
  onChange: (data: { front: string; back: string }) => void;
};

export default function FlashcardBlock({ front, back, onChange }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto relative [perspective:1000px]">
      <motion.div
        className="relative w-full h-48 duration-500 [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full bg-white border rounded-xl [backface-visibility:hidden] flex items-center justify-center p-4 shadow">
          <textarea
            value={front}
            onChange={(e) => onChange({ front: e.target.value, back })}
            placeholder="Front side..."
            className="w-full h-full resize-none outline-none bg-transparent text-black"
          />
          <button
            onClick={() => setFlipped(true)}
            className="absolute bottom-2 right-2 p-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
            title="Flip to back"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full bg-green-100 border rounded-xl [backface-visibility:hidden] [transform:rotateY(180deg)] flex items-center justify-center p-4 shadow">
          <textarea
            value={back}
            onChange={(e) => onChange({ front, back: e.target.value })}
            placeholder="Back side..."
            className="w-full h-full resize-none outline-none bg-transparent text-black"
          />
          <button
            onClick={() => setFlipped(false)}
            className="absolute bottom-2 right-2 p-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
            title="Flip to front"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
