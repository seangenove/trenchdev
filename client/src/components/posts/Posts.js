import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { setAlert, removeAlerts } from '../../actions/alert';
import { fetchPosts, deletePost, addLike, removeLike } from '../../services/PostsServices';

import Spinner from '../layout/Spinner';
import PostForm from './PostForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown, faTimes } from '@fortawesome/free-solid-svg-icons';

const Posts = ({ userId, setAlert, removeAlerts }) => {

    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState(null);

    const getPosts = (useLoadingEffect = false) => {
        if (useLoadingEffect) {
            setLoading(true);
        }

        fetchPosts((posts) => {
            setPosts(posts);
            setLoading(false);
        }, (error) => {
            alert('An error occured');
            console.log(error);
        });
    }

    const onLike = (post) => {
        const isLiked = post.likes.some((like) => like.user === userId);

        if (!isLiked) {
            addLike(post._id, (likes) => {
                getPosts();
            }, (error) => {
                alert('Error on like/unlike');
                console.log(error);
            });
        } else {
            alert('You have already liked this post.');
        }
    }

    const onUnlike = (post) => {
        const isLiked = post.likes.some((like) => like.user === userId);

        if (isLiked) {
            removeLike(post._id, (likes) => {
                getPosts();
            }, (error) => {
                alert('Error on like/unlike');
                console.log(error);
            });
        } else {
            alert('You have not liked this post yet. Unable to unlike.');
        }
    }

    const onDelete = (postId) => {
        const confirmDelete = window.confirm(`Are you sure you want to delete this post?`);

        if (confirmDelete) {
            setLoading(true);

            deletePost(postId, ({ msg }) => {

                setAlert('Successfully deleted post!', 'success');
                getPosts();
            }, (error) => {
                alert('An error occured while deleting the post');
                console.log(error)
            })
        }
    }

    useEffect(() => {
        return () => {
            removeAlerts();
        }
    }, [removeAlerts])

    useEffect(() => {
        setLoading(true);
        getPosts();
    }, []);

    return loading ? (<Spinner />) : (
        <div>
            <h1 className="large text-primary">
                Posts
         </h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome to the community!
            </p>
            <PostForm getPosts={getPosts} />

            <div className="posts">
                {
                    posts.length !== 0 && posts.map((post, index) => (
                        <div className="post bg-white p-1 my-1" key={index}>
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
                                <p className="post-date">
                                    Posted on <Moment format='MM/DD/YYYY'>{post.date}</Moment>
                                </p>

                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => onLike(post)}
                                >
                                    <FontAwesomeIcon icon={faThumbsUp} />
                                    <i className="fas fa-thumbs-up"></i>
                                    {post.likes.length !== 0 && (<span>{` ${post.likes.length}`}</span>)}
                                </button>

                                <button
                                    type="button"
                                    className="btn btn-light"
                                    onClick={() => onUnlike(post)}
                                >
                                    <FontAwesomeIcon icon={faThumbsDown} />
                                </button>

                                <Link to={`/post/${post._id}`} className="btn btn-primary">
                                    {'Discussion '}
                                    {
                                        post.comments.length !== 0 && (
                                            <span className='comment-count'>
                                                {`${post.comments.length}`}
                                            </span>
                                        )
                                    }
                                </Link>

                                {
                                    userId === post.user && (
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={() => onDelete(post._id)}
                                        >
                                            <FontAwesomeIcon icon={faTimes} />
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

const mapStateToProps = (state) => ({
    userId: state.auth.user._id
})

export default connect(mapStateToProps, { setAlert, removeAlerts })(Posts);
