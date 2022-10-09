import * as React from "react";
import {
  Card,
  CardContent,
  ButtonGroup,
  Typography,
  Stack,
  Button,
  CardActions,
} from "@mui/material";
import { urlFor } from "../lib/client";
import useStateContext from "../context/StateContext";
// import Image from "next/image";

const CartItem = ({ item }) => {
  const { removeFromCart, toggleQuantityFromCart } = useStateContext();
  
  return (
    <Card width="40%">
      <Stack
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <img
          width={200}
          height={200}
          src={urlFor(item.image && item.image[0])}
          layout="responsive"
        />
        <CardContent>
          <Typography
            variant="h5"
            sx={{ fontWeight: "semi-bold", pl: 1 }}
            component="div"
          >
            {item.name}
          </Typography>
          <CardContent paddingY="0px">
            <Stack direction='row'
            //   sx={{
            //     display: "flex",
            //     flexDirection: { xs: "column", sm: "row" },
            //   }}
              spacing={8}
              paddingY="0px"
            >
              <Typography
                color="dark"
                variant="span"
                fontSize="3rem"
                paddingY="0px"
              >
                {item.price}$
              </Typography>
              <ButtonGroup
                variant="none"
                aria-label="text button group"
                paddingY="0px"
              >
                <Button onClick={() => toggleQuantityFromCart(item._id, "DEC")}>
                  -
                </Button>
                <Button>
                  <Typography variant="span" fontSize="1.25rem">
                    {item.quantity}
                  </Typography>
                </Button>
                <Button onClick={() => toggleQuantityFromCart(item._id, "INC")}>
                  +
                </Button>
              </ButtonGroup>
            </Stack>
          </CardContent>
          <CardActions>
            <Stack
              direction="row"
              alignItems="center"
              spacing={3}
              marginBottom="1rem"
            >
              <Button
                sx={{ px: 2, py: 1 }}
                size="small"
                variant="contained"
                onClick={() => removeFromCart(item._id)}
              >
                Remove
              </Button>
            </Stack>
          </CardActions>
        </CardContent>
      </Stack>
    </Card>
  );
};

export default CartItem;

// const columns = [
//   { field: "Name", headerName: "Name", width: 130 },
//   { field: "Price", headerName: "Price", width: 130 },
//   {
//     field: "quantity",
//     headerName: "Quantity",
//     type: "number",
//     width: 90,
//   },
// ];

// const rows = [
//   { Name: "Snow", Price: "Jon", quantity: 35 },
//   { Name: "Lannister", Price: "Cersei", quantity: 42 },
//   { Name: "Lannister", Price: "Jaime", quantity: 45 },
//   { Name: "Stark", Price: "Arya", quantity: 16 },
//   { Name: "Targaryen", Price: "Daenerys", quantity: null },
//   { Name: "Melisandre", Price: null, quantity: 150 },
//   { Name: "Clifford", Price: "Ferrara", quantity: 44 },
//   { Name: "Frances", Price: "Rossini", quantity: 36 },
//   { Name: "Roxie", Price: "Harvey", quantity: 65 },
// ];

// const newRows = cartItems.map()
// const CartItem = ({ item }) => {
//   return (
//     <>
//       <DataGrid rows={rows} columns={columns}></DataGrid>
//     </>
//   );
// };

// export default CartItem;
