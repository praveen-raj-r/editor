import { RouterProvider } from "react-router-dom";
import "./App.css";
import { routes } from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/theme-provider";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GlobalStateProvider } from "./context/global-state-context";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <GlobalStateProvider>
          <RouterProvider router={routes} />
        </GlobalStateProvider>
      </ThemeProvider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default App;
