import React from "react";
import TextBlock from "./TextBlock";
import ImageBlock from "./ImageBlock";
import QuoteBlock from "./QuoteBlock";

type BlockRendererProps = {
  type: string;
  data: any;
  onChange: (data: any) => void;
};

const BlockRenderer: React.FC<BlockRendererProps> = ({ type, data, onChange }) => {
  switch (type) {
    case "text":
      return <TextBlock data={data} onChange={onChange} />;
    case "image":
      return <ImageBlock data={data} onChange={onChange} />;
    case "quote":
      return <QuoteBlock data={data} onChange={onChange} />;
    default:
      return <div>Unsupported Block Type</div>;
  }
};

export default BlockRenderer;
