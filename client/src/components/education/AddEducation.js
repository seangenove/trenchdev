import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { setAlert, removeAlerts } from '../../actions/alert';

import { addEducation } from '../../services/ProfileServices';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const AddEducation = ({ setAlert, removeAlerts }) => {

    const [redirect, setRedirect] = useState(null);
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldOfStudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const onChange = (e) => {
        e.preventDefault();

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();
        removeAlerts();

        if (formData.current && (!formData.school || !formData.degree || !formData.from)) {
            setAlert('The school, degree, and from date fields are required', 'danger');

            window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
        } else if (!formData.current && (!formData.school || !formData.degree || !formData.from || !formData.to) ) {
            setAlert('The school, degree, from date, and to date fields are required', 'danger');

            window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
        } else {
            console.log('valid form data', formData);

            addEducation(formData, (education) => {
                console.log('Education data from server', education);

                setAlert('Successfully added education!', 'success');
                setRedirect('/dashboard');
            }, (error) => {
                console.log(error);
            });
        }

    }

    if (redirect) {
        return <Redirect to={redirect} />
    }

    return (
        <div>
            <h1 className="large text-primary">
                Add Education
            </h1>
            <p className="lead">
                <FontAwesomeIcon icon={faGraduationCap}/> Add any school, bootcamp, etc that
        you have attendeddev
            </p>
            <small>Fields marked with an * are required</small>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <label className="form-label" htmlFor="school">* School or Bootcamp</label>
                    <input
                        type="text"
                        placeholder="Enter Job Title"
                        name="school"
                        value={formData.title}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="degree">* Degree or Certificate</label>
                    <input
                        type="text"
                        placeholder="Enter Company"
                        name="degree"
                        value={formData.company}
                        onChange={(e) => onChange(e)}
                        required />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="fieldOfStudy">Field of Study</label>
                    <input
                        type="text"
                        placeholder="Enter Location"
                        name="fieldOfStudy"
                        value={formData.location}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <h4>* From Date</h4>
                    <input
                        type="date"
                        name="from"
                        value={formData.from}
                        onChange={(e) => onChange(e)}
                    />
                </div>
                <div className="form-group">
                    <p>
                        <input
                            type="checkbox"
                            name="current"
                            value={formData.current}
                            onChange={(e) => setFormData({
                                ...formData,
                                current: !formData.current
                            })}
                        /> Current School or Bootcamp
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input
                        type="date"
                        name="to"
                        value={formData.to}
                        onChange={(e) => onChange(e)}
                        disabled={formData.current}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="description">Program Description</label>
                    <textarea
                        name="description"
                        cols="30"
                        rows="5"
                        placeholder="Enter Job Description"
                        value={formData.description}
                        onChange={(e) => onChange(e)}
                    ></textarea>
                </div>

                <Link to='/dashboard' className="btn btn-light my-1">Go Back</Link>
                <input type="submit" className="btn btn-primary my-1" onClick={(e) => onSubmit(e)} />
            </form>
        </div>
    )
}

export default connect(null, { setAlert, removeAlerts })(AddEducation);