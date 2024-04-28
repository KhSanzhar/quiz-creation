import React from "react";
import { Link } from "react-router-dom";

const TeacherBoard: React.FC = () => {
    return (
        <div>
            <h1>Welcome to the teacher dashboard</h1>
            <button className="flex justify-center">
                <Link to="/create" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
                    Create test
                </Link>
            </button>
            
        </div>
    );
};

export default TeacherBoard;