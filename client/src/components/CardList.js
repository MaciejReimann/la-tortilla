import React from "react";

import Card from "./generic/Card";

export default function CardList({ data }) {
  return (
    <div>
      {data.map((item, i) => {
        const { title, ingredients, href, thumbnail } = item;
        return (
          <Card
            key={title}
            title={title}
            tags={ingredients}
            link={href}
            image={thumbnail}
          />
        );
      })}
    </div>
  );
}
