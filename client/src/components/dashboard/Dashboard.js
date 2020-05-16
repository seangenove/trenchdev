import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProfile } from '../../services/ProfileServices';

import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import ExperienceList from './ExperienceList';
import EducationList from './EducationList';

const Dashboard = ({ user, isAuthenticated }) => {

    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);

    const getProfile = () => {
        fetchProfile((profile) => {
            console.log(profile);
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

            {profile !== null ? (
                <div>
                    <DashboardActions />
                    <ExperienceList experiences={profile.experience}/>
                    <EducationList education={profile.education}/>
                </div>

            ) : (
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
