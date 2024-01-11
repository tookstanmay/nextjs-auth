"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);

      if (response.data.status === 400) {
        toast.error(response.data.error);
        return;
      } else {
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing..." : "SignUp"}</h1>
        <hr />
        <div className="flex flex-col m-4">
          <div className="flex flex-col m-2">
            <label className="w-full text-left" htmlFor="username">
              username
            </label>
            <input
              className="border border-gray-400 rounded-md p-2 text-black"
              id="username"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              placeholder="username"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="email">email</label>
            <input
              className="border border-gray-400 rounded-md p-2 text-black"
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="email"
            />
          </div>
          <div className="flex flex-col m-2">
            <label htmlFor="password">password</label>
            <input
              className="border border-gray-400 rounded-md p-2 text-black"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
            />
          </div>
          <div className="flex flex-col m-2 mt-6">
            <button
              className="border border-gray-400 rounded-md p-2 hover:bg-white hover:border-black hover:text-black disabled:bg-black disabled:text-white disabled:border-gray-400 disabled:cursor-not-allowed"
              disabled={buttonDisabled}
              onClick={onSignup}
            >
              {buttonDisabled ? "Fill Details" : "SignUp"}
            </button>
          </div>
          <Link href={"/login"} className="text-center">
            Login here
          </Link>
        </div>
      </div>
      <Toaster />
    </>
  );
}
