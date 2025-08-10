import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { Link } from 'react-router-dom';
import type { RootState } from '../store/store';

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 min-h-[calc(100vh-64px)]">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-gray-600 mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/"
          className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto bg-white rounded-lg shadow-xl my-8">
      <h2 className="text-3xl font-bold text-gray-800 border-b pb-4 mb-6">
        Your Shopping Cart
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Cart Items List */}
        <div className="md:col-span-2 lg:col-span-3 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <span className="text-gray-700">Quantity:</span>
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    className="w-16 border rounded-md p-2 text-center focus:ring-2 focus:ring-blue-500 transition"
                    onChange={(e) =>
                      handleQuantityChange(item.id, Number(e.target.value))
                    }
                  />
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-xl text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => dispatch(removeFromCart({ id: item.id }))}
                    className="text-red-500 text-sm hover:text-red-700 mt-1 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="md:col-span-1 lg:col-span-1 bg-gray-50 p-6 rounded-lg shadow-sm h-fit">
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="space-y-2 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-t mt-4 pt-4 text-lg">
              <span className="font-bold">Total:</span>
              <span className="font-bold">${subtotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <Link
              to="/checkout"
              className="block w-full text-center bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={() => dispatch(clearCart())}
              className="block w-full text-center bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-300"
            >
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
