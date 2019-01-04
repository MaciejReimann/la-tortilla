import React from "react";

import Card from "./generic/Card";

export default function CardList({ data }) {
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
