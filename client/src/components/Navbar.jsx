import MediaLogo from "../assets/MediaLogo.png";
import { IoSearchSharp, IoNotificationsOutline, } from "react-icons/io5";
import { GoHome } from "react-icons/go";
import { FaUserGroup } from "react-icons/fa6";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-black text-white shadow-lg">
      <div className="flex h-16 w-full items-center gap-3 px-3 sm:h-20 sm:gap-6 sm:px-6 lg:justify-around">

        {/* Logo */}
        <img
          src={MediaLogo}
          alt="ProLink Logo"
          className="h-9 w-9 shrink-0 object-contain sm:h-12 sm:w-12"
        />

        {/* Navigation */}
        <div className="flex shrink-0 items-center gap-3 sm:gap-7 md:gap-9">

           {/* Always-visible Search Bar */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex min-w-0 max-w-md flex-1 items-center gap-2 rounded-md bg-[#222222] px-2 py-2 sm:gap-3 sm:px-3"
        >
          <IoSearchSharp className="shrink-0 text-lg text-white sm:text-xl" />
          <input
            type="search"
            placeholder="Search Users..."
            aria-label="Search ProLink"
            className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-gray-400"
          />
        </form>

          <button
            type="button"
            aria-label="Home"
            className="flex flex-col items-center justify-center text-gray-400 transition hover:text-white"
          >
            <GoHome className="text-xl sm:text-2xl" />
            <span className="hidden text-xs md:block">Home</span>
          </button>

          <button
            type="button"
            aria-label="My Network"
            className="flex flex-col items-center justify-center text-gray-400 transition hover:text-white"
          >
            <FaUserGroup className="text-xl sm:text-2xl" />
            <span className="hidden whitespace-nowrap text-xs md:block">
              My Network
            </span>
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="flex flex-col items-center justify-center text-gray-400 transition hover:text-white"
          >
            <IoNotificationsOutline className="text-xl sm:text-2xl" />
            <span className="hidden text-xs md:block">Notifications</span>
          </button>

          {/* Profile */}
          <button
            type="button"
            aria-label="Profile"
            className="h-8 w-8 shrink-0 overflow-hidden rounded-full sm:h-11 sm:w-11"
          >
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;