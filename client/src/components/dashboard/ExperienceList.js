import React from 'react';
import Moment from 'react-moment';

import { deleteExperience } from '../../services/ProfileServices';

const ExperienceList = ({ experiences, setProfile }) => {

    const onDelete = (id) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete this experience credential?`);

        if (confirmDelete) {

            deleteExperience(id, (profile) => {
                console.log('Updated profile from server', profile);
                setProfile(profile);
            }, (error) => {
                alert("There was a problem deleting the experience entry");
                console.log(error);
            })
        }
    }

    return experiences.length === 0 ? (<p>No experiences added.</p>) : (
        <div>
            <h2 className="my-2">Experience</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        experiences.map(({ _id, company, title, from, to, current }) => (
                            <tr key={_id}>
                                <td>{company}</td>
                                <td className="hide-sm">{title}</td>
                                <td className="hide-sm">
                                    <Moment format='MM/DD/YYYY'>{from}</Moment> -{' '}
                                     {current ? 'Now' : <Moment format='MM/DD/YYYY'>{to}</Moment>}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => onDelete(_id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ExperienceList;