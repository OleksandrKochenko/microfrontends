import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
const initialState = {
    loadingVendors: true,
    vendors: [],
    selectedVendor: undefined,
};
export default function VendorPage(_props) {
    const { vendorId } = useParams();
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const { loadingVendors, vendors, selectedVendor } = state;
    React.useEffect(() => {
        if (loadingVendors) {
            fetch("/api/vendors")
                .then((response) => response.json())
                .then((data) => {
                dispatch({ type: "newVendors", data });
            });
        }
    }, [loadingVendors]);
    React.useEffect(() => {
        if ((selectedVendor === undefined && vendorId !== undefined) ||
            (selectedVendor && vendorId !== selectedVendor.id)) {
            fetch(`/api/vendors/${vendorId}`)
                .then((response) => response.json())
                .then((vendor) => {
                dispatch({ type: "selectVendor", vendor });
            });
        }
    }, [selectedVendor, vendorId]);
    return (_jsx("div", { children: _jsxs("div", { className: "flex", children: [_jsx("div", { className: "p-6 w-1/3", children: loadingVendors && vendors.length === 0 ? (_jsx("div", { children: "Loading ..." })) : (vendors.map((vendor) => (_jsx(Link, { className: "h-12 flex items-center border-t border-white cursor-pointer no-underline", to: `/vendors/${window.encodeURIComponent(vendor.id)}`, children: vendor.description }, vendor.id)))) }), _jsx("div", { className: "w-2/3 p-6 border-l-2 border-white", children: selectedVendor ? (_jsxs("div", { children: [_jsxs("div", { className: "flex", children: [_jsx("div", { className: "font-bold pr-6 w-40", children: "ID" }), _jsx("div", { children: selectedVendor.id })] }), _jsxs("div", { className: "flex", children: [_jsx("div", { className: "font-bold pr-6 w-40", children: "DESCRIPTION" }), _jsx("div", { children: selectedVendor.description })] })] })) : (_jsx("div", { children: "No one selected" })) })] }) }));
}
function reducer(state, action) {
    switch (action.type) {
        case "loadingVendors":
            return { ...state, loadingVendors: true };
        case "selectVendor":
            return { ...state, selectedVendor: action.vendor };
        case "newVendors":
            return { ...state, vendors: action.data, loadingVendors: false };
        default:
            throw new Error(`Unknown action type '${action.type}'`);
    }
}
