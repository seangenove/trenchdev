import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProfile } from '../../services/ProfileServices';

import Spinner from '../layout/Spinner';

import { faUserCircle, faGraduationCap, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dashboard = ({ user, isAuthenticated }) => {

    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);

    const getProfile = () => {
        fetchProfile((profile) => {
            console.log('in service', profile);

            setProfile(profile);
            setLoading(false);
        }, (error) => {
            console.log(error);

            setLoading(false);
        });
    }

    useEffect(() => {
        getProfile();
    }, []);

    return loading ? (<Spinner />) : (
        <Fragment>
            <h1 className="large text-primary">
                Dashboard
             </h1>
            <p className="lead"><i className="fas fa-user"></i> Welcome {user && user.name} </p>
            <div className="dash-buttons">
                <a href="#" className="btn btn-light">
                    <FontAwesomeIcon className="text-primary" icon={faUserCircle} /> Edit Profile
                </a>
                <a href="#" className="btn btn-light">
                    <FontAwesomeIcon className="text-primary" icon={faUserTie} /> Add Experience
                </a>
                <a href="#" className="btn btn-light">
                    <FontAwesomeIcon className="text-primary" icon={faGraduationCap} /> Add Education
                </a>
            </div>

            {profile !== null ? (<h1>Has profile</h1>) : (
                <Fragment>
                    <p>You have no profile, please add some info</p>
                    <Link to='/create-profile' className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </Fragment>
            )}
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Dashboard);
