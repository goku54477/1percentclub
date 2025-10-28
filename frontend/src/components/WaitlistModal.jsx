import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { BACKEND_URL } from '@/config';

const WaitlistModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate all fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Send to backend API
      const response = await fetch(`${BACKEND_URL}/api/waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit to waitlist');
      }

      const result = await response.json();
      console.log('Waitlist submission successful:', result);

      // Also store in localStorage as backup
      const waitlistData = JSON.parse(localStorage.getItem('waitlist') || '[]');
      waitlistData.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem('waitlist', JSON.stringify(waitlistData));
      
      setShowSuccess(true);
      
      // Close modal after 2 seconds
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({ firstName: '', lastName: '', email: '', phone: '' });
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting to waitlist:', error);
      setErrors({ submit: 'Failed to submit. Please try again.' });
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative bg-black border-2 border-red-600 rounded-lg w-full max-w-md p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-600 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Modal Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white uppercase mb-2">
            Join SMS Waitlist
          </h2>
          <p className="text-gray-400 text-sm">
            Get notified when we reopen
          </p>
        </div>

        {showSuccess ? (
          <div className="text-center py-8">
            <div className="text-green-500 text-xl font-bold mb-2">
              ✓ Thanks! You're on the waitlist.
            </div>
            <p className="text-gray-400 text-sm">
              We'll notify you soon!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* First Name */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className={`w-full px-4 py-3 bg-gray-900 border ${
                  errors.firstName ? 'border-red-500' : 'border-gray-700'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className={`w-full px-4 py-3 bg-gray-900 border ${
                  errors.lastName ? 'border-red-500' : 'border-gray-700'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full px-4 py-3 bg-gray-900 border ${
                  errors.email ? 'border-red-500' : 'border-gray-700'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className={`w-full px-4 py-3 bg-gray-900 border ${
                  errors.phone ? 'border-red-500' : 'border-gray-700'
                } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Submit Error */}
            {errors.submit && (
              <div className="text-red-500 text-sm text-center">
                {errors.submit}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg uppercase tracking-wide transition-all shadow-lg hover:shadow-xl hover:scale-105"
            >
              Join Waitlist
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default WaitlistModal;
