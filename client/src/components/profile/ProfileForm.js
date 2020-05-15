import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchProfile, upsertProfile } from '../../services/ProfileServices';
import { setAlert, removeAlerts } from '../../actions/alert';

import Spinner from '../layout/Spinner';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faFacebook, faYoutube, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ProfileForm = ({ isCreateMode = true, setAlert, removeAlerts }) => {

    const [loading, setLoading] = useState(true);
    const [redirect, setRedirect] = useState(null);
    const [showSocialInputs, setShowSocialInputs] = useState(false);
    const [profile, setProfile] = useState(null);
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

    const getProfile = () => {
        fetchProfile((profile) => {
            console.log('edit profile', profile);

            setProfile(profile);
            setFormData({
                ...formData,
                company: !profile.company ? '' : profile.company,
                website: !profile.website ? '' : profile.website,
                location: !profile.location ? '' : profile.location,
                status: !profile.status ? '' : profile.status,
                skills: !profile.skills ? '' : profile.skills.join(', '),
                githubusername: !profile.githubusername ? '' : profile.githubusername,
                bio: !profile.bio ? '' : profile.bio,
                twitter: !profile.social.twitter ? '' : profile.social.twitter,
                facebook: !profile.social.facebook ? '' : profile.social.facebook,
                linkedin: !profile.social.linkedin ? '' : profile.social.linkedin,
                youtube: !profile.social.youtube ? '' : profile.social.youtube,
                instagram: !profile.social.instagram ? '' : profile.social.instagram,
            });
            setLoading(false);

            if (profile.social.twitter || profile.social.facebook || profile.social.linkedin ||
                profile.social.youtube || profile.social.instagram) {
                console.log('meron');
                setShowSocialInputs(true);
            }
        }, (error) => {
            console.log(error);

        });
    }

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

        if (!formData.status && !formData.skills) {
            setAlert('The status and skills fields are required', 'danger')
        } else if (!formData.status || !formData.skills) {
            setAlert(`The ${formData.status ? 'skills' : 'status'} field is required`, 'danger')
        } else {
            // Validation success
            console.log(formData);

            upsertProfile(formData, (profile) => {
                console.log('Profile data from server', profile);

                setAlert(`Successfully ${isCreateMode ? 'created' : 'updated'} profile!`, 'success');
                setRedirect('/dashboard');
            }, (error) => {
                console.log(error);
            });
        }
    }

    useEffect(() => {
        removeAlerts();

        if (!isCreateMode) {
            getProfile();
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isCreateMode && !showSocialInputs) {
            setFormData({
                ...formData,
                twitter: '',
                facebook: '',
                linkedin: '',
                youtube: '',
                instagram: '',
            })
        } else if (!isCreateMode && showSocialInputs) {
            setFormData({
                ...formData,
                twitter: !profile.social.twitter ? '' : profile.social.twitter,
                facebook: !profile.social.facebook ? '' : profile.social.facebook,
                linkedin: !profile.social.linkedin ? '' : profile.social.linkedin,
                youtube: !profile.social.youtube ? '' : profile.social.youtube,
                instagram: !profile.social.instagram ? '' : profile.social.instagram,
            })
        }
    }, [showSocialInputs]);

    if (redirect) {
        return <Redirect to={redirect}></Redirect>
    }

    return loading ? (<Spinner />) : (
        <Fragment>

            <h1 className="large text-primary">{isCreateMode ? 'Create' : 'Update'} Your Profile</h1>
            <p className="lead">
                <FontAwesomeIcon icon={faUser} />{' '}Let's get some information to make your profile stand out
            </p>
            <small>Fields marked with an * are required</small>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <label className="form-label" htmlFor="status">* Professional Status</label>
                    <select
                        name="status"
                        required
                        value={formData.status === '' ? '* Select Professional Status' : formData.status}
                        onChange={(e) => onChange(e)}
                    >
                        <option disabled> * Select Professional Status</option>
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
                    <label className="form-label" htmlFor="company">Company</label>
                    <input
                        type="text"
                        placeholder="Enter company"
                        name="company"
                        value={formData.company}
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">
                        Could be your own company or one you work for
                    </small>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="website">Website</label>
                    <input
                        type="text"
                        placeholder="Enter website"
                        name="website"
                        value={formData.website}
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">
                        Could be your own or a company website
                        </small>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="location">Location</label>
                    <input
                        type="text"
                        placeholder="Enter location"
                        name="location"
                        value={formData.location}
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">
                        City & state suggested (eg. Boston, MA)
                    </small>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="skills">Skills</label>
                    <input
                        type="text"
                        placeholder="Enter skills"
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
                    <label className="form-label" htmlFor="githubusername">Github Username</label>
                    <input
                        type="text"
                        placeholder="Enter Github Username"
                        name="githubusername"
                        value={formData.githubusername}
                        onChange={(e) => onChange(e)}
                    />
                    <small className="form-text">
                        If you want your latest repos and a Github link, include your username
                    </small>
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="bio">Bio</label>
                    <textarea
                        placeholder="Enter a short bio of yourself"
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

                <a className="btn btn-light my-1" href="dashboard.html">Go Back</a>
                <input type="submit" className="btn btn-primary my-1" onClick={(e) => onSubmit(e)} />
            </form>

        </Fragment>
    )
}

export default connect(null, { setAlert, removeAlerts })(ProfileForm);
