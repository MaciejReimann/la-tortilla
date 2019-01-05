import React from "react";

import Card from "./generic/Card";
import ErrorCard from "./ErrorCard";

export default function CardList({ data, error }) {
  if (error) {
    return <ErrorCard message={error} />;
  }
  return (
    <div className="card-container">
      {data.map((item, i) => {
        const { title, ingredients, href, thumbnail } = item;
        return (
          <Card
            key={title}
            title={title}
            tags={ingredients}
            href={href}
            src={thumbnail}
          />
        );
      })}
    </div>
  );
}
