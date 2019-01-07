import React from "react";

import SquaredImage from "./SquaredImage";
import IngredientTag from "./IngredientTag";

export default function RecipeCard({ title, tags, src, href, onTagClick }) {
  // The same card is used to display ErrorCard, hance tags? condition - otherwise it tres to map through inexistent tags
  return (
    <div className="card">
      <SquaredImage src={src} alt={title} href={href}>
        <div className="link">
          <i className="fas fa-external-link-alt" />
        </div>
      </SquaredImage>
      <div className="title">{title}</div>
      {tags ? (
        <div className="tag-list">
          {tags.map((name, i) => (
            <IngredientTag
              key={`${name}_${i}`}
              content={name}
              symbol="+"
              onClick={onTagClick}
            />
          ))}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
