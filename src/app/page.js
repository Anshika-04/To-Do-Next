'use client';
import React, { useState, useEffect } from "react";
import { TrashIcon, PencilAltIcon } from '@heroicons/react/solid';

export default function Home() {
  const initialTasks = typeof window !== 'undefined' ? localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [] : [];
  const [task, setTask] = useState(initialTasks);
  const [heading, setHeading] = useState('');
  const [desc, setDesc] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(task));
  }, [task]);

  const handleHeading = (e) => setHeading(e.target.value);
  const handleDesc = (e) => setDesc(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!heading.trim() || !desc.trim()) return;

    if (editingTask !== null) {
      const updatedTasks = task.map((taskItem) =>
        taskItem.id === editingTask ? { ...taskItem, heading, desc } : taskItem
      );
      setTask(updatedTasks);
      setEditingTask(null);
    } else {
      setTask([...task, { id: Date.now(), heading, desc }]);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 to-black p-10">
      <h1 className="text-6xl font-extrabold mb-10 text-white text-center tracking-wide font-sans">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">TO-DO</span>
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-md bg-white shadow-2xl rounded-lg p-8 space-y-4 transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-indigo-500/20">
        <input 
          onChange={handleHeading} 
          value={heading} 
          placeholder="Task Heading" 
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 ease-in-out bg-gray-50"
        />
        <input 
          onChange={handleDesc} 
          value={desc} 
          placeholder="Task Description" 
          className="p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all duration-200 ease-in-out bg-gray-50"
        />
        <button 
          type="submit" 
          className="p-3 bg-indigo-600 text-white rounded-md transition-all duration-200 ease-in-out transform hover:scale-102 hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-50 active:scale-98"
        >
          {editingTask !== null ? 'Update Task' : 'Add Task'}
        </button>
      </form>

      {task.length === 0 && (
        <p className="text-white mt-4 text-right w-full max-w-md italic">No Tasks Available</p>
      )}

      {task.length > 0 && (
        <div className="w-full max-w-md mt-10">
          <div className="bg-white text-black rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl">
            {task.map((taskItem, index) => (
              <React.Fragment key={taskItem.id}>
                {index > 0 && <hr className="border-gray-200" />}
                <div className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="font-semibold text-lg text-indigo-700">{taskItem.heading}</div>
                  <p className="mt-2 text-gray-600">{taskItem.desc}</p>
                  <div className="mt-4 flex justify-end items-center space-x-3">
                    <button 
                      onClick={() => handleDelete(taskItem.id)} 
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200 transform hover:scale-110"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleEdit(taskItem.id)} 
                      className="text-gray-400 hover:text-green-500 transition-colors duration-200 transform hover:scale-110"
                    >
                      <PencilAltIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
