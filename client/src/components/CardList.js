import React from "react";

import RecipeCard from "./RecipeCard";
import ErrorCard from "./ErrorCard";

export default function CardList({ data, addSearchItem }) {
  if (data.length < 1) {
    return <ErrorCard />;
  }
  return (
    <div className="card-list">
      {data.map((item, i) => {
        const { title, ingredients, href, thumbnail } = item;
        // Make an array out of incoming string of ingredients:
        const arrayOfIngredients = ingredients.split(",").map(i => i.trim());
        return (
          <RecipeCard
            key={`${title}_${i}`}
            title={title}
            tags={arrayOfIngredients}
            href={href}
            src={thumbnail}
            onTagClick={addSearchItem}
          />
        );
      })}
    </div>
  );
}
