import { useState, type FormEvent } from 'react';
import { loginAPI } from '../services/auth';
import { AxiosError } from 'axios';
import { useAuth } from '../context/AuthContext';

function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setEmail('');
    setPassword('');
    setError(null);
    setLoading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await loginAPI(email, password);
      console.log('response:', data.access_token);
      setLoading(false);
      login(data.access_token);
    } catch (e) {
      if (e instanceof AxiosError)
        setError(e.response?.data?.message ?? 'Invalid email or password.');
      else setError('Something went wrong.');
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-fit  min-w-fit  mt-20 ml-10 mr-10 p-10 rounded-2xl bg-gray-100 px-4">
      <form className="w-full max-x-md p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign In
        </h2>
        {error && (
          <div className="mt-2 p-2 text-sm text-red-600 bg-red-100 rounded-md">
            {error}
          </div>
        )}
        <div className="mt-3">
          <label className="block mb-1  text-gray-700 font-bold">Email</label>
          <input
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="name@xyz.com"
          />
        </div>

        <div className="mt-3">
          <label className="block mb-1 text-gray-700 font-bold">Password</label>
          <input
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="*******"
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="font-bold mt-4 w-full p-2 border rounded-md bg-blue-400 hover:bg-blue-500"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <p className="text-center text-sm">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Register
          </a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
