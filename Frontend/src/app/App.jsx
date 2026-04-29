import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { AuthProvider } from "../context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppRoutes from "./routes";
import AppToaster from "../shared/components/feedback/AppToaster";
import ScrollToTop from "../shared/components/feedback/ScrollToTop";
import Loader from "../shared/components/ui/Loader";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />

          <Suspense fallback={<Loader />}>
            <AppRoutes />
          </Suspense>

          <AppToaster />

        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
