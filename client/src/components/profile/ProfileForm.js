import React, { Fragment, useState, useEffect } from 'react';
import { fetchProfile } from '../../services/ProfileServices';

import Spinner from '../layout/Spinner';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faYoutube, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProfileForm = () => {

    const [showSocialInputs, setShowSocialInputs] = useState(false);
    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
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

        console.log(formData);
    }

    useEffect(() => {
        if (!showSocialInputs) {
            setFormData({
                ...formData,
                twitter: '',
                facebook: '',
                linkedin: '',
                youtube: '',
                instagram: '',
            })
        }
    }, [showSocialInputs]);

    return (
        <Fragment>

            <h1 className="large text-primary">Create Your Profile</h1>
            <p className="lead">
                <FontAwesomeIcon icon={faUser} />{' '}Let's get some information to make your profile stand out
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <select
                        name="status"
                        value={formData.status}
                        onChange={(e) => onChange(e)}
                        required
                    >
                        <option value="0">* Select Professional Status</option>
                        <option value="Developer">Developer</option>
                        <option value="Junior Developer">Junior Developer</option>
                        <option value="Senior Developer">Senior Developer</option>
                        <option value="Manager">Manager</option>
                        <option value="Student or Learning">Student or Learning</option>
                        <option value="Instructor">Instructor or Teacher</option>
                        <option value="Intern">Intern</option>
                        <option value="Other">Other</option>
                    </select>
                    <small className="form-text">
                        Give us an idea of where you are at in your career
                    </small>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Company"
                        name="company"
                        value={formData.company}
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">
                        Could be your own company or one you work for
                    </small>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Website"
                        name="website"
                        value={formData.website}
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">
                        Could be your own or a company website
                        </small>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Location"
                        name="location"
                        value={formData.location}
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">
                        City & state suggested (eg. Boston, MA)
                    </small>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="* Skills"
                        name="skills"
                        required
                        value={formData.skills}
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">
                        Please use comma separated values (eg.HTML,CSS,JavaScript,PHP)
                    </small>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Github Username"
                        name="githubusername"
                        value={formData.githubusername}
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">
                        If you want your latest repos and a Github link, include your username
                    </small>
                </div>

                <div className="form-group">
                    <textarea
                        placeholder="A short bio of yourself"
                        name="bio"
                        value={formData.bio}
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">Tell us a little about yourself</small>
                </div>

                <div className="my-2">
                    <button
                        type="button"
                        className="btn btn-light"
                        onClick={() => setShowSocialInputs(!showSocialInputs)}
                    >
                        Add Social Network Links
                    </button>
                    <span>Optional</span>
                </div>

                {showSocialInputs && (
                    <Fragment>
                        <div className="form-group social-input">
                            <FontAwesomeIcon className="fab fa-2x" icon={faTwitter} />
                            <input
                                type="text"
                                placeholder="Twitter URL"
                                name="twitter"
                                value={formData.twitter}
                                onChange={(e) => onChange(e)}
                            />
                        </div>

                        <div className="form-group social-input">
                            <FontAwesomeIcon className="fab fa-2x" icon={faFacebook} />
                            <input
                                type="text"
                                placeholder="Facebook URL"
                                name="facebook"
                                value={formData.facebook}
                                onChange={(e) => onChange(e)}
                            />
                        </div>

                        <div className="form-group social-input">
                            <FontAwesomeIcon className="fab fa-2x" icon={faYoutube} />
                            <input
                                type="text"
                                placeholder="YouTube URL"
                                name="youtube"
                                value={formData.youtube}
                                onChange={(e) => onChange(e)}
                            />
                        </div>

                        <div className="form-group social-input">
                            <FontAwesomeIcon className="fab fa-2x" icon={faLinkedin} />
                            <input
                                type="text"
                                placeholder="Linkedin URL"
                                name="linkedin"
                                value={formData.linkedin}
                                onChange={(e) => onChange(e)}
                            />
                        </div>

                        <div className="form-group social-input">
                            <FontAwesomeIcon className="fab fa-2x" icon={faInstagram} />
                            <input
                                type="text"
                                placeholder="Instagram URL"
                                name="instagram"
                                value={formData.instagram}
                                onChange={(e) => onChange(e)}
                            />
                        </div>
                    </Fragment>
                )}

                <input type="submit" className="btn btn-primary my-1" />
                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
            </form>

        </Fragment>
    )
}

export default ProfileForm;
