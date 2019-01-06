import React from "react";

import SquaredImage from "./SquaredImage";
import IngredientTag from "./IngredientTag";

export default function RecipeCard({ title, tags, src, href }) {
  console.log(tags);
  return (
    <div className="card">
      <SquaredImage src={src} alt={title} />
      <div className="title">{title}</div>
      <div className="tag-list">
        {tags.map((name, i) => (
          <IngredientTag key={`${name}_${i}`} content={name} />
        ))}
      </div>
    </div>
  );
}
