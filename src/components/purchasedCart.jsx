// import React from "react";
// import { toast } from "react-hot-toast";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// async function PurchasedCart(error) {
//   const navigate = useNavigate;

//   if (error) {
//     toast.error("Problem checking out cart! Please try again!");
//   } else {
//     toast.success("You have checked out! Enjoy! Thanks!");
//   }
//   setTimeout(() => {
//     navigate("/");
//   }, 3000);
//   setCartItems([]);
//     async function RedirectHome() {
//       const navigate = useNavigate();

//       useEffect(() => {
//         const interval = setInterval(() => {
//           // Redirect to home page after 10 seconds
//           navigate("/");
//         }, 10000); // 10 seconds in milliseconds

//         // Clean up the interval when the component unmounts
//         return () => clearInterval(interval);
//       }, [navigate]);

//       return (
//         <div>
//           <h1>Redirecting you home! Enjoy!</h1>
//         </div>
//       );
//     }

//     RedirectHome();
// }

// export default PurchasedCart;
