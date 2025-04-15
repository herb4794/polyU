import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../header/Header'
import CartCard from './CartCard'
import { ContextObj } from '../../store/Context'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { PayPalButtons, PayPalButtonsComponentProps } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions, OnApproveData, OnApproveActions } from "@paypal/paypal-js/types/components/buttons"
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../../firebase/dbcon'
const Cart = () => {
  const navigate = useNavigate();
  const context = useContext(ContextObj)
  const { loginStatus, auth } = context

  const [initOrderArr, setInitOrderArr] = useState<any[]>(() => {
    return JSON.parse(localStorage.getItem('order') || '[]')
  });
  const removeOrderArrFunc = (index: number) => {
    const currentOrder = JSON.parse(localStorage.getItem("order") || "[]");
    const updatedOrder = currentOrder.filter((_: any, i: number) => i !== index);
    localStorage.setItem("order", JSON.stringify(updatedOrder));
    setInitOrderArr(updatedOrder); // 觸發 UI 更新
  };

  const updateQuantity = (index: number, newQty: number) => {
    const updatedArr = [...initOrderArr];
    updatedArr[index].quantity = newQty;

    localStorage.setItem("order", JSON.stringify(updatedArr));
    setInitOrderArr(updatedArr);
  };

  const totalPrice = initOrderArr.reduce((total, item) => {
    return total + Number(item.product_discount) * Number(item.quantity);
  }, 0);

  const createObject: PayPalButtonsComponentProps["createOrder"] = (data, actions) => {
    return actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "HKD",
            value: totalPrice.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: "HKD",
                value: totalPrice.toFixed(2),
              },
            },
          },
          items: initOrderArr.map((item: any) => ({
            name: item.product_en_name?.toString() || "Unnamed",
            quantity: item.quantity?.toString() || "1",
            description: item.product_desc?.toString() || "No description",
            unit_amount: {
              currency_code: "HKD",
              value: Number(item.product_discount).toFixed(2),
            },
            category: "PHYSICAL_GOODS"
          })),
        },
      ],
      application_context: {
        shipping_preference: "GET_FROM_FILE"
      }
    });
  }
  const onApprove: PayPalButtonsComponentProps['onApprove'] = async (data: OnApproveData, actions: OnApproveActions) => {
    const orderDatas = await actions.order?.capture();

    if (
      orderDatas &&
      orderDatas.status === "COMPLETED" &&
      orderDatas.purchase_units?.[0]?.payments?.captures?.[0]?.status === "COMPLETED"
    ) {
      const orderId = orderDatas.id;
      const captureInfo = orderDatas.purchase_units[0].payments.captures[0];
      const purchasedItems = orderDatas.purchase_units[0].items;
      const amount = orderDatas.purchase_units[0].amount;
      const createTime = captureInfo.create_time;
      const payer = orderDatas.payer;

      const orderRecord = {
        id: orderId,
        items: purchasedItems,
        amount: amount,
        capture_id: captureInfo.id,
        create_time: createTime,
        payer: {
          email: payer?.email_address,
          name: payer?.name?.given_name + " " + payer?.name?.surname
        },
        shipping: {
          name: orderDatas?.purchase_units?.[0]?.shipping?.name?.full_name,
          address: orderDatas?.purchase_units?.[0]?.shipping?.address
        }
      };

      const userRef = doc(firestore, "users", auth.uid);

      try {
        await updateDoc(userRef, {
          orders: arrayUnion(orderRecord)
        });
        console.log("✅ The order has been saved Firebase");
        localStorage.removeItem("order");
        setInitOrderArr([]);
        toast.success("Payment successful! The order has been upload 🎉", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate("/thankyou");
        }, 2000);
      } catch (err) {
        console.error("❌ The order has been saved Firebase Error", err);
        toast.error("Order failed, please try again later");
      }
    }
  };

  useEffect(() => {
    console.log(initOrderArr)
  }, [initOrderArr])
  return (

    <div>
      <Header />
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">Shopping Cart</h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {initOrderArr.length > 0 ? (
                  initOrderArr.map((item: any, index: number) => (
                    <CartCard key={index} {...item} index={index} onRemove={removeOrderArrFunc} onQuantityChange={updateQuantity} />
                  ))
                ) : (
                  <p>No items in cart</p>
                )}

              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">${totalPrice.toFixed(2)}</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                      <dd className="text-base font-medium text-green-600">-$0.0</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Store Pickup</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">$0</dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                      <dd className="text-base font-medium text-gray-900 dark:text-white">$0</dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                    <dd className="text-base font-bold text-gray-900 dark:text-white">${totalPrice.toFixed(2)}</dd>
                  </dl>
                </div>

                {loginStatus ? (
                  <div className="mt-4">
                    <PayPalButtons createOrder={createObject} onApprove={onApprove} />
                  </div>
                ) : (
                  <button
                    disabled
                    className="flex w-full items-center justify-center rounded-lg bg-red-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:hover:bg-red-700 dark:focus:ring-red-800"
                  >
                    Please login first
                  </button>
                )}
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> or </span>
                  <Link to="/" title="" className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                    Continue Shopping
                    <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                    </svg>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Cart
