"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast"; // Import react-hot-toast
import Navbar from "@/components/web/Navbar";
import "../app/globals.css";

export default function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
  });
  const [taskLoading, setTaskLoading] = useState(false); // For handling task creation/deletion loading state
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        if (error.response?.status === 401) {
          router.push("/login");
        } else {
          toast.error("Unable to fetch tasks. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [router]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setTaskLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks([...tasks, response.data]);
      setFormData({ title: "", description: "", city: "" });

      toast.success("Task created successfully!");
    } catch (error) {
      toast.error("Error creating task. Please try again.");
      console.error("Error creating task:", error);
    } finally {
      setTaskLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    setTaskLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((task) => task._id !== taskId));

      toast.success("Task deleted successfully!");
    } catch (error) {
      toast.error("Error deleting task. Please try again.");
      console.error("Error deleting task:", error);
    } finally {
      setTaskLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={50} color="#4A90E2" loading={loading} />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>

        {/* Task Form */}
        <form onSubmit={handleCreateTask} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="p-2 border border-gray-300 rounded"
              required
            />
            <input
              type="text"
              placeholder="City"
              value={formData.city}
              onChange={(e) =>
                setFormData({ ...formData, city: e.target.value })
              }
              className="p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            disabled={taskLoading} // Disable the button when creating a task
          >
            {taskLoading ? (
              <ClipLoader size={20} color="#fff" loading={taskLoading} />
            ) : (
              "Add Task"
            )}
          </button>
        </form>

        {/* Task Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="p-4 border border-gray-300 rounded shadow"
            >
              <h2 className="text-lg font-semibold">{task.title}</h2>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">City: {task.city}</p>
              <p className="text-sm text-gray-500">Weather: {task.weather}</p>
              <button
                onClick={() => handleDeleteTask(task._id)}
                className="mt-2 bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                disabled={taskLoading} // Disable the button when deleting a task
              >
                {taskLoading ? (
                  <ClipLoader size={20} color="#fff" loading={taskLoading} />
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
