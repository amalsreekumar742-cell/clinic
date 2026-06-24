import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

// Lazy Load Pages
const Home = lazy(() => import("../pages/Home"));

// Page transition chunk loading spinner
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-accent border-t-primary rounded-full animate-spin" />
  </div>
);

// Redirect sub-paths to the main landing page hash section
const RedirectToHash = ({ hash }: { hash: string }) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/#${hash}`, { replace: true });
  }, [navigate, hash]);
  return null;
};

const AppRouter = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          
          {/* Sub-paths redirect to corresponding single-page hash sections */}
          <Route path="about" element={<RedirectToHash hash="about" />} />
          <Route path="services" element={<RedirectToHash hash="services" />} />
          <Route path="doctor" element={<RedirectToHash hash="doctor" />} />
          <Route path="contact" element={<RedirectToHash hash="contact" />} />
          
          {/* Fallback redirect to home page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
