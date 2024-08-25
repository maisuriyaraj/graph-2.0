"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { object, ref, string } from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { getAuth } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { app } from "../../../config";
import { postRequest } from "@/utils/api.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { Loader } from "../components/loader";
import useCookies from "@/hooks/useCookiesHook";
import { useDispatch, useSelector } from "react-redux";
import { handleSignUp } from "@/redux/slice/users";

export default function SignUp() {

    const route = useRouter();
    const dispatch = useDispatch();
    // const { loading, error, success } = useSelector((state) => state.auth);


    const [isLoading, setLoading] = useState(false);
    const { cookies, getCookie, setCookie, removeCookie } = useCookies();
    const { loading, error, success } = useSelector((state) => state.auth);


    const initialValues = {
        email: "",
        password: "",
        confirm_password: ""
    }

    const validationSchema = object({
        email: string().required("Email is Required !").email("Invalid Email"),
        password: string().required("Password is Required !").min(6, "Password must be 6 to 10 character long !.").max(10, "Password must be 6 to 10 character long !."),
        confirm_password: string()
            .oneOf([ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    })

    useEffect(() => {

    }, []);

    const showLoader = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 3000);
    }

    const showPasswordToggle = () => {
        let input1 = document.getElementById('password');
        let input2 = document.getElementById('confirm_password');
        let text = document.getElementById('passwordTxt');

        if (input1 !== null && input2 !== null) {
            if (input1.type == 'password' && input2.type == 'password') {
                input1.type = 'text';
                input2.type = 'text';
                text.innerHTML = 'Hide password';
            } else {
                input1.type = 'password';
                input2.type = 'password';
                text.innerHTML = 'Show password';
            }
        }
    }

    const signInWithGoogle = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        try {
            const data = await signInWithPopup(auth, provider);
            const response = await postRequest("api/auth", {
                email: data.user.email,
                userName: data.user.displayName,
                googleAccount: true,
                profile_picture: data.user.photoURL
            });
            showLoader();

            if (response.data.status) {
                setCookie('AuthToken', `Bearer ${response?.data?.token}`);
                setCookie('userId', response?.data?.userId);
                route.push('/dashboard');
            } else {
                toast.error(response?.data?.message);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    const signInWithGitHub = async () => {
        const auth = getAuth(app);
        const provider = new GithubAuthProvider();
        try {
            const data = await signInWithPopup(auth, provider);
            const response = await postRequest("api/auth", {
                email: data.user.email,
                userName: data.user.displayName,
                githubAccount: true,
                profile_picture: data.user.photoURL
            });
            showLoader();

            if (response.data.status) {
                setCookie('AuthToken', `Bearer ${response.data.token}`);
                setCookie('userId', response.data.userId);

                route.push('/dashboard');
            } else {
                toast.error(response.data.message);
            }
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handleFormSubmit = async (formData) => {
        const payload = {
            email: formData.email,
            password: formData.password
        }

        // postRequest("api/auth", payload).then((response) => {
        //     showLoader();
        //     if (response?.data?.status) {
        //         setCookie('AuthToken',`Bearer ${response?.data?.token}`);
        //         setCookie('userId', response?.data?.userId);
        //         route.push('/dashboard');
        //     } else {
        //         toast.error(response?.data?.message);
        //     }
        // }).catch(error => {
        //     console.error(error)
        // });

        const res = await dispatch(handleSignUp(payload));
        if (res?.payload?.status == true) {
            setCookie('AuthToken', `Bearer ${res?.payload?.token}`);
            setCookie('userId', res?.payload?.userId);
            route.push('/dashboard');
        } else {
            toast.error(res?.payload?.message);
        }
    }
    return (
        <main className='w-full' id='signIn'>
            <ToastContainer />
            {isLoading && <Loader isLoading={isLoading} />}
            <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
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
                            <span>Already have an Account ?</span>
                            <Link href="/signin" className="text-sm italic hover:underline">Sign in</Link>
                        </p>
                        <p className="mt-6 text-sm text-center text-white">
                            Read our <a href="#" className="underline">terms</a> and <a href="#" className="underline">conditions</a>
                        </p>
                    </div>
                    <div className="p-5 bg-white md:flex-1">
                        <h3 className="my-4 text-2xl font-semibold text-gray-700">Sign Up</h3>
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
                            <Form action="#" className="flex flex-col space-y-5">
                                <div className="flex flex-col space-y-1">
                                    <label htmlFor="email" className="text-sm font-semibold text-gray-500">Email address</label>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200"
                                    />
                                    <ErrorMessage component={'div'} name="email" className="text-red-600 text-sm" />

                                </div>
                                <div className="flex flex-col space-y-1">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-sm font-semibold text-gray-500">Password</label>
                                    </div>
                                    <Field
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200"
                                    />
                                    <ErrorMessage component={'div'} name="password" className="text-red-600 text-sm" />

                                </div>
                                <div className="flex flex-col space-y-1">
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-sm font-semibold text-gray-500">Confirm Password</label>
                                    </div>
                                    <Field
                                        type="password"
                                        id="confirm_password"
                                        name="confirm_password"
                                        className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-green-200"
                                    />
                                    <ErrorMessage component={'div'} name="confirm_password" className="text-red-600 text-sm" />
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id="pass"
                                        onClick={showPasswordToggle}
                                        className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                                    />
                                    <label htmlFor="pass" className="text-sm font-semibold text-gray-500" id="passwordTxt">Show password</label>
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
                                        <span className="font-normal text-gray-500">or Sign Up with</span>
                                        <span className="h-px bg-gray-400 w-14"></span>
                                    </span>
                                    <div className="flex flex-col space-y-4">
                                        <a
                                            className="flex items-center cursor-pointer justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group hover:bg-gray-800 focus:outline-none"
                                            onClick={signInWithGitHub}
                                        >
                                            <span>
                                                <i className="bi bi-github  w-5 h-5 text-gray-800 fill-current group-hover:text-white"></i>
                                            </span>
                                            <span className="text-sm font-medium text-gray-800 group-hover:text-white">Github</span>
                                        </a>
                                        <a
                                            onClick={signInWithGoogle}
                                            className="flex items-center cursor-pointer justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-gray-800 rounded-md group  focus:outline-none"
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

        </main>
    )
}
