import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import Customers from "./Customers";
import NotFound from "./NotFound";
import { MainLayout } from "./layouts/MainLayout";
import { AuthLayout } from "./layouts/AuthLayout";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Forgot from "./pages/auth/forgot";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;