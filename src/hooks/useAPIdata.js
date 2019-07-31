import { useEffect } from "react";
import config from "../config";
import RestClient from '../agents/RestClient';

const postsClient = new RestClient({ root: config.api.posts });
const commentsClient = new RestClient({ root: config.api.comments });
const profileClient = new RestClient({ root: config.api.profile });

async function seedStore(client, dispatch, actionPrefix) {

    try {

        const data = await client.getJSON()
        dispatch({ type: `${actionPrefix}.DATA`, data });

    } catch (err) {

        dispatch({ type: `${actionPrefix}.ERROR`, err });

    }

}

function useAPIdata(dispatch) {

    useEffect(() => {

        seedStore(postsClient, dispatch, "POSTS");
        seedStore(commentsClient, dispatch, "COMMENTS");
        seedStore(profileClient, dispatch, "PROFILE");

    }, []);

}

export default useAPIdata;