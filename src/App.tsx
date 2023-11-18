// import { useState } from "react";

import { useRoutes, BrowserRouter as Router } from "react-router-dom";
import router from "./router/Routers";

const App = () => {
  return useRoutes(router());
};

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};
export default AppWrapper;
