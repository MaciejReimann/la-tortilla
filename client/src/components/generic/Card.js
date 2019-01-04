import React from "react";

export default function Card({ title, tags, src, href }) {
  console.log(href);
  return (
    <div href={href} className="card">
      <div>
        <img src={src} alt={title} />
      </div>
      <div className="title">{title}</div>
      <div className="tag">{tags}</div>
    </div>
  );
}
