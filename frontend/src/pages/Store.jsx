import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, X } from 'lucide-react';
import { toast } from 'sonner';
import { ensureVisitorId, recordSelection } from '@/lib/supabaseClient';

const Store = () => {
  const navigate = useNavigate();
  const maxItems = 3;
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showCart, setShowCart] = useState(false);

  const hoodies = [
    { 
      id: 'blue',
      name: '[ OB1 ]',
      image: '/assets/blue1.jpg',
      color: 'Turquoise Blue'
    },
    { 
      id: 'grey',
      name: '[ GREY MATTER ]',
      image: '/assets/grey1.jpg',
      color: 'Grey'
    },
    { 
      id: 'green',
      name: '[ GREEN GOBLIN ]',
      image: '/assets/green1.jpg',
      color: 'Green'
    },
    { 
      id: 'yellow',
      name: '[ LEMONCHELLO ]',
      image: '/assets/yellow1.jpg',
      color: 'Yellow'
    },
    { 
      id: 'red',
      name: '[ RED DRAGON ]',
      image: '/assets/red1.jpg',
      color: 'Red'
    },
    { 
      id: 'black',
      name: '[ VENOM ]',
      image: '/assets/black1.jpg',
      color: 'Black'
    }
  ];

  const addToCart = (product) => {
    if (cart.length < maxItems) {
      const newCart = [...cart, { ...product, id: `${product.name}-${product.size}-${Date.now()}`, quantity: 1 }];
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
      toast.success('Added to cart!', {
        description: `${product.name} (${product.color}, ${product.size})`
      });
    }
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  const handleCheckout = () => {
    if (cart.length > 0) {
      navigate('/cart');
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 py-8" data-testid="store-page">
      {/* Cart Counter */}
      {cart.length > 0 && (
        <button 
          onClick={() => setShowCart(!showCart)}
          className="fixed top-6 right-6 z-50 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black px-5 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all"
          data-testid="cart-icon-btn"
        >
          <ShoppingCart className="inline-block mr-2 w-5 h-5" />
          {cart.length}/{maxItems}
        </button>
      )}
      
      {/* Premium Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-black bg-opacity-95 backdrop-blur-xl border-l border-yellow-600 border-opacity-30 transform transition-transform duration-300 z-50 ${showCart ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white uppercase tracking-wide">Your Cart</h3>
            <button 
              onClick={() => setShowCart(false)}
              className="text-yellow-600 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {cart.map(item => (
                  <div key={item.id} className="bg-white bg-opacity-5 border border-yellow-600 border-opacity-20 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-white font-semibold">{item.name}</h4>
                        <p className="text-yellow-500 text-sm">{item.color} • Size {item.size}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-white font-bold text-lg">₹{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-yellow-600 border-opacity-20 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-white font-semibold">Total ({cart.length} items)</span>
                  <span className="text-yellow-500 font-bold text-xl">₹{getTotalPrice().toLocaleString()}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold py-3 px-6 rounded-xl uppercase tracking-wide hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Proceed to Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Overlay */}
      {showCart && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowCart(false)}
        ></div>
      )}
      
      {/* Logo */}
      <div className="text-center mb-8">
        <img 
          src="https://app.trickle.so/storage/public/images/usr_14ec922cf0000001/1240476a-bf23-4bf4-9259-64052a0d8ef0.jpeg" 
          alt="Logo" 
          className="h-16 w-auto mx-auto mb-4 drop-shadow-lg"
        />
      </div>
      
      {/* Store Title */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-light text-white uppercase tracking-wider leading-tight">
          EXCLUSIVE
        </h1>
        <h2 className="text-2xl md:text-3xl font-light text-white uppercase tracking-wider mt-2">
          LIMITED. INVITE ONLY
        </h2>
      </div>
      
      {/* Product Grid - All 6 Hoodies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {hoodies.map(hoodie => (
          <HoodieCard
            key={hoodie.id}
            hoodie={hoodie}
            onAddToCart={addToCart}
            isCartFull={cart.length >= maxItems}
          />
        ))}
      </div>
      
      {/* Floating Checkout Button */}
      {cart.length > 0 && (
        <button 
          onClick={handleCheckout}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-bold py-4 px-8 rounded-xl uppercase tracking-wide shadow-2xl hover:from-yellow-500 hover:to-yellow-600 hover:shadow-3xl hover:-translate-y-1 transition-all duration-200 z-40"
          data-testid="checkout-btn"
        >
          CHECKOUT ₹{getTotalPrice().toLocaleString()}
        </button>
      )}
    </div>
  );
};

