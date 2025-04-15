
import { useEffect, useState, useContext } from "react";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { ContextObj } from "../../store/Context";
import { firestore } from "../../firebase/dbcon";

const OrderHistory = () => {
  const { auth } = useContext(ContextObj);
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth?.uid) return;

      const userRef = doc(firestore, "users", auth.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        if (userData.orders) {
          setOrders(userData.orders);
        }
      }
    };

    fetchOrders();
  }, [auth?.uid]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">🧾 Your order record</h1>
      {orders?.length === 0 ? (
        <p className="text-center text-gray-500">No order record</p>
      ) : (
        <div className="space-y-6">
          {orders?.map((order, index) => (
            <div key={index} className="border border-gray-300 rounded-lg p-4 shadow-sm bg-white">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600">Order No.: {order.id}</span>
                <span className="text-sm text-gray-600">Date: {new Date(order.create_time).toLocaleString()}</span>
              </div>

              <div className="text-sm text-gray-800 font-medium mb-2">
                👤 {auth?.displayName} ({auth?.email})
              </div>

              <div className="divide-y divide-gray-200">

                {Array.isArray(order.items) && order.items.map((item: any, idx: number) => {
                  const name = item?.name || "Unknown Product";
                  const quantity = item?.quantity || 0;
                  const price = Number(item?.unit_amount?.value || 0).toFixed(2);

                  return (
                    <div key={idx} className="py-2 flex justify-between">
                      <div>
                        <p className="font-semibold">{name}</p>
                        <p className="text-sm text-gray-500">Quantity: {quantity}</p>
                      </div>
                      <div className="text-right">
                        <p>${price}</p>
                      </div>
                    </div>
                  );
                })}              </div>

              <div className="text-right mt-4 font-bold text-gray-900">
                Total Price：${Number(order.amount.value).toFixed(2)} {order.amount.currency_code}

              </div>
              <div className="text-right mt-4 font-bold text-gray-900">
                Address：{order.shipping.address.address_line_1}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/"
          className="text-blue-600 underline hover:text-blue-800 text-sm"
        >
          ⬅ Back Home
        </Link>
      </div>
    </div>
  );
};

export default OrderHistory;
