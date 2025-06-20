import React from "react";
import ReactDOMServer from "react-dom/server";
import BugRepro from "./BugRepro";

export function render() {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <BugRepro />
    </React.StrictMode>
  );
  return { html };
}
