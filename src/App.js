import React, { useEffect } from 'react';
import { AppStoreProvider } from "./AppStore";
import Body from "./Body.js";
import useStore from "./hooks/useStore";
import config from "./config";
import RestClient from './agents/RestClient';

const postsClient = new RestClient({ root: config.api.posts });
const commentsClient = new RestClient({ root: config.api.comments });
const profileClient = new RestClient({ root: config.api.profile });
const initialState = { posts: {}, comments: {}, profile: {} };

const seedStore = (client, dispatch, actionPrefix) =>
    client.getJSON()
        .then(data => dispatch({ type: `${actionPrefix}.DATA`, data }))
        .catch(err => dispatch({ type: `${actionPrefix}.ERROR`, err }));

function App() {

  const [ store, dispatch ] = useStore( initialState );
  useEffect(() => {

    seedStore(postsClient, dispatch, "POSTS");
    seedStore(commentsClient, dispatch, "COMMENTS");
    seedStore(profileClient, dispatch, "PROFILE");

  }, []);

  return (
    <AppStoreProvider value={store}>
      <Body />
    </AppStoreProvider>
  );

}

export default App;
