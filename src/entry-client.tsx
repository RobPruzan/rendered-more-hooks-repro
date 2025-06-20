import React from "react";
import ReactDOM from "react-dom/client";
import ReactDOMServer from "react-dom/server";
import BugRepro from "./BugRepro";

const rootElement = document.getElementById("root")!;

const html = ReactDOMServer.renderToString(
  <React.StrictMode>
    <BugRepro />
  </React.StrictMode>
);

rootElement.innerHTML = html;

ReactDOM.hydrateRoot(
  rootElement,
  <React.StrictMode>
    <BugRepro />
  </React.StrictMode>
);
