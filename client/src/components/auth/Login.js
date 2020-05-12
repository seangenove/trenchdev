import React, { Fragment, useState } from 'react';
import axios from 'axios';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {

    const [errors, setErrors] = useState([]);
    const [loginCredentials, setLoginCredentials] = useState({
        email: '',
        password: ''
    });

    const { email, password } = loginCredentials;

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log('Provided credentials', loginCredentials);

        if (!email || !password) {
            alert('Please provide email and password');
        } else {
            // Valid credentials, attempt to authenticate user
            await axios.post('/api/auth', { email, password })
                .then(({ data }) => {
                    setErrors([]);
                    console.log('SUCCESS', data);
                }).catch((error) => {
                    if (error.response.data.errors) {
                        setErrors(error.response.data.errors);
                        console.log('Errors', error.response.data.errors);
                    }
                    console.log(error);
                    alert('An error occured');
                });
        }
    };

    return (
        <Fragment>
            {errors.length !== 0 && (
                <div className="alert alert-danger text-center">
                    Invalid credentials
                </div>
            )
            }
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
                Don't have an account? <a href="register.html">Sign Up</a>
            </p>
        </Fragment>
    )
}

export default Login;
