import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const useCookies = () => {
  const [ cookies, setCookies] = useState(null);

  // Function to get a cookie by name
  const getCookie = (name) => {
    const cookieValue = Cookies.get(name);
    return cookieValue ? JSON.parse(cookieValue) : null;
  };

  // Function to set a cookie
  const setCookie = (name, value) => {
    const cookieValue = JSON.stringify(value);
    Cookies.set(name, cookieValue, { expires: 7 });
    setCookies(Cookies.get()); // Update the cookies state
  };

  // Function to remove a cookie
  const removeCookie = (name) => {
    Cookies.remove(name);
    setCookies(Cookies.get()); // Update the cookies state
  };

  useEffect(() => {
    // Initialize cookies state
    setCookies(Cookies.get());
  }, []);

  return {
    cookies,
    getCookie,
    setCookie,
    removeCookie,
  };
};

export default useCookies;
