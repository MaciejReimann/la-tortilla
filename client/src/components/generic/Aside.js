import React from "react";

export default function Aside({ children, className }) {
  return (
    <div className={className}>
      <aside>{children}</aside>
    </div>
  );
}
