import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.pinCode) newErrors.pinCode = 'PIN code is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone must be 10 digits';
    }
    
    if (formData.pinCode && !/^\d{6}$/.test(formData.pinCode)) {
      newErrors.pinCode = 'PIN code must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Save customer data for order submission
      const customerData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}${formData.apartment ? ', ' + formData.apartment : ''}, ${formData.city}, ${formData.state} - ${formData.pinCode}`
      };
      localStorage.setItem('checkoutData', JSON.stringify(customerData));
      navigate(`/confirmation?items=${getTotalItems()}&total=${getTotalPrice()}`);
    }
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
          {/* Checkout Form */}
          <div className="lg:col-span-3">
            <Card className="p-6 md:p-8 bg-zinc-900 border-zinc-800">
              <form onSubmit={handleSubmit}>
                {/* Contact Information */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4 uppercase tracking-wide">
                    Contact Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email" className="text-zinc-300">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="bg-zinc-800 border-zinc-700 text-white"
                        data-testid="email-input"
                      />
                      {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4 uppercase tracking-wide">
                    Shipping Address
                  </h2>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-zinc-300">First Name *</Label>
                        <Input
                          id="firstName"
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="John"
                          className="bg-zinc-800 border-zinc-700 text-white"
                          data-testid="first-name-input"
                        />
                        {errors.firstName && (
                          <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-zinc-300">Last Name *</Label>
                        <Input
                          id="lastName"
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Doe"
                          className="bg-zinc-800 border-zinc-700 text-white"
                          data-testid="last-name-input"
                        />
                        {errors.lastName && (
                          <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-zinc-300">Address *</Label>
                      <Input
                        id="address"
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main Street"
                        className="bg-zinc-800 border-zinc-700 text-white"
                        data-testid="address-input"
                      />
                      {errors.address && (
                        <p className="text-red-400 text-sm mt-1">{errors.address}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="apartment" className="text-zinc-300">Apartment, suite, etc. (optional)</Label>
                      <Input
                        id="apartment"
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        placeholder="Apartment 4B"
                        className="bg-zinc-800 border-zinc-700 text-white"
                        data-testid="apartment-input"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-zinc-300">City *</Label>
                        <Input
                          id="city"
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="Mumbai"
                          className="bg-zinc-800 border-zinc-700 text-white"
                          data-testid="city-input"
                        />
                        {errors.city && (
                          <p className="text-red-400 text-sm mt-1">{errors.city}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-zinc-300">State *</Label>
                        <Input
                          id="state"
                          type="text"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="Maharashtra"
                          className="bg-zinc-800 border-zinc-700 text-white"
                          data-testid="state-input"
                        />
                        {errors.state && (
                          <p className="text-red-400 text-sm mt-1">{errors.state}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pinCode" className="text-zinc-300">PIN Code *</Label>
                        <Input
                          id="pinCode"
                          type="text"
                          name="pinCode"
                          value={formData.pinCode}
                          onChange={handleInputChange}
                          placeholder="400001"
                          className="bg-zinc-800 border-zinc-700 text-white"
                          data-testid="pin-code-input"
                        />
                        {errors.pinCode && (
                          <p className="text-red-400 text-sm mt-1">{errors.pinCode}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-zinc-300">Phone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="9876543210"
                          className="bg-zinc-800 border-zinc-700 text-white"
                          data-testid="phone-input"
                        />
                        {errors.phone && (
                          <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
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
                    type="submit"
                    className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-black font-bold"
                    data-testid="continue-to-payment-btn"
                  >
                    Continue to Payment
                  </Button>
                </div>
              </form>
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
