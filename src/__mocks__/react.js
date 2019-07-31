const React = jest.requireActual("react");
const patchedReact = { ...React };
module.exports = patchedReact;

const { act } = require('react-test-renderer');
patchedReact.useReducer = function(reducer, initialState) {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [ state, dispatch ] = React.useReducer(reducer, initialState);
    return [ state, x => {
        act(() => dispatch(x))

    }];

};