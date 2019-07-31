import { useReducer } from 'react';

function useStore( initialState ) {

    return useReducer((state, action) => {

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

}

export default useStore;