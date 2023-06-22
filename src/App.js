import { useEffect } from "react";

import DashboardOverview from "views/DashboardOverview";
import Configurator from "examples/Configurator";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 PRO React themes
import theme from "assets/theme";
//importing route
import { Route, Routes, useLocation } from "react-router-dom";

// Material Dashboard 2 PRO React contexts
import { useMaterialUIController } from "context";
import themeDark from "assets/theme-dark";

export default function App() {
  const [controller] = useMaterialUIController();
  const { direction, darkMode } = controller;
  const { pathname } = useLocation();

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      <Routes>
        <Route path="*" key="/dashboard" element={<DashboardOverview />} />
      </Routes>
      <Configurator />
    </ThemeProvider>
  );
}
