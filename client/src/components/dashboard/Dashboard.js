import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProfile, deleteProfile } from '../../services/ProfileServices';

import { setAlert, removeAlerts } from './../../actions/alert';

import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import ExperienceList from './ExperienceList';
import EducationList from './EducationList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserMinus } from '@fortawesome/free-solid-svg-icons';

const Dashboard = ({ user, isAuthenticated, setAlert, removeAlerts }) => {

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

    const onDelete = () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete your profile? (Experience and education included)`);

        if (confirmDelete) {
            setLoading(true);

            deleteProfile(({ msg }) => {
                setProfile(null);
                setLoading(false);
                setAlert('Successfully deleted profile!', 'success');
            }, (error) => {
                alert('There was an error deleting the profile.');
                console.log(error)
                setLoading(false);
            });
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    return loading ? (<Spinner />) : (
        <Fragment>
            <h1 className="large text-primary">
                Dashboard
            </h1>
            <p className="lead">
                <FontAwesomeIcon icon={faUser} /> Welcome {user && user.name}
            </p>

            {profile !== null ? (
                <div>
                    <DashboardActions />
                    <ExperienceList
                        experiences={profile.experience}
                        setProfile={setProfile}
                    />
                    <EducationList
                        education={profile.education}
                        setProfile={setProfile}
                    />

                    <div className="my-2">
                        <button className="btn btn-danger" onClick={() => onDelete()}>
                            <FontAwesomeIcon icon={faUserMinus} /> Delete My Account
                        </button>
                    </div>
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

export default connect(mapStateToProps, { setAlert, removeAlerts })(Dashboard);
