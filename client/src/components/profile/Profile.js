import React from 'react';

const Profile = ({ match }) => {
    return (
        <div>
            <p>Profile: {match.params.id}</p>
        </div>
    )
};

export default Profile;
