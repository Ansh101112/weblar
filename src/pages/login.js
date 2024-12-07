import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from "@/components/web/Navbar";
import "../app/globals.css";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast"; // Import react-hot-toast

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://weblar-backend-pdm6.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );

      const token = response.data.token;
      if (token) {
        localStorage.setItem("token", token); // Store token for authenticated requests

        // Show success toast message
        toast.success("Login successful!");

        // Add a delay before redirecting to the tasks page
        setTimeout(() => {
          router.push("/tasks");
        }, 2000);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
      toast.error(error); // Show error toast message
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto flex sm:flex-nowrap flex-wrap">
          <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
            <iframe
              width="100%"
              height="100%"
              className="absolute inset-0"
              frameBorder="0"
              title="map"
              marginHeight="0"
              marginWidth="0"
              scrolling="no"
              src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
            ></iframe>
          </div>
          <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
            <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
              Login Here
            </h2>
            <p className="leading-relaxed mb-5 text-gray-600">
              Login to view your tasks and weather updates
            </p>

            {loading && (
              <div className="flex justify-center mb-4">
                <ClipLoader color="#4A90E2" loading={loading} size={35} />
              </div>
            )}

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            <form onSubmit={handleLogin}>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="password"
                  className="leading-7 text-sm text-gray-600"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                disabled={loading}
              >
                Login
              </button>
            </form>
            <Link href="/register">
              <p className="text-xs text-gray-500 mt-3">
                New user? Register here
              </p>
            </Link>
          </div>
        </div>
      </section>
      <Toaster></Toaster>
    </>
  );
};

export default Login;
