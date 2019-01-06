import React from "react";

import RecipeCard from "./RecipeCard";
import ErrorCard from "./ErrorCard";

export default function CardList({ data, error }) {
  if (error) {
    return <ErrorCard message={error} />;
  }
  return (
    <div className="card-list">
      {data.map((item, i) => {
        const { title, ingredients, href, thumbnail } = item;
        // Make an array out of incoming string of ingredients:
        const arrayOfIngredients = ingredients.split(",").map(i => i.trim());
        return (
          <RecipeCard
            key={title}
            title={title}
            tags={arrayOfIngredients}
            href={href}
            src={thumbnail}
          />
        );
      })}
    </div>
  );
}
