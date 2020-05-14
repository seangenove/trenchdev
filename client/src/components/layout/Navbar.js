import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../../actions/auth';

import { faCode, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
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
            <a onClick={logout} href="#!">
                <span className="hide-sm">Logout{' '}</span>
                <FontAwesomeIcon icon={faSignOutAlt} />
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
