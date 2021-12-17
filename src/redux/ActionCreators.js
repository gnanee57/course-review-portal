import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseurl';

export const addReview = (review) => ({
    type: ActionTypes.ADD_REVIEW,
    payload: review
});

export const postReview = (courseId, rating, author, review) => (dispatch) => {

    const newReview = {
        courseId: courseId,
        rating: rating,
        author: author,
        review: review
    };
    newReview.date = new Date().toISOString();
    
    return fetch(baseUrl + 'reviews', {
        method: 'POST',
        body: JSON.stringify(newReview),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(response =>  dispatch(addReview(newReview)))
    .catch(error =>  { console.log('post reviews', error.message);
        alert('Your review could not be posted\nError: '+error.message);
    });
};

export const fetchCourses = () => (dispatch) => {

    dispatch(coursesLoading(true));
    return fetch(baseUrl + 'courses')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                let error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                let errmess = new Error(error.message);
                throw errmess;
            })
        .then(response => response.json())
        .then(courses =>  dispatch(addCourses(courses)))
        .catch(error =>  dispatch(coursesFailed(error.message)));
}

export const coursesLoading = () => ({
    type: ActionTypes.COURSES_LOADING
});

export const coursesFailed = (errmess) => ({
    type: ActionTypes.COURSES_FAILED,
    payload: errmess
});

export const addCourses = (courses) => ({
    type: ActionTypes.ADD_COURSES,
    payload: courses
});

export const fetchReviews = () => (dispatch) => {

    return fetch(baseUrl + 'reviews')
        .then(response => {
            if(response.ok) {
                return response;
            }
            else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(reviews =>  dispatch(addReviews(reviews)))
        .catch(error => dispatch(reviewsFailed(error.message)));
}

export const reviewsFailed = (errmess) => ({
    type: ActionTypes.REVIEWS_FAILED,
    payload: errmess
});

export const addReviews = (reviews) => ({
    type: ActionTypes.ADD_REVIEWS,
    payload: reviews
});