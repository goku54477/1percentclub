import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Check } from 'lucide-react';
import ProgressIndicator from '@/components/ProgressIndicator';

const Confirmation = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const items = parseInt(searchParams.get('items') || '1');
  const total = parseInt(searchParams.get('total') || '4999');

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
          Thank you for your order! You'll receive tracking information withing 2-3 business days. Your exclusive merch will arrive shortly via express delivery.
        </p>
      </Card>

      {/* Additional Information */}
      <div className="max-w-2xl mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="bg-zinc-900 border-zinc-800 px-6 py-6">
            <h3 className="text-white text-xl font-semibold mb-2">Order Summary</h3>
            <div className="text-zinc-300 space-y-2">
              <div className="flex justify-between">
                <span>Items</span>
                <span>{items}</span>
              </div>
              <div className="flex justify-between font-semibold text-white pt-2 border-t border-zinc-700">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800 px-6 py-6">
            <h3 className="text-white text-xl font-semibold mb-2">What's Next?</h3>
            <ul className="text-zinc-300 space-y-2 text-left text-sm">
              <li>• Email confirmation sent</li>
              <li>• Tracking updates via email</li>
              <li>• Delivery in 5-7 days</li>
              <li>• Questions? Contact support</li>
            </ul>
          </Card>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <Button
          onClick={() => navigate('/store')}
          className="w-full bg-white text-black hover:bg-gray-200 font-semibold py-6 text-lg"
        >
          Continue Shopping
        </Button>
        <Button
          onClick={() => navigate('/')}
          variant="outline"
          className="w-full border-zinc-700 text-white hover:bg-zinc-800 py-6 text-lg"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default Confirmation;
