import React from "react";

type ImageBlockProps = {
  data: { url: string; alt: string };
  onChange: (data: { url: string; alt: string }) => void;
};

const ImageBlock: React.FC<ImageBlockProps> = ({ data, onChange }) => (
  <div className="image-block">
    <input
      type="text"
      placeholder="Image URL"
      value={data.url}
      onChange={(e) => onChange({ ...data, url: e.target.value })}
      className="w-full p-2"
    />
    {data.url && <img src={data.url} alt={data.alt} className="mt-2 max-w-full" />}
  </div>
);

export default ImageBlock;
