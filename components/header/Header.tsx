"use client"
import { removeToken } from "@/store/slices/storeSlice";
import { RootState } from "@/types/commonTypes";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.store);
  const handleLogout = () => {
    dispatch(removeToken());
  };
  const navigate = useRouter()
  const navigateToLogin = () => {
    navigate.push('/login'); 
  };

  const navigateToSignup = () => {
    navigate.push('/signup');
  };
  return (
    <header className="bg-gray-900 fixed top-0 w-full  text-white">
      <nav className="flex items-center max-w-screen-xl m-auto justify-between container mx-auto py-4 px-4">
        <h1 className="text-2xl font-bold">Task Manager</h1>
        <ul className="flex space-x-4">
          {token ? (
            <>
              <li className="cursor-pointer hover:text-gray-300">Tasks</li>
              <li className="cursor-pointer hover:text-gray-300" onClick={handleLogout}>
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
