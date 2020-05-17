import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert, removeAlerts } from '../../actions/alert';

import { createPost } from '../../services/PostsServices';

const PostForm = ({ getPosts, setAlert, removeAlerts }) => {

    const [formData, setFormData] = useState({
        text: ''
    });

    const onSubmit = (e) => {
        e.preventDefault();
        removeAlerts();

        if (!formData.text) {
            setAlert('Please provide text input for your post.', 'danger')
        } else {
            // Valid form data
            createPost(formData, (post) => {
                console.log('Post data from server', post);

                setFormData({ text: '' })
                getPosts(true);
                setAlert('Successfully added post!', 'success');
            }, (error) => {
                alert('An error occured in creating the post');
                console.log(error);
            })
        }
    };

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Say Something...</h3>
            </div>
            <form className="form my-1" onSubmit={(e) => onSubmit(e)}>
                <textarea
                    name="text"
                    cols="30"
                    rows="5"
                    placeholder="Create a post"
                    required
                    value={formData.text}
                    onChange={(e) => setFormData({
                        ...formData,
                        text: e.target.value
                    })}
                >
                </textarea>
                <input
                    type="submit"
                    className="btn btn-dark my-1"
                    onClick={(e) => onSubmit(e)}
                />
            </form>
        </div>
    )
};

export default connect(null, { setAlert, removeAlerts })(PostForm);