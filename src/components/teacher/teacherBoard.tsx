import React from "react";
import { Link } from "react-router-dom";

const TeacherBoard: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Link to="/quiz"
                  className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg">
                Create Test
            </Link>
        </div>
    );
};

export default TeacherBoard;