const HoodieCard = ({ hoodie, onAddToCart, isCartFull }) => {
  const sizes = ['M', 'L', 'XL', 'XXL', 'XXXL'];
  const [selectedSize, setSelectedSize] = useState('');

  const handleRequestAccess = async () => {
    if (selectedSize && !isCartFull) {
      const item = {
        name: hoodie.name,
        size: selectedSize,
        color: hoodie.color,
        price: 4899
      }
      onAddToCart(item);
      try {
        const visitorId = ensureVisitorId();
        const res = await recordSelection({
          visitor_id: visitorId,
          product_name: item.name,
          color: item.color,
          size: item.size,
          price: item.price,
          source_page: 'store',
          created_at: new Date().toISOString()
        });
        if (res?.error) {
          const msg = typeof res.error?.message === 'string' ? res.error.message : 'Unknown error';
          toast.error('Could not record selection', { description: `REST: ${msg}` });
        } else {
          toast.success('Selection saved', { description: `${item.name} (${item.color}, ${item.size})` });
        }
      } catch (_e) {
        toast.error('Could not record selection', { description: 'REST: Network error while saving selection' });
      }
      setSelectedSize('');
    }
  };

  return (
    <div className="flex flex-col items-center text-center w-full" data-testid={`product-${hoodie.id}`}>
      {/* Hoodie Image - Fixed model display without head cutoff and white space removed */}
      <div className="mb-5 w-full bg-black rounded overflow-hidden relative" style={{aspectRatio: '3/4', height: '100%'}}>
        <img 
          src={hoodie.image}
          alt={hoodie.name}
          className="w-full h-full"
          style={{
            objectFit: 'cover',
            objectPosition: 'center top',
            transform: 'scale(1.05)',
            transformOrigin: 'center top'
          }}
        />
      </div>
      
      {/* Product Info */}
      <div className="flex flex-col items-center w-full space-y-2">
        <h3 className="text-lg font-normal text-white tracking-wide">{hoodie.name}</h3>
        <p className="text-xs text-gray-400 font-light">1 of 30 Only</p>
        <p className="text-base font-normal text-white">₹4,899</p>
        
        {/* Size Options */}
        <div className="flex justify-center items-center gap-2 pt-2 w-full">
          {sizes.map(size => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`border px-2.5 py-1 text-xs font-light transition-all ${
                selectedSize === size 
                  ? 'border-white bg-white text-black' 
                  : 'bg-transparent text-gray-300 hover:border-opacity-40'
              }`}
              style={{ 
                borderColor: selectedSize === size ? '#ffffff' : 'rgba(212, 175, 55, 0.2)',
                boxShadow: selectedSize === size ? 'none' : '0 0 6px rgba(212, 175, 55, 0.1)'
              }}
              data-testid={`size-${size.toLowerCase()}-${hoodie.id}`}
            >
              {size}
            </button>
          ))}
        </div>
        
        {/* Request Access Button */}
        <div className="w-full pt-2">
          <button
            onClick={handleRequestAccess}
            disabled={!selectedSize || isCartFull}
            className="w-full px-6 py-3 bg-gradient-to-r from-yellow-600 to-yellow-500 text-black font-semibold text-sm uppercase tracking-wider hover:from-yellow-500 hover:to-yellow-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-40 disabled:cursor-not-allowed border"
            style={{ 
              borderColor: 'rgba(212, 175, 55, 0.2)',
              boxShadow: '0 0 6px rgba(212, 175, 55, 0.1), 0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
            data-testid={`add-to-cart-btn-${hoodie.id}`}
          >
            Request Access
          </button>
        </div>
      </div>
    </div>
  );
};

export default Store;
