import { Box, Button, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import CartOrder from "../components/CartOrder";
import formatImageUrl from "../utils/formatImageUrl";
import formatPrice from "../utils/formatPrice";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import ProductionQuantityLimitsRoundedIcon from "@mui/icons-material/ProductionQuantityLimitsRounded";
import { clearCart } from "../features/cartSlice";
import { toast } from "react-toastify";


const Cart = ({ baseUrl }) => {
  const state = useSelector((state) => state.cart);
  const { back, push } = useRouter();
  const dispatch = useDispatch();

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 1,
        }}
      >
        <IconButton onClick={() => back()} sx={{ mr: 2 }}>
          <ArrowBackRoundedIcon sx={{ color: "dark.main" }} />
        </IconButton>
        <Typography
          sx={{
            color: "dark.main",
            textAlign: "center",
            flex: 1,
            fontSize: 18,
          }}
        >
          Cart ({`${state.quantity || 0} items`})
        </Typography>
        {state.products.length !== 0 && (
          <Button
            variant="outlined"
            color="danger"
            onClick={() => {
              dispatch(clearCart());
              toast.info("Cart cleared!");
            }}
          >
            Clear cart <ClearRoundedIcon />
          </Button>
        )}
      </Box>

      {state.products.length === 0 ? (
        <Box
          sx={{
            height: "50vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography sx={{ fontSize: 24, color: "dark.main" }}>
            Cart is empty!
          </Typography>
          <ProductionQuantityLimitsRoundedIcon
            fontSize="large"
            sx={{ color: "danger.main" }}
          />
        </Box>
      ) : (
        <>
          {state?.products.map(
            ({ image, title, price, quantity, productId }) => {
              return (
                <Box
                  sx={{
                    display: "flex",
                    mx: "auto",
                    my: 2,
                    height: "max-content",
                    width: { xs: "max-content", sm: "90%" },
                    maxWidth: { sm: "900px" },
                    p: 2,
                    boxShadow: "0 0 1px 1px rgba(0, 0, 0, 0.1)",
                  }}
                  key={productId?.current}
                >
                  <Box
                    sx={{
                      width: { xs: "100px", sm: "150px" },
                      height: { xs: "100px", sm: "150px" },
                      borderRadius: 2,
                      backgroundColor: "light.main",
                    }}
                  >
                    <img
                      src={image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "inherit",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      ml: 2,
                      display: {
                        sm: "flex",
                        alignItems: "center",
                        flex: 1,
                        justifyContent: "space-between",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "dark.main",
                        textTransform: "capitalize",
                        mt: { sm: 0.5 },
                        fontSize: { xs: 16, sm: 20 },
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography
                      sx={{
                        mb: { xs: 1 },
                        mt: { sm: 1.5, xs: 0.5 },
                        mx: 1,
                        fontSize: { xs: 15, sm: 19 },
                        color: "dark.main",
                      }}
                    >
                      ${formatPrice(price)}
                    </Typography>

                    <CartOrder
                      image={image}
                      productId={productId}
                      title={title}
                      price={price}
                      quantity={quantity}
                    />
                  </Box>
                </Box>
              );
            }
          )}

          <Box sx={{ textAlign: "center", my: 2 }}>
            <Typography sx={{ color: "dark.main" }}>Sub-Total</Typography>
            <Typography sx={{ color: "dark.main" }}>
              {state.subTotal}
            </Typography>
          </Box>

          <Button
            variant="contained"
            sx={{
              mx: "auto",
              display: "flex",
              width: "max-content",
              alignItems: "center",
              my: 2,
              px: 3,
            }}
            color="success"
            onClick={() => {
              push("/checkout");
            }}
          >
            Checkout
            <ShoppingCartCheckoutRoundedIcon fontSize="small" sx={{ ml: 2 }} />
          </Button>
        </>
      )}
    </Box>
  );
};

export default Cart;

export const getServerSideProps = async () => {
  return {
    props: {
      baseUrl: process.env.BASE_URL,
    },
  };
};
