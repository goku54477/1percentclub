import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import ProgressIndicator from '@/components/ProgressIndicator';

import { BACKEND_URL } from '@/config';

const Confirmation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const items = parseInt(searchParams.get('items') || '1');
  const total = parseInt(searchParams.get('total') || '4999');

  useEffect(() => {
    // Save order data to backend
    const saveOrder = async () => {
      // Get customer data from localStorage (saved during checkout)
      const customerData = JSON.parse(localStorage.getItem('checkoutData') || '{}');
      
      if (customerData.name && customerData.email) {
        try {
          await fetch(`${BACKEND_URL}/api/orders`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              customerName: customerData.name,
              customerEmail: customerData.email,
              customerPhone: customerData.phone || 'N/A',
              customerAddress: customerData.address || 'N/A',
              items: items,
              total: total,
              timestamp: new Date().toISOString()
            }),
          });
        } catch (error) {
          console.error('Failed to save order:', error);
        }
      }
    };

    saveOrder();
  }, [items, total]);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center px-4 py-8" data-testid="confirmation-page">
      {/* Logo */}
      <div className="mb-6 sm:mb-8">
        <img
          src="https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/1240476a-bf23-4bf4-9259-64052a0d8ef0.jpeg"
          alt="Logo"
          className="h-16 sm:h-20 w-auto mx-auto"
        />
      </div>

      {/* Progress Indicator - Step 3 with FIXED progress line */}
      <ProgressIndicator currentStep={3} />

      {/* Success Icon */}
      <div className="mb-8">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-green-500/50">
          <Check className="w-12 h-12 text-white" />
        </div>
      </div>

      {/* Confirmation Message */}
      <Card className="mb-10 px-6 py-8 bg-zinc-900 border-zinc-800 max-w-2xl" data-testid="confirmation-message">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase tracking-wide">
          YOUR ORDER
        </h1>
        <h2 className="text-2xl md:text-3xl font-light text-green-400 mb-6 uppercase tracking-wide">
          WILL ARRIVE SOON
        </h2>
        <p className="text-white text-xl mt-6 font-light mb-4">
          Welcome to the 1%
        </p>
        <p className="text-zinc-300 text-lg font-light leading-relaxed">
          Your premium merch is being carefully prepared by our team and will ship withing 24-48 hours with express delivery.
        </p>
      </Card>

      {/* Order Details */}
      <Card className="mb-10 p-6 bg-zinc-900 border-zinc-800 max-w-lg w-full" data-testid="order-summary">
        <h3 className="text-white text-xl font-bold mb-6 text-center tracking-wide uppercase">
          Order Summary
        </h3>
        <div className="text-left space-y-4">
          <div className="flex justify-between text-white text-lg">
            <span>Premium Hoodies</span>
            <span data-testid="order-items-total">₹{total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-white text-lg">
            <span>Express Shipping</span>
            <span className="text-green-400" data-testid="order-shipping">FREE</span>
          </div>
          <hr className="border-zinc-700 my-4" />
          <div className="flex justify-between text-white font-bold text-xl">
            <span>TOTAL</span>
            <span className="text-yellow-500" data-testid="order-total">₹{total.toLocaleString()}</span>
          </div>
        </div>
      </Card>

      {/* Payment Information */}
      <Card className="mb-10 p-6 bg-zinc-900 border-zinc-800 max-w-lg w-full" data-testid="payment-details">
        <h3 className="text-white text-xl font-bold mb-6 text-center tracking-wide uppercase">
          Payment Details
        </h3>
        <div className="text-center space-y-4">
          <p className="text-white text-lg">Complete your payment using UPI:</p>
          <div className="bg-yellow-600 text-black p-4 rounded-lg">
            <p className="text-lg font-bold">talldarksavage@oksbi</p>
          </div>
          <p className="text-zinc-300 text-sm">
            Send the exact amount and your order will be processed within 24 hours
          </p>
        </div>
      </Card>

      {/* Back Button */}
      <Button
        onClick={() => navigate('/')}
        className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-6 text-lg"
        data-testid="back-to-homepage-btn"
      >
        BACK TO HOMEPAGE
      </Button>

      {/* Social Media */}
      <div className="text-center px-4 mt-8">
        <p className="text-white text-sm font-bold mb-2">FOLLOW US AT</p>
        <div className="flex items-center justify-center space-x-4">
          <a href="#" className="text-white hover:text-yellow-500 transition-colors duration-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="#" className="text-white hover:text-yellow-500 transition-colors duration-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
