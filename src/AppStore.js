import React from 'react';

const AppStore = React.createContext({});
export const AppStoreProvider = AppStore.Provider;
export const AppStoreConsumer = AppStore.Consumer;
export default AppStore;
