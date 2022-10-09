import React, { useEffect } from "react";
import useStateContext from "../context/StateContext";
import {
  Container,
  Card,
  Typography,
  Grid,
  Button,
  Stack,
} from "@mui/material";
import { CartItem } from "../components";
import Link from "next/link";
import getStripe from "../lib/getStripe";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    cartItems,
    totalPrice,
    showCart,
    checkout,
    setShowCart,
    totalQuantitites,
  } = useStateContext();
  useEffect(() => setShowCart(false), []);
//handleCheckout
const handleCheckout = async () => {
  const stripe = await getStripe();
  const response = await fetch('/api/stripe/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cartItems)
  })
  const data = await response.json();
  if( data.statusCode === 500) return;

  
  // console.log(data)
  toast.loading('Redirecting...')
  
  stripe.redirectToCheckout({
    sessionId: data.id
  })
}


  const EmptyCart = () => {
    return (
      <Container maxWidth="200px">
        <Grid>
          <Typography variant="h2">
            No items in cart.  
            <Link
              href="/"
              
            >
              <a style={{paddingLeft:'15px', textDecoration: "underline", color: "blue" }}>Start shopping now</a>
            </Link>
          </Typography>
        </Grid>{" "}
      </Container>
    );
  };

  const RenderCart = () => {
    return (
      <>
        <Container>
          <Stack direction="row" alignItems="center" marginBottom="2rem">
            <Typography
              color="rgb(60 64 67)"
              variant="h1"
              fontSize="2.5rem"
              fontWeight="500"
            >
              Your Shopping Cart
            </Typography>
            <Typography fontStyle="italic" fontSize="1.5rem" marginLeft="2rem">
              ({totalQuantitites} items)
            </Typography>
          </Stack>

          <Grid container spacing={4} marginBottom="3rem">
            {cartItems.map((item) => {
              return (
                <Grid key={item._id} item xs={12} md={6}>
                  <CartItem item={item} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
        {checkout && (
          <Card sx={{ position: "absolute", top: "5rem", right: "10px " }}>
            <Typography
              variant="h1"
              fontSize="3rem"
              padding="1rem"
              fontWeight="400"
            >
              Checkout{" "}
            </Typography>
            <Grid
              container
              spacing={3}
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingY: "2rem",
                paddingRight: "4rem",
                paddingLeft: "1rem",
              }}
            >
              <Grid item>
                <Typography variant="h4" fontSize="1.55rem">
                  Subtotal: {totalPrice}${" "}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4" fontSize="1.55rem">
                  Vat: 10$
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h4" fontSize="1.55rem">
                  Total amount: {totalPrice + 10}$
                </Typography>
              </Grid>
              <Grid item>
                <Button color="primary" variant="contained" onClick={handleCheckout}>
                  Pay with Stripe
                </Button>
              </Grid>
            </Grid>
          </Card>
        )}
      </>
    );
  };

  return <>{cartItems.length > 0 ? <RenderCart /> : <EmptyCart />}</>;
};

export default Cart;
