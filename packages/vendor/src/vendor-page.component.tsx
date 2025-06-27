import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

interface Vendor {
  id: string;
  description: string;
}

type State = {
  loadingVendors: boolean;
  vendors: Vendor[];
  selectedVendor?: Vendor;
};

type Action =
| { type: "loadingVendors" }
| { type: "selectVendor"; vendor: Vendor }
| { type: "newVendors"; data: Vendor[] };

const initialState: State = {
  loadingVendors: true,
  vendors: [],
  selectedVendor: undefined,
};

export default function VendorPage(_props: Record<string, unknown>) {
  const { vendorId } = useParams<{ vendorId: string }>();

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { loadingVendors, vendors, selectedVendor } = state;

  React.useEffect(() => {
    if (loadingVendors) {
      fetch("/api/vendors")
        .then((response) => response.json())
        .then((data: Vendor[]) => {
          dispatch({ type: "newVendors", data });
        });
    }
  }, [loadingVendors]);

  React.useEffect(() => {
    if (
      (selectedVendor === undefined && vendorId !== undefined) ||
      (selectedVendor && vendorId !== selectedVendor.id)
    ) {
      fetch(`/api/vendors/${vendorId}`)
        .then((response) => response.json())
        .then((vendor: Vendor) => {
          dispatch({ type: "selectVendor", vendor });
        });
    }
  }, [selectedVendor, vendorId]);

  return (
    <div>
      <div className="flex">
        <div className="p-6 w-1/3">
          {loadingVendors && vendors.length === 0 ? (
            <div>Loading ...</div>
          ) : (
            vendors.map((vendor) => (
              <Link
                key={vendor.id}
                className="h-12 flex items-center border-t border-white cursor-pointer no-underline"
                to={`/vendors/${window.encodeURIComponent(vendor.id)}`}
              >
                {vendor.description}
              </Link>
            ))
          )}
        </div>
        <div className="w-2/3 p-6 border-l-2 border-white">
          {selectedVendor ? (
            <div>
              <div className="flex">
                <div className="font-bold pr-6 w-40">ID</div>
                <div>{selectedVendor.id}</div>
              </div>
              <div className="flex">
                <div className="font-bold pr-6 w-40">DESCRIPTION</div>
                <div>{selectedVendor.description}</div>
              </div>
            </div>
          ) : (
            <div>No one selected</div>
          )}
        </div>
      </div>
    </div>
  );
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "loadingVendors":
      return { ...state, loadingVendors: true };
    case "selectVendor":
      return { ...state, selectedVendor: action.vendor };
    case "newVendors":
      return { ...state, vendors: action.data, loadingVendors: false };
    default:
      throw new Error(`Unknown action type '${(action as any).type}'`);
  }
}
