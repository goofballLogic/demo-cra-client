import React from 'react';
import { AppStoreProvider } from "./AppStore";
import Body from "./Body.js";
import useStore from "./hooks/useStore";

function App() {

  const store = useStore();
  return (
    <AppStoreProvider value={store}>
      <Body />
    </AppStoreProvider>
  );

}

export default App;
