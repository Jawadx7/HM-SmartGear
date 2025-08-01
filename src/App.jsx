import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useAppStore } from "./store/AppStore";

const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const RequireAuth = lazy(() => import("./components/RequireAuth"));
import SuspenseLayout from "./components/SuspenseLayout";
import { useEffect } from "react";
import Alert from "./components/ui/Alert";

const SignInPage = lazy(() => import("./pages/SignIn"));
const SignUpPage = lazy(() => import("./pages/SignUp"));
const SuccessPage = lazy(() => import("./pages/Success"));
const ProductsPage = lazy(() => import("./pages/Products"));

const router = createBrowserRouter([
  {
    path: "/signin",
    element: <SignInPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/payment/success",
    element: <SuccessPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<SuspenseLayout />}>
        <RequireAuth />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<SuspenseLayout />}>
            <ProductsPage />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  const { alert, setAlert, clearAlert } = useAppStore((state) => state);

  useEffect(() => {
    if (!alert.message) return;

    const timeoutId = setTimeout(() => {
      clearAlert();
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [alert.message, setAlert, clearAlert]);

  return (
    <>
      {alert.message && <Alert message={alert.message} type={alert.type} />}
      <RouterProvider router={router} />
    </>
  );
}

export default App;
