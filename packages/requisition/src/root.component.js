import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RequisitionPage from "./requisition-page.component";
const router = createBrowserRouter([
    {
        path: "/requisitions/:requisitionId",
        element: _jsx(RequisitionPage, {}),
    },
    {
        path: "/requisitions",
        element: _jsx(RequisitionPage, {}),
    }
]);
export default function Root(_props) {
    return _jsx(RouterProvider, { router: router });
}
