import React from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

interface Order {
  id: string;
  description: string;
}

type State = {
  loadingOrders: boolean;
  orders: Order[];
  selectedOrder?: Order;
};

type Action =
  | { type: "loadingOrders" }
  | { type: "selectOrder"; order: Order }
  | { type: "newOrders"; data: Order[] };

const initialState: State = {
  loadingOrders: true,
  orders: [],
  selectedOrder: undefined,
};

export default function OrderPage(_props: Record<string, unknown>) {
  const { orderId } = useParams<{ orderId: string }>();

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { loadingOrders, orders, selectedOrder } = state;

  React.useEffect(() => {
    if (loadingOrders) {
      fetch("/api/orders")
        .then((response) => response.json())
        .then((data: Order[]) => {
          dispatch({ type: "newOrders", data });
        });
    }
  }, [loadingOrders]);

  React.useEffect(() => {
    if (
      (selectedOrder === undefined && orderId !== undefined) ||
      (selectedOrder && orderId !== selectedOrder.id)
    ) {
      fetch(`/api/orders/${orderId}`)
        .then((response) => response.json())
        .then((order: Order) => {
          dispatch({ type: "selectOrder", order });
        });
    }
  }, [selectedOrder, orderId]);

  return (
    <div>
      <div className="flex">
        <div className="p-6 w-1/3">
          {loadingOrders && orders.length === 0 ? (
            <div>Loading orders..!</div>
          ) : (
            orders.map((order) => (
              <Link
                key={order.id}
                className="h-12 flex items-center border-t border-white cursor-pointer no-underline"
                to={`/requisitions/${window.encodeURIComponent(order.id)}`}
              >
                {order.description}
              </Link>
            ))
          )}
        </div>
        <div className="w-2/3 p-6 border-l-2 border-white">
          {selectedOrder ? (
            <div>
              <div className="flex">
                <div className="font-bold pr-6 w-40">ID</div>
                <div>{selectedOrder.id}</div>
              </div>
              <div className="flex">
                <div className="font-bold pr-6 w-40">DESCRIPTION</div>
                <div>{selectedOrder.description}</div>
              </div>
            </div>
          ) : (
            <div>No one order selected!</div>
          )}
        </div>
      </div>
    </div>
  );
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "loadingOrders":
      return { ...state, loadingOrders: true };
    case "selectOrder":
      return { ...state, selectedOrder: action.order };
    case "newOrders":
      return {
        ...state,
        orders: action.data,
        loadingOrders: false,
      };
    default:
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error(`Unknown action type '${(action as any).type}'`);
  }
}
