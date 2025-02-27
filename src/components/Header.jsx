import { Button } from './ui/button';
import logo from '../assets/logo.svg';
import { Link, NavLink } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '@/providers/AuthProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import toast from 'react-hot-toast';

const Header = () => {
  const [clicked, setClicked] = useState(false);
  const { user, logOut } = useContext(AuthContext);

  const logOutHandler = async () => {
    await logOut();
    toast.success('logged out successfully', {
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
        padding: '14px 20px',
      },
    });
  };

  return (
    <>
      <header className="container mx-auto">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to={'/'} className="flex items-center">
              <img src={logo} className="mr-3 h-9 sm:h-12" alt="Flowbite Logo" />
            </Link>
            <div className="flex items-center lg:order-2">
              {user ? (
                <>
                  <Avatar className="mr-2">
                    <AvatarImage src={user?.photoURL} referrerPolicy="no-referer" alt="@shadcn" />
                    <AvatarFallback>DP</AvatarFallback>
                  </Avatar>
                  <Button onClick={logOutHandler}>Logout</Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button className="mr-2 max-sm:hidden">Log in</Button>
                  </Link>
                  <Link to="/sign-up">
                    <Button variant="outline">Get started</Button>
                  </Link>
                </>
              )}
              <button
                onClick={() => setClicked(!clicked)}
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"></path>
                </svg>
                <svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
            <div
              className={` max-xl:absolute max-xl:top-14 ${
                clicked ? 'max-xl:left-0' : 'max-xl:-left-full'
              } max-xl:bg-white max-xl:border max-xl:py-4 max-xl:shadow-lg justify-between items-center w-full lg:flex lg:w-auto lg:order-1 transition-all duration-500 z-50`}>
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <NavLink
                    to={'/'}
                    className={`${({ isActive }) =>
                      isActive
                        ? 'active'
                        : ''} block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary/60 transition-all duration-300 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700
                    `}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={'/add-blog'}
                    className={`${({ isActive }) =>
                      isActive
                        ? 'active'
                        : ''} block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary/60 transition-all duration-300 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700
                    `}>
                    Add Blog
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/wishlist"
                    className={`${({ isActive }) =>
                      isActive
                        ? 'active'
                        : ''} block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary/60 transition-all duration-300 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700
                    `}>
                    Wishlist
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/all-blogs"
                    className={`${({ isActive }) =>
                      isActive
                        ? 'active'
                        : ''} block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary/60 transition-all duration-300 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700
                    `}>
                    All Blogs
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/featured-blogs"
                    className={`${({ isActive }) =>
                      isActive
                        ? 'active'
                        : ''} block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary/60 transition-all duration-300 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700
                    `}>
                    Featured Blogs
                  </NavLink>
                </li>

                <Link to="/login" className="px-2">
                  <Button className="w-full sm:hidden">Log in</Button>
                </Link>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
