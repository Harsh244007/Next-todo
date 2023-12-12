"use client"
import { removeToken } from "@/store/slices/storeSlice";
import { RootState } from "@/types/commonTypes";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.store);

  const navigate = useRouter()
  
  const navigateToLogin = () => {
    navigate.push('/login'); 
  };
  const handleLogout = () => {
    dispatch(removeToken());
    navigateToLogin()
  };

  const navigateToSignup = () => {
    navigate.push('/signup');
  };
  
  const navigateToTasks = () => {
    navigate.push('/tasks');
  };
  
  const navigateToProfile = () => {
    navigate.push('/profile');
  };
  return (
    <header className="backdrop-filter  border-b bg-opacity-10 backdrop-blur-sm border-zinc-800   fixed top-0 w-full  text-white">
      <nav className="flex items-center max-w-screen-xl m-auto justify-between lg:justify-around container mx-auto p-4 sm:px-8 md:px-10 lg:px-20 py-4">
        <h1 className="text-base sm:text-2xl font-bold">Task Manager</h1>
        <ul className="flex space-x-4">
          {token ? (
            <>
              <li className="cursor-pointer hover:text-gray-300" onClick={navigateToTasks}>Tasks</li>
              <li className="cursor-pointer hover:text-gray-300" onClick={navigateToProfile}>Profile</li>
              <li className="cursor-pointer text-red-300 hover:text-red-600" onClick={handleLogout}>
                Logout
              </li>
            </>
          ) : (
            <>
              <li className="cursor-pointer hover:text-gray-300" onClick={navigateToLogin}>Login</li>
              <li className="cursor-pointer hover:text-gray-300" onClick={navigateToSignup}>Signup</li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
