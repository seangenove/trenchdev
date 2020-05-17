import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../actions/auth';

import { faCode, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Navbar = ({ isAuthenticated, loading, logout }) => {
    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/">
                    <FontAwesomeIcon icon={faCode} /> TrenchDev
                </Link>
            </h1>

            {!loading && (isAuthenticated ? (<AuthLinks logout={logout} />) : (<GuestLinks />))}
        </nav >
    );
};

const AuthLinks = ({ logout }) => (
    <ul>
        <li>
            <Link to="/posts">
                <span className="hide-sm">{' '}Posts</span>
            </Link>
        </li>
        <li>
            {` | `}
            <Link to="/dashboard">
                <FontAwesomeIcon icon={faUser} />
                <span className="hide-sm">{' '}Dashboard</span>
            </Link>
        </li>
        <li>
            <a onClick={logout} href="#!">
                <FontAwesomeIcon icon={faSignOutAlt} />
                <span className="hide-sm">{' '}Logout</span>
            </a>
        </li>
    </ul>
)

const GuestLinks = () => (
    <ul>
        <li>
            <Link to="/profiles">Developers</Link>
        </li>
        <li>
            <Link to="/register">Register</Link>
        </li>
        <li>
            <Link to="/login">Login</Link>
        </li>
    </ul>
)

const mapStateToProps = (state) => ({
    loading: state.auth.loading,
    isAuthenticated: state.auth.isAuthenticated,

})

export default connect(mapStateToProps, { logout })(Navbar);
