import React from "react";
import ReactDOM from "react-dom/client";
import BugRepro from "./BugRepro";

// if pure CSR, no more too many hooks error
const HYDRATE = true;

if (HYDRATE) {
  ReactDOM.hydrateRoot(
    document.getElementById("root")!,
    <React.StrictMode>
      <BugRepro />
    </React.StrictMode>
  );
} else {
  const rootElement = document.getElementById("root")!;
  rootElement.innerHTML = "";
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BugRepro />
    </React.StrictMode>
  );
}
