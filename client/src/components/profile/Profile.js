import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { fetchProfileById, fetchGithubRepositories } from '../../services/ProfileServices';

import Spinner from '../layout/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCheck } from '@fortawesome/free-solid-svg-icons';
import {
    faTwitter,
    faFacebook,
    faYoutube,
    faLinkedin,
    faInstagram,
    faGithub
} from '@fortawesome/free-brands-svg-icons';

const Profile = ({ match }) => {

    const id = match.params.id

    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState(null);
    const [repos, setRepos] = useState(null);

    const getProfileAndRepos = () => {
        setLoading(true);

        fetchProfileById(id, (profile) => {
            setProfile(profile);

            if (profile.githubusername) {
                fetchGithubRepositories(profile.githubusername, (repos) => {
                    setRepos(repos);
                    setLoading(false);
                }, (error) => {
                    alert('An error occured');
                    console.log(error);
                });
            } else {
                setLoading(false);
            }

        }, (error) => {
            alert('An error occured');
            console.log(error);
        });
    }

    useEffect(() => {
        getProfileAndRepos();
    }, []);

    return loading ? (<Spinner />) : (

        <div>
            <Link to='/profiles' className="btn btn-light">Back To Profiles</Link>
            <div className="profile-grid my-1">

                <div className="profile-top bg-primary p-2">
                    <img
                        className="round-img my-1"
                        src={`${profile.user.avatar}`}
                        alt=""
                    />
                    <h1 className="large">{profile.user.name}</h1>
                    <p className="lead">{profile.status}</p>
                    {profile.location && (<p>{profile.location}</p>)}
                    <div className="icons my-1">
                        {
                            profile.website && (
                                <a href={profile.website} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faGlobe} className="fas fa-2x" />
                                </a>
                            )
                        }

                        {
                            profile.social.twitter && (
                                <a href={profile.social.twitter} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faTwitter} className="fas fa-2x" />
                                </a>
                            )
                        }

                        {
                            profile.social.facebook && (
                                <a href={profile.social.facebook} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faFacebook} className="fas fa-2x" />
                                </a>
                            )
                        }

                        {
                            profile.social.linkedin && (
                                <a href={profile.social.linkedin} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faLinkedin} className="fas fa-2x" />
                                </a>
                            )
                        }

                        {
                            profile.social.youtube && (
                                <a href={profile.social.youtube} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faYoutube} className="fas fa-2x" />
                                </a>
                            )
                        }

                        {
                            profile.social.instagram && (
                                <a href={profile.social.instagram} target="_blank" rel="noopener noreferrer">
                                    <FontAwesomeIcon icon={faInstagram} className="fas fa-2x" />
                                </a>
                            )
                        }
                    </div>
                </div>

                {
                    profile.skills.length !== 0 && (
                        <div className="profile-about bg-light p-2">
                            {
                                profile.bio && (
                                    <Fragment>
                                        <h2 className="text-primary">
                                            {profile.user.name.split(' ')[0]}'s Bio
                                        </h2>
                                        <p>{profile.bio}</p>
                                        <div className="line"></div>
                                    </Fragment>
                                )
                            }
                            <h2 className="text-primary">Skill Set</h2>
                            <div className="skills">
                                {
                                    profile.skills.map((skill, index) => (
                                        <div className="p-1" key={index}>
                                            <FontAwesomeIcon icon={faCheck} />{` ${skill}`}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }

                {
                    profile.experience.length !== 0 && (
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {
                                profile.experience.map((experience, index) => (
                                    <div key={index}>
                                        <h3 className="text-dark">{experience.company}</h3>
                                        <p>
                                            <Moment format='MMM YYYY'>{experience.from}</Moment> -{' '}
                                            {experience.current ? 'Present' : <Moment format='MMM YYYY'>{experience.to}</Moment>}
                                        </p>
                                        <p><strong>Position: </strong>{experience.title}</p>
                                        {
                                            experience.description && (
                                                <p>
                                                    <strong>Description: </strong>{experience.description}
                                                </p>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    )
                }

                {
                    profile.education.length !== 0 && (
                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {
                                profile.education.map((education, index) => (
                                    <div key={index}>
                                        <h3 className="text-dark">{education.school}</h3>
                                        <p>
                                            <Moment format='MMM YYYY'>{education.from}</Moment>{' - '}
                                            {education.current ? 'Present' : <Moment format='MMM YYYY'>{education.to}</Moment>}
                                        </p>
                                        <p><strong>Degree: </strong>{education.degree}</p>
                                        <p><strong>Field Of Study: </strong>{education.fieldOfStudy}</p>
                                        {
                                            education.description && (
                                                <p>
                                                    <strong>Description: </strong>{education.description}
                                                </p>
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    )
                }

                {
                    profile.githubusername && (
                        <div className="profile-github">
                            <h2 className="text-primary my-1">
                                <FontAwesomeIcon icon={faGithub} /> Github Repositories
                            </h2>
                            {
                                repos.map((repo) => (
                                    <div className="repo bg-white p-1 my-1" key={repo.name}>
                                        <div>
                                            <h4>
                                                <a
                                                    href={`${repo.html_url}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    {repo.name}
                                                </a>
                                            </h4>
                                            {repo.description && (<p>{repo.description}</p>)}
                                        </div>
                                        <div>
                                            <ul>
                                                <li className="badge badge-primary">Stars: {repo.stargazers_count}</li>
                                                <li className="badge badge-dark">Watchers: {repo.watchers}</li>
                                                <li className="badge badge-light">Forks: {repo.forks}</li>
                                            </ul>
                                        </div>
                                    </div>

                                ))
                            }
                        </div>
                    )
                }

            </div>
        </div>
    )
};

export default Profile;
