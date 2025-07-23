import { useState, type FormEvent } from 'react';
import { register } from '../services/register';
import { AxiosError } from 'axios';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setEmail('');
    setPassword('');
    setName('');
    setLoading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setLoading(true);
      console.log(name, email, password);
      const response = await register(name, email, password);
      console.log(response);
      reset();
    } catch (e) {
      if (e instanceof AxiosError)
        setError(e.response?.data?.message ?? 'Invalid email or password.');
      else setError('Something went wrong.');
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-fit min-w-fit p-8 rounded-2xl bg-gray-100 px-4">
      <form className="w-full  rounded-2xl max-x-md p-8 bg-white ">
        <h2 className="text-2xl text-center font-bold text-gray-800">
          Register
        </h2>
        {error && (
          <div className="mt-2 p-2 text-sm text-red-600 bg-red-100 rounded-md">
            {error}
          </div>
        )}
        <div>
          <label className="block m-2  text-gray-700 font-bold">
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
            placeholder="firstName lastName "
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block m-2  text-gray-700 font-bold">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
            placeholder="xyz@domain.com"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block m-2  text-gray-700 font-bold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            placeholder="******"
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="w-full p-2 bg-blue-500 mt-4 rounded hover:bg-blue-400"
        >
          {loading ? 'Register...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
