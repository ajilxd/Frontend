import { Elements } from "@stripe/react-stripe-js";
import type { Stripe } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Route, Routes } from "react-router-dom";
let stripePromise: Promise<Stripe | null>;

if (import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
}

import { OwnerContextProvider } from "@/context/OwnerContextProvider.tsx";
import PrivateRoute from "@/hoc/PrivateRoute.tsx";

import OwnerDashboard from "../layouts/OwnerDashboard";
import DefaultDashboard from "../pages/Dashboard.tsx";
import Company from "../pages/Dashboard.tsx/Company.tsx";
import Invoices from "../pages/Dashboard.tsx/Invoices.tsx";
import Managers from "../pages/Dashboard.tsx/Managers.tsx";
import Spaces from "../pages/Dashboard.tsx/Spaces.tsx";
import Subscription from "../pages/Dashboard.tsx/Subscription.tsx";
import ForgetPassword from "../pages/ForgetPassword";
import OwnerSignin from "../pages/OwnerSignin";
import OwnerSignUp from "../pages/OwnerSIgnup";
import PaymentStatus from "../pages/PaymentStatus.tsx";
import ResetPassword from "../pages/ResetPassword";

export const OwnerRoutes = () => {
  return (
    <OwnerContextProvider>
      <Elements stripe={stripePromise || null}>
        <Routes>
          <Route path="/signin" element={<OwnerSignin />}></Route>
          <Route path="/signup" element={<OwnerSignUp />}></Route>
          <Route path="/forget-password" element={<ForgetPassword />}></Route>
          <Route path="resetpassword/:token" element={<ResetPassword />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute Component={OwnerDashboard} role="owner" />}
          >
            <Route index element={<DefaultDashboard />}></Route>
            <Route path="subscriptions" element={<Subscription />}></Route>
            <Route path="invoices" element={<Invoices />}></Route>
            <Route path="company" element={<Company />}></Route>
            <Route path="managers" element={<Managers />}></Route>
            <Route path="spaces" element={<Spaces />}></Route>
          </Route>
          <Route path="payment" element={<PaymentStatus />}></Route>
        </Routes>
      </Elements>
    </OwnerContextProvider>
  );
};
