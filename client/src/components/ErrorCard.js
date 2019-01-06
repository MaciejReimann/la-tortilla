import React from "react";

import RecipeCard from "./RecipeCard";
import ErrorIcon from "../images/error.svg";

export default function ErrorCard({ message, tags, src, href }) {
  return <RecipeCard className="error-card" title={message} src={ErrorIcon} />;
}
