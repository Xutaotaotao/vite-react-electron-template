import { Routes, Route } from "react-router-dom";
import { AuthProvider, RequireAuth } from "./auth";
import Layout from "./layout";
import routes from "./route";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          {routes.map((route) => {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  route.auth ?
                  <RequireAuth>
                   {route.element}
                  </RequireAuth> : route.element
                }
              />
            );
          })}
        </Route>
      </Routes>
    </AuthProvider>
  );
}
