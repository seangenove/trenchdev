import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import { register } from './../../actions/auth';
import { setAlert, removeAlerts } from './../../actions/alert';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Register = ({ setAlert, removeAlerts, register }) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        return () => {
            removeAlerts();
        }
    }, [removeAlerts])

    const { name, email, password, confirmPassword } = formData;

    const onSubmit = async (e) => {
        e.preventDefault();
        removeAlerts();

        if (!name || !email || !password || !confirmPassword ||
            password.length < 6 || confirmPassword.length < 6) {
            setAlert('Please provide valid credentials', 'danger');
        } else if (password !== confirmPassword) {
            setAlert('Passwords do not match', 'danger');
        } else {
            console.log('Valid data', formData);
            const newUser = { name, email, password };

            register(newUser);
        }
    }

    return (
        <Fragment>
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
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </Fragment>
    )
}

export default connect(null, { setAlert, removeAlerts, register })(Register);
