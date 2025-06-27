import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import VendorPage from "./vendor-page.component";
const router = createBrowserRouter([
    {
        path: "/vendors/:vendorId",
        element: _jsx(VendorPage, {}),
    },
    {
        path: "/vendors",
        element: _jsx(VendorPage, {}),
    },
]);
export default function Root(_props) {
    return _jsx(RouterProvider, { router: router });
}
