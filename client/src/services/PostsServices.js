import Endpoints from "../config/Endpoints";
import { AppApiRequest } from "./index";

export const fetchPosts = (onSuccess, onFailure) => {
    AppApiRequest(Endpoints.POSTS, 'GET', onSuccess, onFailure);
};

export const createPost = (data, onSuccess, onFailure) => {
    AppApiRequest(Endpoints.POSTS, 'POST', onSuccess, onFailure, data);
};

export const deletePost = (postId, onSuccess, onFailure) => {
    AppApiRequest(`${Endpoints.POSTS}/${postId}`, 'POST', onSuccess, onFailure);
};


export const addLike = (postId, onSuccess, onFailure) => {
    AppApiRequest(`${Endpoints.POST_LIKE}/${postId}`, 'POST', onSuccess, onFailure);
};

export const removeLike = (postId, onSuccess, onFailure) => {
    AppApiRequest(`${Endpoints.POST_UNLIKE}/${postId}`, 'POST', onSuccess, onFailure);
};