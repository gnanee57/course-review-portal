import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Courses } from './courses';
import { Reviews } from './reviews';


export const ConfigureStore = () => {
    const store = createStore(combineReducers({
            courses: Courses,
            reviews: Reviews,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}