import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

interface Requisition {
  id: string;
  description: string;
}

type State = {
  loadingRequisitions: boolean;
  requisitions: Requisition[];
  selectedRequisition?: Requisition;
};

type Action =
| { type: "loadingRequisitions" }
| { type: "selectRequisition"; requisition: Requisition }
| { type: "newRequisitions"; data: Requisition[] };

const initialState: State = {
  loadingRequisitions: true,
  requisitions: [],
  selectedRequisition: undefined,
};

export default function RequisitionPage(_props: Record<string, unknown>) {
  const { requisitionId } = useParams<{ requisitionId: string }>();

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { loadingRequisitions, requisitions, selectedRequisition } = state;

  React.useEffect(() => {
    if (loadingRequisitions) {
      fetch("/api/requisitions")
        .then((response) => response.json())
        .then((data: Requisition[]) => {
          dispatch({ type: "newRequisitions", data });
        });
    }
  }, [loadingRequisitions]);

  React.useEffect(() => {
    if (
      (selectedRequisition === undefined && requisitionId !== undefined) ||
      (selectedRequisition && requisitionId !== selectedRequisition.id)
    ) {
      fetch(`/api/requisitions/${requisitionId}`)
        .then((response) => response.json())
        .then((requisition: Requisition) => {
          dispatch({ type: "selectRequisition", requisition });
        });
    }
  }, [selectedRequisition, requisitionId]);

  return (
    <div>
      <div className="flex">
        <div className="p-6 w-1/3">
          {loadingRequisitions && requisitions.length === 0 ? (
            <div>Loading ...</div>
          ) : (
            requisitions.map((requisition) => (
              <Link
                key={requisition.id}
                className="h-12 flex items-center border-t border-white cursor-pointer no-underline"
                to={`/requisitions/${window.encodeURIComponent(requisition.id)}`}
              >
                {requisition.description}
              </Link>
            ))
          )}
        </div>
        <div className="w-2/3 p-6 border-l-2 border-white">
          {selectedRequisition ? (
            <div>
              <div className="flex">
                <div className="font-bold pr-6 w-40">ID</div>
                <div>{selectedRequisition.id}</div>
              </div>
              <div className="flex">
                <div className="font-bold pr-6 w-40">DESCRIPTION</div>
                <div>{selectedRequisition.description}</div>
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
    case "loadingRequisitions":
      return { ...state, loadingRequisitions: true };
    case "selectRequisition":
      return { ...state, selectedRequisition: action.requisition };
    case "newRequisitions":
      return { ...state, requisitions: action.data, loadingRequisitions: false };
    default:
      throw new Error(`Unknown action type '${(action as any).type}'`);
  }
}
