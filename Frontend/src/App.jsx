import { Suspense, lazy } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoute from "./routes/AppRoute";

const AppToaster = lazy(() => import("./components/common/AppToaster"));

function AppRoutes() {

  return (
    <Suspense>
      <AppRoute />
    </Suspense>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={null}>
        <AppToaster />
      </Suspense>
      <AppRoutes />
    </Router>
  );
}
