"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response);

      toast.success("Login Successful");
      router.push("/profile");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing..." : "Login"}</h1>
      <hr />
      <div className="flex flex-col m-4">
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
            onClick={onLogin}
          >
            {buttonDisabled ? "Fill Details" : "Login"}
          </button>
        </div>
        <Link href={"/signup"} className="text-center">
          SignUp here
        </Link>
      </div>
    </div>
  );
}
