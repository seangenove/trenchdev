import React, { Fragment, useState } from 'react';
import axios from 'axios';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Register = () => {

    const [errors, setErrors] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = formData;

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !confirmPassword ||
            password.length < 6 || confirmPassword.length < 6) {

            alert('Please provide valid credentials');

        } else if (password !== confirmPassword) {

            alert('Passwords do not match');

        } else {
            console.log('Valid data', formData);

            const newUser = { name, email, password };

            await axios.post('/api/users', newUser)
                .then(({ data }) => {
                    console.log(data);
                }).catch((error) => {
                    if (error.response) {
                        console.log('Errors', error.response.data.errors);
                        setErrors(error.response.data.errors)
                    }
                    console.log(error);
                    alert('An error occured');
                });
        }
    }

    return (
        <Fragment>
            {errors.length !== 0 && (
                <div className="alert alert-danger text-center">
                    {errors.map(error => (<p>{error}</p>))}
                </div>
            )
            }
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <FontAwesomeIcon icon={faUser} /> Create Your Account
            </p>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        required
                        value={name}
                        onChange={(e) => setFormData({
                            ...formData,
                            name: e.target.value
                        })}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={(e) => setFormData({
                            ...formData,
                            email: e.target.value
                        })}
                    />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image, use a Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        value={password}
                        onChange={(e) => setFormData({
                            ...formData,
                            password: e.target.value
                        })}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        value={confirmPassword}
                        onChange={(e) => setFormData({
                            ...formData,
                            confirmPassword: e.target.value
                        })}
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" onClick={(e) => onSubmit(e)} />
            </form>
            <p className="my-1">
                Already have an account? <a href="login.html">Sign In</a>
            </p>
        </Fragment>
    )
}

export default Register;
