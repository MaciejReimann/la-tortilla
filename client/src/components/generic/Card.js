import React from "react";

export default function Card({ title, tags, src, href }) {
  console.log(href);
  return (
    <div className="card">
      <div className="image">{/* <img src={src} alt={title} /> */}</div>
      <div className="title">{title}</div>
      <div className="tags">{tags}</div>
    </div>
  );
}
