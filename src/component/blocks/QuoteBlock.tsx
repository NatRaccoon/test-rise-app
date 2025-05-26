import React from "react";

type QuoteBlockProps = {
  data: { text: string };
  onChange: (data: { text: string }) => void;
};

const QuoteBlock: React.FC<QuoteBlockProps> = ({ data, onChange }) => (
  <div className="quote-block bg-blue-200">
    <textarea
      value={data.text}
      onChange={(e) => onChange({ text: e.target.value })}
      className="w-full bg-transparent italic text-black focus:outline-none pl-4 "
      placeholder="Type a quote..."
    />
  </div>
);

export default QuoteBlock;
