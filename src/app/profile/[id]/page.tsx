import { Toaster } from "react-hot-toast";

export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Toaster />
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        Profile Page{" "}
        <span className="bg-blue-400 text-black rounded p-2 font-semibold">
          {params.id}
        </span>
      </p>
    </div>
  );
}
