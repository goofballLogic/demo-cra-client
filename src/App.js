import React from 'react';
import { AppStoreProvider } from "./AppStore";
import Body from "./Body.js";
import useStore from "./hooks/useStore";
import useAPIdata from './hooks/useAPIdata';

const initialState = { posts: {}, comments: {}, profile: {} };

function App() {

  const [store, dispatch] = useStore(initialState);
  useAPIdata(dispatch);

  return (
    <AppStoreProvider value={store}>
      <Body />
    </AppStoreProvider>
  );

}

export default App;
