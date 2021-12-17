import React, { useEffect } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import CourseMenu from "./CourseMenuComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import {fetchCourses, fetchReviews, postReview} from "../redux/ActionCreators";
import CourseDetail from "./CourseDetailComponent";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const mapStateToProps = state => {
  return {
    courses: state.courses,
    reviews: state.reviews,
  };
};


const mapDispatchToProps = dispatch => ({
  postReview: (courseId, rating, author, review) => dispatch(postReview(courseId, rating, author, review)),
  fetchCourses: () => {
    dispatch(fetchCourses());
  },
  fetchReviews: () => dispatch(fetchReviews()),
});

function Main(props) {

    // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    props.fetchCourses();
  }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async() => {
    props.fetchReviews();
  }, []);

  const CourseWithId = ({ match }) => {
    return (
      <CourseDetail
        course={
         props.courses.courses.filter(
             course => course.id === match.params.courseId
          )[0]
        }
        isLoading={props.courses.isLoading}
        errMess={props.courses.errMess}
        reviews={props.reviews.reviews.filter(
            review => review.courseId === match.params.courseId
        )}
        reviewsErrMess={props.reviews.errMess}
        postReview={props.postReview}
      />
    );
  };

  return (
    <div>
      <Header />
        <TransitionGroup>
            <CSSTransition key={props.location.key} classNames="page" timeout={300}>
                <Switch location={props.location}>
                    <Route
                        exact
                        path="/courses"
                        component={() => <CourseMenu courses={props.courses} />}
                    />
                    <Route path="/courses/:courseId" component={CourseWithId} />
                    <Redirect to="/courses" />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
      <Footer />
      
      
    </div>
  );
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Main));