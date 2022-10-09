import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const cartData = req.body;
    console.log(cartData);
    try {
      const params = {
        mode: "payment",
        line_items: cartData.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/mb6s0fi9/production/"
            )
            .replace("-webp", ".webp");

          return {
            price_data: {
              currency: "usd",
              unit_amount: item.price * 100,
              product_data: {
                name: item.name,
                images: [newImage],
              },
            },
            quantity: item.quantity,
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
        payment_method_types: ["card"],
        billing_address_collection: "auto",
        shipping_options: [{ shipping_rate: "shr_1Lr1VoSHL1dePUvn7YcwxLkc" }],
      };
      console.log("PARAMS------------------", params);
      const session = await stripe.checkout.sessions.create(params); //create a session.
      console.log("SESSION======================", session);
      res.status(200).json(session);
    } catch (error) {
      res.status(500).json({
        message: error.message,
        statusCode: 500,
      });
    }
  }
}
