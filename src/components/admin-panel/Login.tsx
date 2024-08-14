import { FcGoogle } from 'react-icons/fc';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      username,
      email,
      password,
    });

    if (result?.error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-300 to-cyan-300 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center gap-4">
        <h2 className="text-2xl font-bold mb-4 text-blue-500">Sign In</h2>

        <form onSubmit={handleLogin} className="w-full">
          <div className="flex flex-col gap-2 mt-4 font-bold">
            <label htmlFor="username" className="text-sm">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4 font-bold">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col gap-2 mt-4 font-bold">
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 mt-4"
          >
            Sign In
          </button>
        </form>

        <a href="#" className="text-sm text-blue-500 hover:underline">
          Forgot your password?
        </a>

        <div className='border-b border-gray-600 pt-4'/>

        <div>Or You Could</div>

        <button
          className="bg-blue-500 text-white px-8 py-4 flex gap-2 items-center rounded-lg hover:bg-blue-600"
          onClick={() => signIn('google')}
        >
          <FcGoogle size={30} /> Sign In with Google
        </button>

      </div>

      <div className="text-blue-50 text-sm mt-4 flex gap-2">
        <span>Don&apos;t have an account?</span>
        <a href="#" className="text-blue-500 hover:underline">
          Register Now
        </a>
      </div>

    </div>
  );
};

export default Login;
