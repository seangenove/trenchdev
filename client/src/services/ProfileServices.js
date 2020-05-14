import Endpoints from "../config/Endpoints";
import {AppApiRequest} from "./index";

/**
 * Fetch All Faqs for account
 * @param onSuccess
 * @param onFailure
 */
export const fetchProfile = (onSuccess, onFailure) => {
    AppApiRequest(Endpoints.PROFILE, 'GET', onSuccess, onFailure);
};
