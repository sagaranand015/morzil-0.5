import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Home from "./Home";

function Router() {
  const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Home />} />
    )
  );
  return router;
};

export default Router;