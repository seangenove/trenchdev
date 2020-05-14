import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import { login } from '../../actions/auth';
import { removeAlerts } from './../../actions/alert';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = ({ login, removeAlerts, isAuthenticated }) => {

    const [loginCredentials, setLoginCredentials] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        return () => {
            removeAlerts();
        }
    }, [removeAlerts])

    const { email, password } = loginCredentials;

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('Provided credentials', loginCredentials);

        if (!email || !password) {
            alert('Please provide email and password');
        } else {
            // Valid credentials, attempt to authenticate user
            login(email, password);
        }
    };
    
    // Redirect if logged in
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <FontAwesomeIcon icon={faUser} /> Sign Into Your Account
            </p>
            <form className="form" action="dashboard.html" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        required
                        value={email}
                        onChange={(e) => setLoginCredentials({
                            ...loginCredentials,
                            email: e.target.value
                        })}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setLoginCredentials({
                            ...loginCredentials,
                            password: e.target.value
                        })}
                    />
                </div>
                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                    onClick={(e) => onSubmit(e)}
                />
            </form>
            <p className="my-1">

                Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated 
});

export default connect(mapStateToProps, { login, removeAlerts })(Login);
