import React, { useEffect } from "react";
import { client } from "../lib/client";
import { Product } from "../components";
import { Grid, Container } from "@mui/material";
import useStateContext from "../context/StateContext";

const Home = ({ products }) => {
  const { setShowCart } = useStateContext()
  useEffect(() => {
    setShowCart(true);
  }, []);

  return (
    <>
      <Container>
        <Grid container spacing={4}>
          {products.length > 0 &&
            products?.map((product) => {
              return (
                <Grid key={product._id} item xs={12} sm={6} lg={4}>
                  <Product key={product._id} product={product} />
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
};

export default Home;

const getStaticProps = async () => {
  const query = `*[_type == "product" ]`;
  const products = await client.fetch(query);

  

  return {
    props: {
      products,
    },
  };
};

export { getStaticProps };
