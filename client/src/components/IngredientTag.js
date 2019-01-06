import React from "react";

export default function IngredientTag({ content, symbol, onClick }) {
  let displayedSymbol;
  if (symbol === "+") {
    displayedSymbol = <i className="tag-icon fas fa-plus" />;
  }
  return (
    <button className="tag" onClick={() => onClick(content)}>
      {`#${content} `}
      {displayedSymbol}
    </button>
  );
}
