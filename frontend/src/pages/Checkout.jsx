import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import ProgressIndicator from '@/components/ProgressIndicator';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Tally form handles data collection
  const [formCompleted, setFormCompleted] = useState(false);

  // Initialize Tally widget
  useEffect(() => {
    if (window.Tally) {
      window.Tally.loadEmbeds();
    }
  }, []);

  const getProductImage = (color) => {
    const imageMap = {
      'Turquoise Blue': '/assets/blue-model.png',
      'Grey': '/assets/white-model.png',
      'Green': '/assets/green-model.png',
      'Yellow': '/assets/yellow-model.png',
      'Red': '/assets/red-model.png',
      'Black': '/assets/black-model.png',
      'White': '/assets/white-model.png'
    };
    return imageMap[color] || imageMap['White'];
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + (item.quantity || 1), 0);
  };

  const handleContinueToPayment = () => {
    // Save minimal cart data for confirmation page
    const orderData = {
      items: getTotalItems(),
      total: getTotalPrice(),
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('checkoutData', JSON.stringify(orderData));
    navigate(`/confirmation?items=${getTotalItems()}&total=${getTotalPrice()}`);
  };

  const handleBackToCart = () => {
    navigate('/cart');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black px-4 py-8 flex items-center justify-center" data-testid="checkout-page">
        <Card className="max-w-2xl w-full text-center p-12 bg-zinc-900 border-zinc-800">
          <h1 className="text-3xl font-light text-white mb-4 uppercase tracking-wider">
            Your Cart is Empty
          </h1>
          <p className="text-zinc-400 mb-8 text-lg">
            Please add items to your cart before checkout.
          </p>
          <Button
            onClick={() => navigate('/store')}
            className="max-w-md mx-auto bg-zinc-800 hover:bg-zinc-700 text-white"
          >
            Go to Store
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black px-4 py-8" data-testid="checkout-page">
      {/* Logo */}
      <div className="text-center mb-8">
        <img
          src="https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/1240476a-bf23-4bf4-9259-64052a0d8ef0.jpeg"
          alt="1% Club Logo"
          className="h-20 w-auto mx-auto mb-4 drop-shadow-lg"
        />
        <h1 className="text-3xl font-light text-white uppercase tracking-wider">Checkout</h1>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Progress Indicator - Step 2 */}
        <ProgressIndicator currentStep={2} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Checkout Form - Tally Embed */}
          <div className="lg:col-span-3">
            <Card className="p-6 md:p-8 bg-zinc-900 border-zinc-800">

              <div className="mb-6">
                <iframe
                  data-tally-src="https://tally.so/r/7RlDV0"
                  width="100%"
                  height="700"
                  frameBorder="0"
                  marginHeight="0"
                  marginWidth="0"
                  title="Shipping Information"
                  style={{
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: '#18181b'
                  }}
                ></iframe>
              </div>

              {/* Navigation Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button
                  type="button"
                  onClick={handleBackToCart}
                  variant="outline"
                  className="border-zinc-700 text-white hover:bg-zinc-800"
                  data-testid="back-to-cart-btn"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Cart
                </Button>
                <Button
                  type="button"
                  onClick={handleContinueToPayment}
                  className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-black font-bold"
                  data-testid="continue-to-payment-btn"
                >
                  Continue to Payment
                </Button>
              </div>

              {/* Helper Text */}
              <p className="text-zinc-500 text-xs mt-4 text-center">
                Please complete the shipping form above before continuing
              </p>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-zinc-900 border-zinc-800 sticky top-8" data-testid="order-summary">
              <h2 className="text-xl font-semibold text-white mb-6 uppercase tracking-wide">
                Order Summary
              </h2>

              {/* Cart Items with FIXED model image cropping */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-3 bg-zinc-800/50 rounded-lg" data-testid={`summary-item-${item.id}`}>
                    {/* FIXED: Properly cropped model image */}
                    <div className="w-20 h-28 bg-zinc-700 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={getProductImage(item.color)}
                        alt={item.name}
                        className="w-full h-full"
                        style={{
                          objectFit: 'cover',
                          objectPosition: 'center 20%'
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold text-sm">{item.name}</h4>
                      <p className="text-yellow-500 text-xs mt-1">
                        {item.color} • Size {item.size}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-zinc-400 text-sm">Qty: {item.quantity || 1}</span>
                        <span className="text-white font-semibold">
                          ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 pt-4 border-t border-zinc-700">
                <div className="flex justify-between text-white text-base">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span data-testid="subtotal">₹{getTotalPrice().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-white text-base">
                  <span>Shipping</span>
                  <span className="text-green-400" data-testid="shipping">FREE</span>
                </div>
                <hr className="border-zinc-700" />
                <div className="flex justify-between text-white font-bold text-xl">
                  <span>Total</span>
                  <span className="text-yellow-500" data-testid="total">
                    ₹{getTotalPrice().toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-zinc-800/50 rounded-lg">
                <div className="flex items-start gap-2">
                  <ShieldCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-300 text-sm">
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
