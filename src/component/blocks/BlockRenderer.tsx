import React from "react";
import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";
import QuoteBlock from "./QuoteBlock";
import FlashcardBlock from "./FlashcardBlock";

type BlockRendererProps = {
  type: string;
  data: any;
  onChange: (data: any) => void;
};

const BlockRenderer: React.FC<BlockRendererProps> = ({ type, data, onChange }) => {
switch (type) {
    case 'text':
      return <div>{data.content}</div>;
    case 'image':
      return <img src={data.url} alt={data.alt} />;
    case 'quote':
      return <blockquote>{data.text}</blockquote>;
    case 'flashcard':
      return (
        <FlashcardBlock
          front={data.front}
          back={data.back}
          onChange={onChange}
        />
      );
    default:
      return <div>Unsupported Block Type</div>;
  }
};

export default BlockRenderer;
