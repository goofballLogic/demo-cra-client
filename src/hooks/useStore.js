import { useReducer, useEffect } from 'react';
import config from "../config";
import RestClient from '../agents/RestClient';

const postsClient = new RestClient({ root: config.api.posts });
const commentsClient = new RestClient({ root: config.api.comments });
const profileClient = new RestClient({ root: config.api.profile });
const initialState = { posts: {}, comments: {}, profile: {} };

const seedStore = (client, dispatch, actionPrefix) =>
    client.getJSON()
        .then(data => dispatch({ type: `${actionPrefix}.DATA`, data }))
        .catch(err => dispatch({ type: `${actionPrefix}.ERROR`, err }));

function useStore() {

    const [store, dispatch] = useReducer((state, action) => {

        const actionType = (action.type || '').split('.');
        const stateKey = actionType[0].toLowerCase();

        switch (actionType[1]) {
            case "DATA":
                return { ...state, [stateKey]: { data: action.data } };
            case "ERROR":
                return { ...state, [stateKey]: { err: action.err } };
            default:
                throw new Error(`Unknown action type: ${JSON.stringify(action)}`);
        }

    }, initialState);

    useEffect(() => {

        seedStore(postsClient, dispatch, "POSTS");
        seedStore(commentsClient, dispatch, "COMMENTS");
        seedStore(profileClient, dispatch, "PROFILE");

    }, []);

    return store;

}

export default useStore;