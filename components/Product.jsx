import React, { useState } from "react";
import {
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Button,
  ButtonGroup,
  Stack,
  Avatar,
} from "@mui/material";
import { urlFor } from "../lib/client";
// import Image from "next/image";
import useStateContext from "../context/StateContext";

const Product = ({ product }) => {
  const [qty, setQty] = useState(1);
  const { handleAddToCart } = useStateContext()

  const increaseQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decreaseQty = () => {
    if (qty == 1) return;
    setQty((prevQty) => prevQty - 1);
  };
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <img
          width={200}
          height={200}
          src={urlFor(product.image[0])}
          layout="responsive"
        />

        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            sx={{ fontWeight: "semi-bold" }}
            component="div"
          >
            {product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.details}
          </Typography>
        </CardContent>
        <CardContent>
          <Stack direction="row" spacing={8} marginLeft=".35rem">
            <Typography color="dark" variant="span" fontSize="3rem">
              {product.price}$
            </Typography>
            <ButtonGroup variant="none" aria-label="text button group">
              <Button onClick={decreaseQty}>-</Button>
              <Button>
                <Typography variant="span" fontSize="1.25rem">
                  {qty}
                </Typography>
              </Button>
              <Button onClick={increaseQty}>+</Button>
            </ButtonGroup>
          </Stack>
        </CardContent>
        <CardActions>
          <Stack
            direction="row"
            alignItems="center"
            spacing={3}
            marginLeft="1rem"
            marginBottom="1rem"
          >
            <Button
              sx={{ px: 2, py: 1 }}
              size="small"
              variant="outlined"
              onClick={() => handleAddToCart(product, qty)}
            >
              Add to Cart
            </Button>
            <Button sx={{ px: 2, py: 1 }} size="small" variant="contained">
              Buy Now
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </div>
  );
};

export default Product;
