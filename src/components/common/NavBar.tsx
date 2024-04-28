import { Link } from 'react-router-dom';
import React from 'react';

const NavBar: React.FC = () => {
    return(
        <nav>
            <Link to="/">Main teacher</Link>
            <Link to="/student">Main student</Link>
            <Link to="/results">Results</Link>
        </nav>
    );
};

export default NavBar;