import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import settings from "./helper-functions/settings";

import ProjectsPage from "./pages/ProjectsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path={settings.routes.page} element={<ProjectsPage />} />
      </Routes>
    </Router>
  );
}

ReactDOM.render(React.createElement(App), document.getElementById("app"));
