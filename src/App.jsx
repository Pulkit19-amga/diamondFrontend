import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home/home";
import Contact from "./pages/contact/contact";
import Header from "./pages/header/header";
import SecondHeader from "./pages/header/secondHeader";
import Footer from "./pages/footer/footer";
import Engagement from "./pages/engagement/engagement";
import About from "./pages/about/about";
import Diamond from "./pages/diamond/diamond";
import Terms from "./pages/terms-conditions/terms";
import Policy from "./pages/policy/policy";
import Weddingbrands from "./pages/wedding-brands/weddingBrands";
import RingStyle from "./pages/engagemnet-ring-style/ringStyle";
import DiamondDetails from "./pages/diamond-detail/diamondDetails/diamondDetails";
import CartPage from "./cart/CartPage";
import Signin from "./pages/signin/signin";
import Signup from "./pages/signup/signup";
import ResetPassword from "./pages/resetpassword/reset";
import ResetPasswordForm from "./pages/resetpassword/ResetPasswordForm";
import Profile from "./pages/profile/profile";
import Checkout from "./pages/checkout/checkout";
import ThankYou from "./pages/order-success/thankyou";
import PaymentFailed from "./pages/payment_failed/PaymentFailed";
import OrderDetails from "./pages/order_details/OrderDetails";


export default function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      {isHome ? <Header /> : <SecondHeader />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/engagement" element={<Engagement />} />
          <Route path="/about" element={<About />} />
          <Route path="/diamond" element={<Diamond />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/wedding-brands" element={<Weddingbrands />} />
          <Route path="/engagement-ring-style" element={<RingStyle />} />
          <Route path="/diamond-details/:id" element={<DiamondDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordForm />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/thankyou" element={<ThankYou />} />

          <Route path="/paymnet-failed" element={<PaymentFailed />} />
          <Route path="/order-details/:userId/:nth" element={<OrderDetails /> } />
          

        </Routes>
      </main>
      <Footer />
    </>
  );
}
