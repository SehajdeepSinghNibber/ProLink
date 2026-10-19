import { useState, useContext } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Logo from "../assets/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10";

const Login = () => {
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      toast.success(result.data.message || "Login successful!");

      setEmail("");
      setPassword("");

      console.log(result.data);

      // Change "/" to your desired page after login.
      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh w-full bg-[#f3f2ef]">
      <header className="px-5 sm:px-8">
        <img
          src={Logo}
          alt="ProLink"
          className="-mt-3 block h-auto w-28 object-contain object-left sm:-mt-4 sm:w-36 md:w-40"
        />
      </header>

      <main className="flex justify-center px-4 pb-10 pt-2 sm:pt-4">
        <form
          className="w-full max-w-105 rounded-2xl border border-white/70 bg-white p-6 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.15)] sm:p-8"
          onSubmit={handleLogin}
        >
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Sign in to continue to ProLink.
            </p>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Email address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className={inputClass}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`${inputClass} pr-12`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-red-600 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-red-700 focus:ring-2 focus:ring-red-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-red-600 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;