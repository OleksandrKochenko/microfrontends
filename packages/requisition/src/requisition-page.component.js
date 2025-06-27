import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
const initialState = {
    loadingRequisitions: true,
    requisitions: [],
    selectedRequisition: undefined,
};
export default function RequisitionPage(_props) {
    const { requisitionId } = useParams();
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const { loadingRequisitions, requisitions, selectedRequisition } = state;
    React.useEffect(() => {
        if (loadingRequisitions) {
            fetch("/api/requisitions")
                .then((response) => response.json())
                .then((data) => {
                dispatch({ type: "newRequisitions", data });
            });
        }
    }, [loadingRequisitions]);
    React.useEffect(() => {
        if ((selectedRequisition === undefined && requisitionId !== undefined) ||
            (selectedRequisition && requisitionId !== selectedRequisition.id)) {
            fetch(`/api/requisitions/${requisitionId}`)
                .then((response) => response.json())
                .then((requisition) => {
                dispatch({ type: "selectRequisition", requisition });
            });
        }
    }, [selectedRequisition, requisitionId]);
    return (_jsx("div", { children: _jsxs("div", { className: "flex", children: [_jsx("div", { className: "p-6 w-1/3", children: loadingRequisitions && requisitions.length === 0 ? (_jsx("div", { children: "Loading ..." })) : (requisitions.map((requisition) => (_jsx(Link, { className: "h-12 flex items-center border-t border-white cursor-pointer no-underline", to: `/requisitions/${window.encodeURIComponent(requisition.id)}`, children: requisition.description }, requisition.id)))) }), _jsx("div", { className: "w-2/3 p-6 border-l-2 border-white", children: selectedRequisition ? (_jsxs("div", { children: [_jsxs("div", { className: "flex", children: [_jsx("div", { className: "font-bold pr-6 w-40", children: "ID" }), _jsx("div", { children: selectedRequisition.id })] }), _jsxs("div", { className: "flex", children: [_jsx("div", { className: "font-bold pr-6 w-40", children: "DESCRIPTION" }), _jsx("div", { children: selectedRequisition.description })] })] })) : (_jsx("div", { children: "No one selected" })) })] }) }));
}
function reducer(state, action) {
    switch (action.type) {
        case "loadingRequisitions":
            return { ...state, loadingRequisitions: true };
        case "selectRequisition":
            return { ...state, selectedRequisition: action.requisition };
        case "newRequisitions":
            return { ...state, requisitions: action.data, loadingRequisitions: false };
        default:
            throw new Error(`Unknown action type '${action.type}'`);
    }
}
