
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ClientsPage from "./pages/ClientsPage";
import FacilitiesPage from "./pages/FacilitiesPage";
import TasksPage from "./pages/TasksPage";
import CalendarPage from "./pages/CalendarPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ContactsPage from "./pages/ContactsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import { useEffect } from "react";
import { CRMProvider } from "./contexts/CRMContext";
import { StatisticsProvider } from "./contexts/StatisticsContext";
import { AppSettingsProvider } from "./contexts/AppSettingsContext";
import { trackPageView } from "./utils/analytics";

// Define routes configuration for Senior Care Dashboard
const routes = [
  { path: "/", element: <Index /> },
  { path: "/clients", element: <ClientsPage /> },
  { path: "/facilities", element: <FacilitiesPage /> },
  { path: "/tasks", element: <TasksPage /> },
  { path: "/calendar", element: <CalendarPage /> },
  { path: "/analytics", element: <StatisticsProvider><AnalyticsPage /></StatisticsProvider> },
  { path: "/contacts", element: <ContactsPage /> },
  { path: "/settings", element: <SettingsPage /> },
  
  // Legacy redirects from agricultural app
  { path: "/parcelles", element: <Navigate to="/facilities" replace /> },
  { path: "/cultures", element: <Navigate to="/clients" replace /> },
  { path: "/inventaire", element: <Navigate to="/tasks" replace /> },
  { path: "/finances", element: <Navigate to="/analytics" replace /> },
  { path: "/statistiques", element: <Navigate to="/analytics" replace /> },
  { path: "/rapports", element: <Navigate to="/analytics" replace /> },
  { path: "/parametres", element: <Navigate to="/settings" replace /> },
  { path: "/dashboard", element: <Navigate to="/" replace /> },
  { path: "*", element: <NotFound /> }
];

// Create query client with enhanced configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

// Router change handler component
const RouterChangeHandler = () => {
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
    // Track page view for analytics
    const currentPath = window.location.pathname;
    const pageName = currentPath === '/' ? 'dashboard' : currentPath.replace(/^\//, '');
    trackPageView(pageName);
  }, [location.pathname]);
  
  return null;
};

// Senior Care Application main component
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppSettingsProvider>
        <CRMProvider>
          <BrowserRouter>
            <TooltipProvider>
              <RouterChangeHandler />
              <Routes>
                {routes.map((route) => (
                  <Route 
                    key={route.path} 
                    path={route.path} 
                    element={route.element} 
                  />
                ))}
              </Routes>
            </TooltipProvider>
          </BrowserRouter>
        </CRMProvider>
      </AppSettingsProvider>
    </QueryClientProvider>
  );
};

export default App;
