import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "../pages/home/home";
import ContactPage from "../pages/contact/contact";
// export const HomePage = lazy(() => import('./'));

const renderFallback = (
    <h1>
        Fallback
    </h1>
);

export function Router() {
    return useRoutes([
        {
            element: (
                <Suspense fallback={renderFallback}>
                    <Outlet />
                </Suspense>
            ),
            children: [
                { element: <HomePage />, index: true },
                { path: 'contact', element: <ContactPage /> },
            ]
        }
    ]
    )
}