import React, {useState} from 'react';
import {
    Card, CardImg, CardBody, CardText, CardHeader, Breadcrumb, BreadcrumbItem, Button, Modal,
    ModalHeader, ModalBody, ModalFooter, Row, Col, Label, CardSubtitle, CardTitle
} from 'reactstrap';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import moment from "moment";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const ReviewForm = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleSubmit = (values) => {
        toggleModal();
        props.postReview(props.courseId, values.rating, values.author, values.review);
        // console.log('Current State is: ' + JSON.stringify(values));
        // alert('Current State is: ' + JSON.stringify(values));
        // event.preventDefault();
    }

    const closeBtn = <Button className="close" onClick={toggleModal}>&times;</Button>;

    return(
        <div>
            <Button color="success" onClick = {toggleModal}>
                            <i class="fa fa-pencil" aria-hidden="true"></i>&nbsp;Review Course</Button>
            <Modal isOpen={isModalOpen} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal} close={closeBtn}>Review :: {props.courseName}</ModalHeader>
                <ModalBody>
                    <div className="col-12">
                        <LocalForm onSubmit={(values) => handleSubmit(values)} >
                            <Row className="form-group">
                            <Label htmlFor="rating">Rate the Course: </Label>
                                <Col>
                                <Control.select model=".rating" name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author">Name</Label>
                                <Col>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Name"
                                        className="form-control" 
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required! ',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="review">Your Comment</Label>
                                <Col>
                                    <Control.textarea model=".review" id="review" name="review"
                                        rows="6"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".review"
                                        show="touched"
                                        messages={{
                                            required: 'Required! '
                                        }}
                                    />
                                </Col>
                            </Row>
                            <ModalFooter>
                                <Button type="submit" value="submit" color="primary">Submit</Button>{' '}
                                <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                            </ModalFooter>
                        </LocalForm>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );  
}

function renderCourse(props) {

    if (props.errMess) {
        return(
            <div className = "container">
                <div className = "row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.course != null) {
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card body outline className={'border-0'}>
                        <CardHeader style={{backgroundColor: '#e6e5ff'}}>
                            <CardTitle tag="h5" style={{
                                justifyContent: 'center',
                                fontFamily: 'Trebuchet MS',
                            }}>{props.course.name}</CardTitle>
                            <CardSubtitle className="mb-2 text-muted" style={{
                                justifyContent: 'center',
                                fontFamily: 'Trebuchet MS',
                                fontStyle: 'italic',
                                fontSize: 'small',
                            }}>by {props.course.instructors}</CardSubtitle>
                        </CardHeader>
                    <CardBody>
                        <CardImg top src={props.course.image} alt={props.course.name} />
                        <CardText style={{
                            justifyContent: 'center',
                            fontFamily: 'Trebuchet MS',
                            fontStyle: 'italic',
                            fontSize: 'small',
                            fontWeight: 'bold'
                        }}>{props.course.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>

        );
    }
    
}

function CourseDetail(props) {
    let reviews;
    if(props.reviews != null) {
        reviews = <Stagger in>
            {props.reviews.map((review)=> {
                return (
                    <Fade in>
                        <ul key={review.id}>
                            <div>{review.review}</div>
                            <div>{review.rating} stars</div>
                            <div>-- {review.author} , {moment(review.date).format("MMM Do YY")}
                            </div>
                        </ul>
                    </Fade>
                );
            })}
        </Stagger>
    }
    

    if (props.isLoading) {
        return (
            <div className = "container">
                <div className = "row">
                    <Loading />
                </div>
            </div>
        );
    } 

    else if(props.course != null)
        return (
            <>
                <div className="container mt-5">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link style={{ textDecoration: 'none' }} to="/courses">
                            All Courses</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.course.name}</BreadcrumbItem>
                    </Breadcrumb>              
                </div>
                <div className="row">
                    <div  className="col-12 col-md-5 m-3">
                    {renderCourse(props)}
                    </div>
                    <div  className="col-12 col-md-4 m-5">
                        <h3>Reviews</h3>
                        {reviews}
                        <ReviewForm
                        postReview={props.postReview}
                        courseId={props.course.id}
                        courseName={props.course.name}
                        />
                    </div>
                </div>
            </div>
            </>
        );
}

export default CourseDetail;
