import React from "react";
import ReactDOM from "react-dom";

import ProjectsPage from "./pages/ProjectsPage";

function App() {

  return (
    <ProjectsPage />
  );
}

ReactDOM.render(React.createElement(App), document.getElementById("app"));
