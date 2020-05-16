import React, { Fragment, useState, useEffect } from 'react';
import Moment from 'react-moment';
// import { fetchProfile } from '../../services/ProfileServices';

const EducationList = ({ education }) => {

    const deleteEducation = (id) => {
        console.log('delete', id);
    }

    return education.length === 0 ? (<p>No education added.</p>) : (
        <div>
            <h2 className="my-2">Education</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        education.map(({ _id, school, degree, from, to, current }) => (
                            <tr key={_id}>
                                <td>{school}</td>
                                <td className="hide-sm">{degree}</td>
                                <td className="hide-sm">
                                    <Moment format='MM/DD/YYYY'>{from}</Moment> -{' '}
                                     {current ? 'Now' : <Moment format='MM/DD/YYYY'>{to}</Moment>}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteEducation(_id)}
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

export default EducationList;
