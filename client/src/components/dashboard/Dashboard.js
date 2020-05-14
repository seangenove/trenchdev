import React, { useState, useEffect } from 'react';
import { fetchProfile } from '../../services/ProfileServices';

const Dashboard = ({ isAuthenticated }) => {

    const [profile, setProfile] = useState(null);

    const getProfile = () => {
        fetchProfile((profile) => {
            console.log('in service', profile);
            setProfile(profile);
        }, (error) => {
            // todo: handle
            console.log(error);
        });
    }

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export default Dashboard;
