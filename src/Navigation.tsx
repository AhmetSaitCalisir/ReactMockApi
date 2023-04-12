import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const AppLayout = lazy(() => import("./layouts/AppLayout"));

const LoginPage = lazy(() => import("./pages/Login"));
const RegisterPage = lazy(() => import("./pages/Register"));

const HomePage = lazy(() => import("./pages/Home"));
const CompanyPage = lazy(() => import("./pages/Company"));
const ProductPage = lazy(() => import("./pages/Product"));

const Navigation = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<AppLayout />}>
          <Route path="/" element={<HomePage />} index />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/product" element={<ProductPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Navigation;
