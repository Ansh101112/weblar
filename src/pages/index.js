import Image from "next/image";
import "../app/globals.css";
import Navbar from "@/components/web/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center p-6">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Welcome to the Task Manager App
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Easily organize, manage, and track your tasks in one place. Start
            managing your tasks with ease today!
          </p>

          {/* Image with centering */}
          <div className="flex justify-center mb-6">
            <Image
              src="https://static.vecteezy.com/system/resources/previews/011/466/698/non_2x/business-task-management-illustration-concept-on-white-background-vector.jpg"
              alt="Task Management Illustration"
              width={400}
              height={300}
            />
          </div>

          <div className="flex justify-center gap-4">
            <Link href="/login">
              <p className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Login
              </p>
            </Link>
            <Link href="/tasks">
              <p className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                Get Started
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
