import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

import { fetchPosts } from '../../services/PostsServices';

import Spinner from '../layout/Spinner';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faCheck } from '@fortawesome/free-solid-svg-icons';

const Post = ({ match }) => {

    const id = match.params.id

    const [loading, setLoading] = useState(true);
    const [profiles, setProfiles] = useState(null);

    const getPosts = () => {
        setLoading(true);

        fetchPosts((posts) => {
            console.log('Posts data  from server', posts);

            setPosts(posts);
            setLoading(false);
        }, (error) => {
            alert('An error occured');
            console.log(error);
        });
    }

    useEffect(() => {
        getPosts();
    }, []);

    return loading ? (<Spinner />) : (
        <div>
            <h1 class="large text-primary">
                Posts
      </h1>
            <p class="lead">
                <i class="fas fa-user"></i> Welcome to the community!
            </p>

            <div class="posts">
                {
                    posts.length !== 0 && posts.map((post) => (
                        <Fragment>
                            <div class="post bg-white p-1 my-1">
                                <div>
                                    <a href="profile.html">
                                        <img
                                            class="round-img"
                                            src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                                            alt=""
                                        />
                                        <h4>John Doe</h4>
                                    </a>
                                </div>
                                <div>
                                    <p class="my-1">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint
              possimus corporis sunt necessitatibus! Minus nesciunt soluta
              suscipit nobis. Amet accusamus distinctio cupiditate blanditiis
              dolor? Illo perferendis eveniet cum cupiditate aliquam?
            </p>
                                    <p class="post-date">
                                        Posted on 04/16/2019
            </p>
                                    <button type="button" class="btn btn-light">
                                        <i class="fas fa-thumbs-up"></i>
                                        <span>4</span>
                                    </button>
                                    <button type="button" class="btn btn-light">
                                        <i class="fas fa-thumbs-down"></i>
                                    </button>
                                    <a href="post.html" class="btn btn-primary">
                                        Discussion <span class='comment-count'>2</span>
                                    </a>
                                    <button
                                        type="button"
                                        class="btn btn-danger"
                                    >
                                        <i class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
};

export default Post;
