import StripeCheckout from "react-stripe-checkout";
import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

function Stripe() {
  const publishableKey =
    "pk_test_51OkuxcGezhrpHtHsTwcCLYYLOyRKuix2BxtNXLolGhkdJykXFX7ZUIdQzWfVxM9OMygZeFYYZgxlDULO4adgAWQY003r8valPM";
  const [product, setProduct] = useState({
    name: "Headphone",
    price: 5,
  });
  const priceForStripe = product.price * 100;

  const handleSuccess = () => {
    console.log("ugurludu");
  };
  const handleFailure = () => {
    console.log("ugursuz");
  };
  const payNow = async (token) => {
    try {
      const response = await axios({
        url: "http://localhost:8000/payment",
        method: "post",
        data: {
          amount: product.price * 100,
          token,
        },
      });
      if (response.status === 200) {
        handleSuccess();
        toast.success("isledi")
      }
    } catch (error) {
      handleFailure();
      toast.error("islemedi")
      console.log(error);
    }
  };

  return (
    <div className="container">
      <h2>Complete React & Stripe payment integration</h2>
      <p>
        <span>Product: </span>
        {product.name}
      </p>
      <p>
        <span>Price: </span>${product.price}
      </p>
      <StripeCheckout
        stripeKey={publishableKey}
        label="Pay Now"
        name="Pay With Credit Card"
        billingAddress
        shippingAddress
        amount={priceForStripe}
        description={`Your total is $${product.price}`}
        token={payNow}
      />
    </div>
  );
}

export default Stripe;
