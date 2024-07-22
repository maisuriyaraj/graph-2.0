"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import './signIn.css';
import { object, ref, string } from 'yup';
import { Field, Form, ErrorMessage, Formik } from 'formik';
import { getAuth } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { app } from "../../../config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { postRequest, putRequest } from '@/lib/api.service';
import { useRouter } from 'next/navigation';
import { Loader } from '../components/loader';

export default function SignIn() {
  const route = useRouter();
  const [isLoading, setLoading] = useState(false);
  const [isUnauthorized, setAuthorized] = useState(false);

  useEffect(() => {

  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      const data = await signInWithPopup(auth, provider);
      const response = await postRequest("http://localhost:3000/api/auth", {
        email: data.user.email,
        userName: data.user.displayName,
        googleAccount: true
      });

      if (response.data.status) {
        Cookies.set('AuthToken', JSON.stringify(`Bearer ${response.data.token}`, { expires: 7 }));
        Cookies.set('userId', JSON.stringify(response.data.userId, { expires: 7 }));

        setTimeout(() => {
          route.push('/dashboard');
        }, 3000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error(error)
    }
  }

  const signInWithGitHub = async () => {
    setLoading(true);
    const auth = getAuth(app);
    const provider = new GithubAuthProvider();
    try {
      const data = await signInWithPopup(auth, provider);
      const response = await postRequest("http://localhost:3000/api/auth", {
        email: data.user.email,
        userName: data.user.displayName,
        githubAccount: true
      });

      if (response.data.status) {
        Cookies.set('AuthToken', JSON.stringify(`Bearer ${response.data.token}`, { expires: 7 }));
        Cookies.set('userId', JSON.stringify(response.data.userId, { expires: 7 }));

        route.push('/dashboard');
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  const initialValues = {
    email: "",
    password: "",
  }

  const validationSchema = object({
    email: string().required("Email is Required !").email("Invalid Email"),
    password: string().required("Password is Required !").min(6, "Password must be 6 to 10 character long !.").max(10, "Password must be 6 to 10 character long !."),
  })

  const togglePassword = () => {
    let input = document.getElementById("password");
    let eye = document.getElementById('eye-icon');
    if (input && eye) {
      if (input.type == "password") {
        input.type = 'text';
        eye.classList.add('bi-eye-slash-fill');
        eye.classList.remove('bi-eye-fill');
      } else {
        input.type = 'password';
        eye.classList.add('bi-eye-fill')
        eye.classList.remove('bi-eye-slash-fill')
      }
    }
  }

  const handleFormSubmit = (formData) => {
    setLoading(true);
    const payload = {
      email: formData.email,
      password: formData.password
    }

    putRequest("http://localhost:3000/api/auth", payload).then((response) => {
      if (response.data.status) {
        Cookies.set('AuthToken', JSON.stringify(`Bearer ${response.data.token}`, { expires: 7 }));
        Cookies.set('userId', JSON.stringify(response.data.userId, { expires: 7 }));


        route.push('/dashboard');
      } else if (response.data.code == 501) {
        setAuthorized(true);
        let inputs = document.querySelectorAll('.input-controls');
        if (inputs) {
          inputs.forEach((x) => {
            x.classList.add('err-Boxes');
          });
        }
      } else {
        toast.error(response.data.message);
      }
      setLoading(false);
    }).catch(error => {
      setLoading(false);
      console.error(error);
    });
  }


  return (
    <>
      <div className='w-full' id='signIn'>
        <ToastContainer />
        {isLoading && <Loader isLoading={isLoading} />}
        <div className="lg:flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
          <div
            className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
          >
            <div
              className="p-4 py-6 text-white bg-green-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
            >
              <div className="my-3 text-4xl font-bold tracking-wider text-center">
                <a href="#">Graph Community</a>
              </div>
              <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">

              </p>
              <p className="flex flex-col items-center justify-center mt-10 text-center">
                <span>Don&apos;t have an account?</span>
                <Link href="/signup" className="text-sm italic hover:underline">Create New</Link>
              </p>
              <p className="mt-6 text-sm text-center text-white">
                Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
              </p>
            </div>
            <div className="p-5 bg-white md:flex-1">
              <h3 className="my-4 text-2xl font-semibold text-gray-700">SignIn</h3>
              <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleFormSubmit} >
                <Form action="#" className="flex flex-col space-y-5">
                  <div className="flex flex-col space-y-1">
                    <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200  input-controls"
                    />
                    <ErrorMessage component={'div'} name='email' className='text-red-600 text-sm' />
                    {isUnauthorized && <div className='text-red-600 text-sm'> <i className="bi bi-exclamation-circle"></i> &nbsp; Please Check your Email address. </div>}
                  </div>
                  <div className="flex flex-col space-y-1 relative">
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
                      <a href="#" className="text-sm text-blue-600 hover:underline focus:text-blue-800">Forgot Password?</a>
                    </div>
                    <Field
                      type="password"
                      id="password"
                      name="password"
                      className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200   input-controls"
                    />
                    <ErrorMessage component={'div'} name='password' className='text-red-600 text-sm' />
                    {isUnauthorized && <div className='text-red-600 text-sm'> <i className="bi bi-exclamation-circle"></i> &nbsp; Please Check your password. </div>}
                    <i className="bi bi-eye-fill eye-icon" id='eye-icon' onClick={() => togglePassword()}></i>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="remember"

                      className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                    />
                    <label htmlFor="remember" className="text-sm font-semibold text-gray-500">Remember me</label>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-green-500 rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                    >
                      Sign in
                    </button>
                  </div>
                  <div className="flex flex-col space-y-5">
                    <span className="flex items-center justify-center space-x-2">
                      <span className="h-px bg-gray-400 w-14"></span>
                      <span className="font-normal text-gray-500">or login with</span>
                      <span className="h-px bg-gray-400 w-14"></span>
                    </span>
                    <div className="flex flex-col space-y-4">
                      <a
                        onClick={signInWithGitHub}
                        className="flex items-center cursor-pointer justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none"
                      >
                        <span>
                          <i className="bi bi-github  w-5 h-5 text-gray-800 fill-current group-hover:text-white"></i>
                        </span>
                        <span className="text-sm font-medium text-gray-800 group-hover:text-white">Github</span>
                      </a>
                      <a
                        onClick={signInWithGoogle}
                        className="flex cursor-pointer items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group  focus:outline-none"
                      >
                        <span>
                          {/* <i className="bi bi-google w-5 h-5  fill-current"></i> */}
                          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                            <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                          </svg>
                        </span>
                        <span className="text-sm font-medium ">Google</span>
                      </a>
                    </div>
                  </div>
                </Form>
              </Formik>

            </div>
          </div>
        </div>

      </div>
    </>
  )
}
