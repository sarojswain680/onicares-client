import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    // const { state, dispatch } = useContext(UserContext);

    const user = localStorage.getItem('jwt');
    const renderList = () => {
        if (user) {
            return [
                <li><Link to="/profile">Profile</Link></li>,
                <li><Link to="/create">Create post</Link></li>
            ]
        } else {
            return [
                <li><Link to="/signin">Login</Link></li>,
                <li><Link to="/signup">Signup</Link></li>
            ]
        }
    }
    return (
        <nav>
            <div className="nav-wrapper #0d47a1 blue darken-4">
                <Link to="#" className="brand-logo left" >Facebook</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar;