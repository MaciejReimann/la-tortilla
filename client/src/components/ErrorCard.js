import React from "react";

import Card from "./generic/Card";
import ErrorIcon from "../images/error.svg";

export default function ErrorCard({ message, tags, src, href }) {
  return <Card className="error-card" title={message} src={ErrorIcon} />;
}
