import React, { useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "@/context/GlobalContext";
import StripeCheckout from "react-stripe-checkout";
import { FaCcAmazonPay } from "react-icons/fa";
import { FaCcPaypal } from "react-icons/fa6";
import Sub from "@/components/common/sub";

const CheckOut = () => {
  const { bookingData } = useContext(GlobalContext); // Получаем данные бронирования из контекста
  const publishableKey =
    "pk_test_51OkuxcGezhrpHtHsTwcCLYYLOyRKuix2BxtNXLolGhkdJykXFX7ZUIdQzWfVxM9OMygZeFYYZgxlDULO4adgAWQY003r8valPM";

  const [paymentStatus, setPaymentStatus] = useState(null);

  const processPayment = async () => {
    try {
      const paymentResponse = await axios.post(
        "http://localhost:8000/payment",
        {
          amount: bookingData.total_price * 100, // Используем данные о стоимости из bookingData
          // Добавьте любые другие необходимые данные для платежа
        }
      );

      if (paymentResponse.status === 200) {
        setPaymentStatus("success");
      } else {
        setPaymentStatus("failure");
      }
    } catch (error) {
      console.error(error);
      setPaymentStatus("failure");
    }
  };

  return (
    <>
      <section className=" py-20">
        <div className="wrapper">
          <div className=" flex justify-center items-center flex-col gap-4">
            <div className=" flex gap-2  items-center">
              <h1 className=" font-bold text-3xl">Pay with your card</h1>
              <span className=" text-blue-600 text-3xl">
                <FaCcPaypal />
              </span>
            </div>
            <div>
              {paymentStatus === "success" && <p>Payment successful!</p>}
              {paymentStatus === "failure" && (
                <p>Payment failed. Please try again.</p>
              )}
              <StripeCheckout
                stripeKey={publishableKey}
                label="Pay Now"
                name="Pay With Credit Card"
                billingAddress
                shippingAddress
                description={`Your total is $${bookingData.total_price}`}
                amount={bookingData.total_price * 100}
                token={processPayment}
              />
            </div>
            <div>
              <img
                src="https://imgs.search.brave.com/peY-lwxPmoIkNWjvv2LI_AClieNwJ_HS_BPdIuWt_nU/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9hZ2Vu/dGVzdHVkaW8uY29t/L3VwbG9hZHMvcG9z/dC9pbWFnZS8xMDkv/bWFpbl9DaGVja291/dF9tb2JpbGUucG5n"
                alt=""
              />
            </div>
          </div>
          <Sub />
        </div>
      </section>
    </>
  );
};

export default CheckOut;
