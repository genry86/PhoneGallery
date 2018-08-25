import { compose, createStore, applyMiddleware } from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import Logic from "../BAL/Logic.js"

import rootReducer from "./reducer"

const deps = {}; //dependencies
const logicMiddleware = createLogicMiddleware(Logic, deps);

const middleware = applyMiddleware(logicMiddleware);

const enhancer = (typeof devToolsExtension !== 'undefined')
    ? compose(middleware, devToolsExtension())
    : middleware;

export default store = createStore(rootReducer, enhancer);
