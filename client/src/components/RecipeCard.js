import React from "react";

import SquaredImage from "./SquaredImage";

export default function RecipeCard({ title, tags, src, href }) {
  return (
    <div className="card">
      <SquaredImage src={src} alt={title} />
      <div className="title">{title}</div>
      <div className="tags">{tags}</div>
    </div>
  );
}
