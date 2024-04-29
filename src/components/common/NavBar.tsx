import { Link } from 'react-router-dom';
import React from 'react';

const NavBar: React.FC = () => {
    return(
        <div>
            <nav className='bg-gray-800 p-2 mt-0 fixed w-full z-10 top-0'>
                <div className='container mx-auto flex justify-between'>
                    <div className='flex space-x-7'>
                        <div>
                            <Link to="/" className='flex items-center py-4 px-2'>
                                <span className='font-semibold text-white text-lg'>Uzdikland</span>
                            </Link>
                        </div>
                        <div className='hidden md:flex items-center space x-1'>
                            <Link to="/" className='py-4 px-2 text-gray-300 font-semibold hover:text-white transition duration-300'>Main teacher</Link>
                            <Link to="/student" className='py-4 px-2 text-gray-300 font-semibold hover:text-white transition duration-300'>Main student</Link>
                            <Link to="/results" className='py-4 px-2 text-gray-300 font-semibold hover:text-white transition duration-300'>Results</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;