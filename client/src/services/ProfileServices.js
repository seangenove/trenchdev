import Endpoints from "../config/Endpoints";
import { AppApiRequest } from "./index";

/**
 * Fetch All Faqs for account
 * @param onSuccess
 * @param onFailure
 */
export const fetchProfile = (onSuccess, onFailure) => {
    AppApiRequest(Endpoints.USER_PROFILE, 'GET', onSuccess, onFailure);
};

export const upsertProfile = (data, onSuccess, onFailure) => {
    AppApiRequest(Endpoints.PROFILE, 'POST', onSuccess, onFailure, data);
};

export const addExperience = (data, onSuccess, onFailure) => {
    AppApiRequest(Endpoints.ADD_EXPERIENCE, 'POST', onSuccess, onFailure, data);
};

export const addEducation = (data, onSuccess, onFailure) => {
    AppApiRequest(Endpoints.ADD_EDUCATION, 'POST', onSuccess, onFailure, data);
};
