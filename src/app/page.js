'use client'
import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState([]);
  const [heading, setHeading] = useState('');
  const [desc, setDesc] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  const handleHeading = (e) => {
    setHeading(e.target.value);
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!heading.trim() && !desc.trim()) {
      return;
    }

    if (editingTask !== null) {
      const updatedTasks = task.map((task) =>
        task.id === editingTask ? { ...task, heading, desc } : task
      );
      setTask(updatedTasks);
      setEditingTask(null);
    } else {
      setTask([...task, { id: task.length, heading, desc }]);
    }

    setHeading('');
    setDesc('');
  };

  const handleDelete = (taskId) => {
    setTask(task.filter(task => task.id !== taskId));
  };

  const handleEdit = (taskId) => {
    if (taskId === editingTask) {
      setHeading('');
      setDesc('');
      setEditingTask(null);
    } else {
      const taskToEdit = task.find(task => task.id === taskId);
      setHeading(taskToEdit.heading);
      setDesc(taskToEdit.desc);
      setEditingTask(taskId);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-sky-200 p-10">
      <h1 className="text-5xl font-mono font-bold mb-10 text-black italic">TO-DO</h1>

      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md bg-black text-black shadow-lg rounded-lg p-8 space-y-4">
        <input onChange={handleHeading} value={heading} placeholder="Task Heading" className="p-2 border rounded focus:ring-yellow-500 outline-none transition-colors duration-200 ease-in-out" />
        <input onChange={handleDesc} value={desc} placeholder="Task Description" className="p-2 border rounded focus:ring-yellow-500 outline-none transition-colors duration-200 ease-in-out" />
        <button type="submit" className="p-2 bg-blue-500 hover:bg-blue-600 transition-colors duration-200 ease-in-out text-black rounded">{editingTask !== null ? 'Update Task' : 'Add Task'}</button>
      </form>

      <ul className="flex flex-col items-center justify-center w-full max-w-md mt-10 space-y-4">
        {task.length === 0 ? (
          <li className="text-center text-black">No Tasks Available</li>
        ) : (
          task.map((task) => (
            <li key={task.id} className="flex flex-col items-start w-full p-4 border rounded-lg shadow-md bg-black text-white hover:shadow-xl transition-shadow duration-300 ease-in-out mb-2">
              <div className="font-bold text-xl">{task.heading}</div>
              <p className="text-gray-700 mt-2">{editingTask === task.id ? 'description' : task.desc}</p>
              <div className="mt-4 flex justify-end space-x-4">
                <button onClick={() => handleDelete(task.id)} className="px-4 py-2 bg-red-500 hover:bg-red-600 transition-colors duration-200 ease-in-out text-black rounded">Delete</button>
                <button onClick={() => handleEdit(task.id)} className="px-4 py-2 bg-green-500 hover:bg-green-600 transition-colors duration-200 ease-in-out text-black rounded">{editingTask === task.id ? 'Cancel Edit' : 'Edit'}</button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
