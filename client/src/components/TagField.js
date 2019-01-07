import React from "react";

import IngredientTag from "./IngredientTag";

export default function TagField({ tags, onTagClick }) {
  return (
    <div className="tag-field">
      {tags.map((name, i) => (
        <IngredientTag
          key={`${name}_${i}`}
          content={name}
          symbol="x"
          onClick={onTagClick}
        />
      ))}
    </div>
  );
}
