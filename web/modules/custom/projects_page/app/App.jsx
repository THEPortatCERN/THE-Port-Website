import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import ProjectsPage from "./pages/ProjectsPage";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/projects" element={<ProjectsPage />}/>
        {/* <Route index element={<ProjectsPage />}/> */}
      </Routes>
    </Router>
  );
}

ReactDOM.render(React.createElement(App), document.getElementById("app"));
