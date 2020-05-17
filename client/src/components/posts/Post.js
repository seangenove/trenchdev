import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { setAlert, removeAlerts } from '../../actions/alert';
import { fetchPostById, addComment, deleteComment } from '../../services/PostsServices';

import Spinner from '../layout/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Post = ({ match, setAlert, removeAlerts }) => {

    const id = match.params.id

    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState(null);
    const [formData, setFormData] = useState({ text: '' });

    const getPost = () => {
        setLoading(true);

        fetchPostById(id, (post) => {
            console.log('Post data  from server', post);

            setPost(post);
            setLoading(false);
        }, (error) => {
            alert('An error occured while fetching post');
            console.log(error);
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        removeAlerts();

        if (!formData.text) {
            setAlert('Please provide text input for your comment.', 'danger')
        } else {
            // Valid form data
            addComment(post._id, formData, (post) => {
                console.log('Post data from server', post);

                setFormData({ text: '' });
                getPost();
                setAlert('Successfully added post!', 'success');
            }, (error) => {
                alert('An error occured in creating the post');
                console.log(error);
            })
        }
    };

    const onDelete = (commentId) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete your comment?`);

        if (confirmDelete) {
            setLoading(true);

            deleteComment(post._id, commentId, (comments) => {
                console.log('Updated comments data from server', comments);

                setAlert('Successfully deleted comment!', 'success');
                getPost();
            }, (error) => {
                alert('An error occured while deleting the post');
                console.log(error)
            })
        }
    }

    useEffect(() => {
        getPost();
    }, []);

    return loading ? (<Spinner />) : (
        <div>
            <Link to="/posts" className="btn">Back To Posts</Link>
            <div className="post bg-white p-1 my-1">
                <div>
                    <Link to={`/profile/${post.user}`}>
                        <img
                            className="round-img"
                            src={`${post.avatar}`}
                            alt=""
                        />
                        <h4>{post.name}</h4>
                    </Link>
                </div>
                <div>
                    <p className="my-1">{post.text}</p>
                </div>
            </div>

            <div className="post-form">
                <div className="bg-primary p">
                    <h3>Leave A Comment</h3>
                </div>
                <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
                    <textarea
                        name="text"
                        cols="30"
                        rows="5"
                        placeholder="Comment on this post"
                        required
                        value={formData.text}
                        onChange={(e) => setFormData({ text: e.target.value })}
                    ></textarea>
                    <input type="submit" className="btn btn-dark my-1" onSubmit={(e) => onSubmit(e)} />
                </form>
            </div>

            {
                post.comments.length !== 0 && (
                    <div className="comments">
                        {
                            post.comments.map((comment, index) => (
                                <div className="post bg-white p-1 my-1" key={index}>
                                    <div>
                                        <Link to={`/profile/${comment.user}`}>
                                            <img
                                                className="round-img"
                                                src={`${comment.avatar}`}
                                                alt=""
                                            />
                                            <h4>{comment.name}</h4>
                                        </Link>
                                    </div>
                                    <div>
                                        <p className="my-1">{comment.text}</p>
                                        <p className="post-date">
                                            Posted on<Moment format='MM/DD/YYYY'>{` ${comment.date}`}</Moment>
                                        </p>
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => onDelete(comment._id)}
                                        >
                                            <FontAwesomeIcon icon={faTimes}/>
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )}
        </div>
    )
};

export default connect(null, { setAlert, removeAlerts })(Post);
