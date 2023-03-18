import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./store/cart-actions";
// import { uiActions } from "./store/ui-slice";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    // const sendCartData = async () => {
    // commented it to implement redux-thunk
    // dispatch(
    //   uiActions.showNotification({
    //     status: "pending",
    //     title: "Sending...",
    //     message: "Sending your cart data to the server...",
    //   })
    // );
    // const response = await fetch(
    //   "https://redux-car-49417-default-rtdb.firebaseio.com/cart.json",
    //   {
    //     method: "PUT",
    //     body: JSON.stringify(cart),
    //   }
    // );
    // if (!response.ok) {
    //   throw new Error("Sending cart data is failed.!");
    // }
    // dispatch(
    //   uiActions.showNotification({
    //     status: "success",
    //     title: "Success!",
    //     message: "Your cart data has been sent to the server successfully.",
    //   })
    // );
    // };

    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
    // sendCartData().catch((error) => {
    // dispatch(
    //   uiActions.showNotification({
    //     status: "error",
    //     title: "Error!",
    //     message: "There was an error sending your cart data to the server.",
    //   })
    // );
    // });
  }, [cart, dispatch]);
  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
