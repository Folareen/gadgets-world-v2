import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  subTotal: 0.0,
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    getStoredCart: (state, action) => {
      state.products = action.payload.products;
      state.quantity = action.payload.quantity;
      state.subTotal = action.payload.subTotal;
    },
    addProduct: (state, action) => {
      const productToAdd = action.payload.state.products.find((product) => {
        return product.productId == action.payload.productDetails.productId;
      });

      if (productToAdd) {
        const productToAddIndex = action.payload.state.products.findIndex(
          (product) => {
            return product.productId == action.payload.productDetails.productId;
          }
        );
        let productsArr = [...action.payload.state.products];
        productsArr[productToAddIndex] = action.payload.productDetails;

        const newCart = {
          products: productsArr,
          quantity:
            action.payload.state.quantity +
            action.payload.productDetails.quantity -
            productToAdd.quantity,
          subTotal: (
            Number(action.payload.state.subTotal) -
            Number(productToAdd.quantity * productToAdd.price) +
            Number(
              action.payload.productDetails.quantity *
                action.payload.productDetails.price
            )
          ).toFixed(2),
        };
        state.products = newCart.products;
        state.quantity = newCart.quantity;
        state.subTotal = newCart.subTotal;

        localStorage.removeItem("cart");
        localStorage.setItem("cart", JSON.stringify(newCart));
      } else {
        const newCart = {
          products: [
            ...action.payload.state.products,
            action.payload.productDetails,
          ],
          quantity:
            action.payload.productDetails.quantity +
            action.payload.state.quantity,
          subTotal: (
            Number(action.payload.state.subTotal) +
            Number(
              action.payload.productDetails.quantity *
                action.payload.productDetails.price
            )
          ).toFixed(2),
        };
        state.products = newCart.products;
        state.quantity = newCart.quantity;
        state.subTotal = newCart.subTotal;

        localStorage.removeItem("cart");
        localStorage.setItem("cart", JSON.stringify(newCart));
      }
    },
    removeProduct: (state, action) => {
      const productToRemove = action.payload.state.products.find((product) => {
        return product.productId == action.payload.productDetails.productId;
      });

      const productToRemoveIndex = action.payload.state.products.findIndex(
        (product) => {
          return product.productId == action.payload.productDetails.productId;
        }
      );
      let productsArr = [...action.payload.state.products];
      productsArr.splice(productToRemoveIndex, 1);

      const newCart = {
        products: productsArr,
        quantity: action.payload.state.quantity - productToRemove.quantity,
        subTotal: (
          Number(action.payload.state.subTotal) -
          Number(productToRemove.quantity * productToRemove.price)
        ).toFixed(2),
      };
      state.products = newCart.products;
      state.quantity = newCart.quantity;
      state.subTotal = newCart.subTotal;

      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(newCart));
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.subTotal = 0.0;
      localStorage.removeItem("cart");
      localStorage.setItem("cart", JSON.stringify(initialState));
    },
  },
});

export const { getStoredCart, addProduct, removeProduct, clearCart } =
  cart.actions;
export default cart.reducer;
