import { Suspense, lazy } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import ScrollToTop from "./components/common/ScrollToTop";

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
        <ScrollToTop />
        <AppToaster />
      </Suspense>
      <AppRoutes />
    </Router>
  );
}
