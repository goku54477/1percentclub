import "@/App.css";
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ClosedLanding from "@/pages/ClosedLanding";
import Store from "@/pages/Store";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Confirmation from "@/pages/Confirmation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Toaster } from "@/components/ui/sonner";
import PageTransition from "@/components/PageTransition";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.key}>
        <Route path="/" element={<ClosedLanding />} />
        <Route 
          path="/store" 
          element={
            <ProtectedRoute>
              <PageTransition key="store">
                <Store />
              </PageTransition>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/cart" 
          element={
            <ProtectedRoute>
              <PageTransition key="cart">
                <Cart />
              </PageTransition>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <PageTransition key="checkout">
                <Checkout />
              </PageTransition>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/confirmation" 
          element={
            <ProtectedRoute>
              <PageTransition key="confirmation" isConfirmationPage={true}>
                <Confirmation />
              </PageTransition>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
