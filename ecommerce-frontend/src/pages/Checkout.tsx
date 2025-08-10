import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../store/cartSlice';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { RootState } from '../store/store';

type FormData = {
  fullName: string;
  address: string;
  city: string;
  zip: string;
};

// Define a type for the validation errors
type FormErrors = {
  fullName?: string;
  address?: string;
  city?: string;
  zip?: string;
  api?: string; // For API-related errors
};

export default function Checkout() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    address: '',
    city: '',
    zip: '',
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 5;
  const totalPrice = subtotal + tax + shipping;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full Name is required.';
    if (!formData.address) newErrors.address = 'Address is required.';
    if (!formData.city) newErrors.city = 'City is required.';
    if (!formData.zip) newErrors.zip = 'Zip Code is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOrder = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        userId: 1, // Dummy user
        products: cartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity,
        })),
        ...formData,
        total: totalPrice,
      };

      console.log('Placing order:', orderData);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      dispatch(clearCart());
      navigate('/home');
    } catch (err) {
      console.error(err);
      setErrors({ api: 'Failed to place order. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto my-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">
        Checkout
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Shipping Information Form */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Shipping Information
          </h3>
          {errors.api && <p className="text-red-500 mb-4">{errors.api}</p>}

          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block mb-1 font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block mb-1 font-medium text-gray-700"
            >
              Address
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor="city"
                className="block mb-1 font-medium text-gray-700"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="zip"
                className="block mb-1 font-medium text-gray-700"
              >
                Zip Code
              </label>
              <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${errors.zip ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.zip && (
                <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary & Payment Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Order Summary
          </h3>
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-semibold">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Taxes (8%):</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between border-t mt-4 pt-4 text-xl">
                <span className="font-bold">Total:</span>
                <span className="font-bold text-blue-600">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={handleOrder}
              disabled={loading}
              className="mt-6 w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Placing Order...' : `Pay $${totalPrice.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
