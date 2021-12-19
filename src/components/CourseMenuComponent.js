import React from 'react';
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import {CardHeader} from "@material-ui/core";

function CourseMenu(props) {

    let cardStyle = {
        display: 'block',
        transitionDuration: '0.3s',
        minHeight: '25vw'
    }

    const foundationMenu = props.courses.courses.filter(course => course.level === "foundation").map((course)=> {
        return (
            <div className={"col-lg-3 col-md-6 mb-5"}>
                <Card style={cardStyle}>
                    <Link style={{ textDecoration: 'none' }} to={`/courses/${course.id}`}>
                        <CardHeader
                            titleTypographyProps={{
                                variant: 'display3',
                            }}
                            subheaderTypographyProps={{
                                variant: 'caption',
                            }}
                            title={course.name}
                            subheader={'by ' + course.instructors}
                        />
                        <CardMedia
                            component="img"
                            alt={course.name}
                            image={course.image}
                        />
                    </Link>
                </Card>
            </div>
        );
    });

    const diplomaProgrammingMenu = props.courses.courses.filter(course =>
        course.level === "diplomaProgramming").map((course)=> {
        return (
            <div className={"col-lg-3 col-md-6 mb-5"}>
                <Card style={cardStyle}>
                    <Link style={{ textDecoration: 'none' }} to={`/courses/${course.id}`}>
                        <CardHeader
                            titleTypographyProps={{
                                variant: 'display3',
                            }}
                            subheaderTypographyProps={{
                                variant: 'caption',
                            }}
                            title={course.name}
                            subheader={'by ' + course.instructors}
                        />
                        <CardMedia
                            component="img"
                            alt={course.name}
                            image={course.image}
                        />
                    </Link>
                </Card>
            </div>
        );
    });

    const diplomaDataScienceMenu = props.courses.courses.filter(course =>
        course.level === "diplomaDataScience").map((course)=> {
        return (
            <div className={"col-lg-3 col-md-6 mb-5"}>
                <Card style={cardStyle}>
                    <Link style={{ textDecoration: 'none' }} to={`/courses/${course.id}`}>
                        <CardHeader
                            titleTypographyProps={{
                                variant: 'display3',
                            }}
                            subheaderTypographyProps={{
                                variant: 'caption',
                            }}
                            title={course.name}
                            subheader={'by ' + course.instructors}
                        />
                        <CardMedia
                            component="img"
                            alt={course.name}
                            image={course.image}
                        />
                    </Link>
                </Card>
            </div>
        );
    });

    if(props.courses.isLoading) {
        return(
            <div className = "container">
                <div className = "row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.courses.errMess) {
        return(
            <div className = "container">
                <div className = "row">
                    <h4>{props.courses.errMess}</h4>
                </div>
            </div>
        );
    }
    else
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <h3 className="text-center">COURSES</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <h3 >Foundational Level Courses</h3>
                    {foundationMenu}
                    <h3 >Diploma in Programming Courses</h3>
                    {diplomaProgrammingMenu}
                    <h3 >Diploma in Data Science Courses</h3>
                    {diplomaDataScienceMenu}
                </div>
            </div>
        );           
}



export default CourseMenu;