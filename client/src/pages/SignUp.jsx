import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

    const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10";

    const SignUp = () => {

        const {serverUrl} = useContext(authDataContext)

        const [userName, setUserName] = useState("");
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [password, setPassword] = useState("");
        const [email, setEmail] = useState("");
        const [showPassword, setShowPassword] = useState(false);
        const [loading,setLoading] = useState(false);

        const handleSignUp = async (e)=>{
            e.preventDefault();
            setLoading(true);
            try {
                const result = await axios.post(`${serverUrl}/api/auth/signup`,{
                    firstName,
                    lastName,
                    userName,
                    email,
                    password
                },{withCredentials:true})

                toast.success(result.data.message || "Account created successfully!");

                setLoading(false);
                setEmail("");
                setFirstName("");
                setPassword("");
                setLastName("");
                setUserName("");

                console.log(result)
            } catch (error) {
                const message = error.response?.data?.message || "Something went wrong";
                setLoading(false);
                toast.error(message);
            }
        }

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
            <form className="w-full max-w-105 rounded-2xl border border-white/70 bg-white p-6 shadow-[0_10px_40px_-12px_rgba(0,0,0,0.15)] sm:p-8"
            onSubmit={handleSignUp}>
            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Create your account
                </h1>
                <p className="mt-1.5 text-sm text-gray-500">
                Join ProLink and grow your professional network.
                </p>
            </div>

            <div className="space-y-4">
                
                <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Username
                </label>
                <input type="text" placeholder="Username" className={inputClass} value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                </div>
                
                <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    First name
                </label>
                <input type="text" placeholder="First Name" className={inputClass} value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                </div>

                <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Last name
                </label>
                <input type="text" placeholder="Last Name" className={inputClass} value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                </div>

                <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Email address
                </label>
                <input
                    type="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                </div>


                <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Password
                </label>

                <div className="relative">
                    <input
                    type={showPassword?"text":"password"}
                    placeholder="At least 6 characters"
                    className={`${inputClass} pr-12`}
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />

                    <p className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={()=>setShowPassword(!showPassword)}
                    >
                    {/* <FiEye size={18} /> */}
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </p>
                </div>
                </div>

            </div>

            
            <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-red-600 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-red-700 focus:ring-2 focus:ring-red-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
            >
            {loading ? "Creating account..." : "Sign Up"}
            </button>


            <p className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="font-semibold text-red-600 hover:underline"
                >
                    Sign in
                </Link>
            </p>
            </form>
        </main>
        </div>
    );
    };

    export default SignUp;