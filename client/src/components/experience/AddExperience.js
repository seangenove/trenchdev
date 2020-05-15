import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { setAlert, removeAlerts } from '../../actions/alert';

import { addExperience } from '../../services/ProfileServices';

const AddExperience = ({ setAlert, removeAlerts }) => {

    const [redirect, setRedirect] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
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

        if (!formData.current) {
            setAlert('To ', 'danger');
        }

        if (formData.current && (!formData.title || !formData.company || !formData.from)) {
            setAlert('The job title, company, and from date fields are required', 'danger');

            window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
        } else if (!formData.current && (!formData.title || !formData.company || !formData.from || !formData.to) ) {
            setAlert('The job title, company, and from date fields are required', 'danger');

            window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
        } else {
            console.log('valid form data', formData);

            addExperience(formData, (experience) => {
                console.log('Experience data from server', experience);


                setAlert('Successfully added experience!', 'success');
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
                Add Experience
            </h1>
            <p className="lead">
                <i className="fas fa-code-branch"></i> Add any developer/programming
                positions that you have had in the past
            </p>
            <small>Fields marked with an * are required</small>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <label className="form-label" htmlFor="title">* Job Title</label>
                    <input
                        type="text"
                        placeholder="Enter Job Title"
                        name="title"
                        value={formData.title}
                        onChange={(e) => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="company">* Company</label>
                    <input
                        type="text"
                        placeholder="Enter Company"
                        name="company"
                        value={formData.company}
                        onChange={(e) => onChange(e)}
                        required />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="location">Location</label>
                    <input
                        type="text"
                        placeholder="Enter Location"
                        name="location"
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
                            onChange={(e) => onChange(e)}
                        /> Current Job
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
                    <label className="form-label" htmlFor="description">Job Description</label>
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

export default connect(null, { setAlert, removeAlerts })(AddExperience);