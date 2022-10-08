import React, { useState } from "react";
import { Box, Typography, Toolbar, AppBar, Badge, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Link from "next/link";
import useStateContext from "../context/StateContext";
import { grey } from "@mui/material/colors";
// import { purple, red } from '@mui/material/colors';

const Navbar = () => {
  const {
    showCart,
    setShowCart,
    setCheckOut,
    checkout,
    totalPrice,
    totalQuantitites,
  } = useStateContext();

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link href="/">WebCommerce</Link>
            </Typography>
            {showCart ? (
              <Link href="/cart" >
                <Badge onClick={() => setShowCart(false)}
                  color="secondary"
                  badgeContent={totalQuantitites}
                  style={{ cursor: "pointer" }}
                >
                  <ShoppingCartIcon color="white" />
                </Badge>
              </Link>
            ) : ( totalQuantitites > 0 && 
              <Button variant="outlined" sx={{border:'1px solid white'}}  onClick={() => setCheckOut(!checkout)}>
                <Typography variant="span" color="white" fontSize='1rem'>
                  Checkout {totalPrice}$
                </Typography>
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
