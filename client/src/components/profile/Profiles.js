import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllProfiles } from '../../services/ProfileServices';

import Spinner from '../layout/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNetworkWired, faCheck } from '@fortawesome/free-solid-svg-icons';

const Profiles = () => {

    const [loading, setLoading] = useState(true);
    const [profiles, setProfiles] = useState(null);

    const getProfiles = () => {
        setLoading(true);

        fetchAllProfiles((profiles) => {
            console.log(profiles)

            setProfiles(profiles);
            setLoading(false);
        }, (error) => {
            alert('An error eccoured');
            console.log(error);
        })
    }

    useEffect(() => {
        getProfiles();
    }, []);

    return loading ? (<Spinner />) : (profiles.length === 0 ? (<p>No profiles</p>) : (
        <div>
            <h1 className="large text-primary">Developers</h1>
            <p className="lead">
                <FontAwesomeIcon icon={faNetworkWired} /> Browse and connect with developers
            </p>
            <div className="profiles">
                {
                    profiles.map(({ user, status, location, skills }) => (
                        <div className="profile bg-light" key={user._id}>
                            <img
                                className="round-img"
                                src={`${user.avatar}`}
                                alt=""
                            />
                            <div>
                                <h2>{user.name}</h2>
                                <p>{status}</p>
                                {location && <p>{location}</p>}
                                <Link to={`/profile/${user._id}`} className="btn btn-primary">
                                    View Profile
                                </Link>
                            </div>

                            <ul>
                                {
                                    skills.map((skill, index) => (
                                        <li className="text-primary" key={`${user._id}-${skill}`}>
                                            <FontAwesomeIcon icon={faCheck} />{` ${skill}`}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    ))
                }
            </div>
        </div>
    ));
};

export default Profiles