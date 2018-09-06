import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {routerMiddleware, routerReducer} from "react-router-redux";
import thunk from "redux-thunk";
import Parse from "parse";

import {Reducer as CommonReducer} from "./common";
import {Reducer as UserReducer} from "./user";
import {Reducer as LibraryReducer} from "./library";
import {Reducer as TaskReducer} from "./task";
import {Reducer as SearchReducer} from "./search";


import {initStore as commonInitStore} from "./common";
import {initStore as userInitStore} from "./user";

const isBrowser = (typeof window !== 'undefined');
const NODE_ENV = process.env.NODE_ENV || 'development';

export default async (initialState, {req, res, cookies} = {}, history) => {

    if (!initialState && req) {
        initialState = {};
    }

    let middlewares = [
        thunk
    ];

    if (isBrowser) {
        middlewares.push(routerMiddleware(history));
    }

    const store =  createStore(
        combineReducers({
            common: CommonReducer,
            library: LibraryReducer,
            user: UserReducer,
            task: TaskReducer,
            search: SearchReducer,
            router: routerReducer

        }),
        initialState,
        compose(
            applyMiddleware(...middlewares),
            isBrowser && NODE_ENV === 'development' && window['devToolsExtension'] ? window['devToolsExtension']() : f => f
        )
    );

    if (isBrowser)
        return store;



    await store.dispatch(userInitStore(cookies.get('sid')));
    await store.dispatch(commonInitStore());

    return store

}
