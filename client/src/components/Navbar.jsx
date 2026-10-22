
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import CleanLogo from "../assets/CleanLogo.png";
import dp from "../assets/dp.jpg";
import { IoSearchSharp, IoNotificationsOutline, } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { FaUserGroup } from "react-icons/fa6";
import { authDataContext } from "../context/AuthContext";
import { userDataContext } from "../context/UserContext";

const Navbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const { userData,setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const handleSignOut = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${serverUrl}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      if (response.data?.success !== true) {
        throw new Error(response.data?.message || "Logout failed");
      }

      setUserData(null);
      setShowProfileDropdown(false);
      navigate("/login", { replace: true });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Logout failed"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-gray-200 bg-white text-gray-600 shadow-sm">
      <div className="mx-auto flex h-22.5 w-full max-w-[1600px] items-center gap-5 px-5 sm:px-8 lg:px-12">

        {/* ProLink Logo */}
        <img
          src={CleanLogo}
          alt="ProLink Logo"
          className="h-15 w-15 shrink-0 object-contain"
        />

        {/* Search Bar */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex h-11.5 min-w-0 max-w-140 flex-1 items-center gap-3 rounded-lg bg-[#f3f2ef] px-4"
        >
          <IoSearchSharp className="shrink-0 text-[23px] text-gray-600" />

          <input
            type="search"
            placeholder="Search Users..."
            aria-label="Search users"
            className="w-full min-w-0 bg-transparent text-base text-gray-700 outline-none placeholder:text-gray-500"
          />
        </form>

        {/* Navigation */}
        <div className="ml-auto flex h-full shrink-0 items-center gap-4 sm:gap-7 lg:gap-10">

          {/* Home */}
          <button
            type="button"
            aria-label="Home"
            onClick={() => navigate("/")}
            className="flex h-full flex-col items-center justify-center gap-1 transition hover:text-black"
          >
            <GoHome className="text-[25px]" />
            <span className="hidden text-sm sm:block">Home</span>
          </button>

          {/* My Network */}
          <button
            type="button"
            aria-label="My Network"
            onClick={() => navigate("/network")}
            className="flex h-full flex-col items-center justify-center gap-1 transition hover:text-black"
          >
            <FaUserGroup className="text-[25px]" />
            <span className="hidden whitespace-nowrap text-sm sm:block">
              My Networks
            </span>
          </button>

          {/* Notifications */}
          <button
            type="button"
            aria-label="Notifications"
            onClick={() => navigate("/notifications")}
            className="flex h-full flex-col items-center justify-center gap-1 transition hover:text-black"
          >
            <IoNotificationsOutline className="text-[25px]" />
            <span className="hidden text-sm sm:block">
              Notifications
            </span>
          </button>

          {/* Profile and Dropdown */}
          <div className="relative flex h-full items-center">
            <button
              type="button"
              aria-label="Profile menu"
              aria-expanded={showProfileDropdown}
              onClick={() =>
                setShowProfileDropdown((previous) => !previous)
              }
              className="h-11.5 w-11.5 shrink-0 overflow-hidden rounded-full bg-gray-200 transition hover:ring-2 hover:ring-gray-300 sm:h-13.5 sm:w-13.5"
            >
              <img
                src={dp}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 top-full mt-3 w-72.5 overflow-hidden rounded-xl border border-gray-200 bg-white text-gray-800 shadow-xl sm:w-80">

                {/* Profile Header */}
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <img
                      src={dp}
                      alt="Profile"
                      className="h-14 w-14 shrink-0 rounded-full object-cover"
                    />

                    <div className="min-w-0">
                      <h3 className="truncate font-semibold text-gray-900">
                        {[userData?.firstName, userData?.lastName]
                          .filter(Boolean)
                          .join(" ") || userData?.userName || "Your Name"}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Job
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileDropdown(false);
                      navigate("/profile");
                    }}
                    className="mt-4 w-full rounded-full border border-blue-600 py-1.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                  >
                    View Profile
                  </button>
                </div>

                <div className="border-t border-gray-200" />

                {/* Account */}
                <div className="p-4">
                  <h4 className="mb-2 font-semibold text-gray-900">
                    Account
                  </h4>

                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileDropdown(false);
                      navigate("/settings");
                    }}
                    className="block w-full rounded-md py-2 text-left text-sm text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                  >
                    Settings & Privacy
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileDropdown(false);
                      navigate("/help");
                    }}
                    className="block w-full rounded-md py-2 text-left text-sm text-gray-600 transition hover:bg-gray-50 hover:text-gray-900"
                  >
                    Help Center
                  </button>
                </div>

                <div className="border-t border-gray-200" />

                {/* Sign Out */}
                <div className="p-4">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={loading}
                    className="text-sm font-semibold text-gray-600 transition hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Signing out..." : "Sign Out"}
                  </button>
                </div>

              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
