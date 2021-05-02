import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem,
Button, Modal, ModalBody, ModalHeader  } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Control, Errors, Field } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);



function RenderCampsite({campsite}) {
    return(
        <div className='col-md-5 m-1'>
            <Card >
                <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({comments, postComment, campsiteId}) {

    if (comments){
        return(
            <div className="div col-5-md m-1" key={comments.id}>
                <h4>Comments</h4>
                    {comments.map( comment => 
                        <div className='p-1' key={comment.id}>
                        {comment.text}<br></br>
                        --{comment.author}, {new Intl.DateTimeFormat('en-US', 
                        { year: 'numeric', month: 'short', day: '2-digit'}).format
                        (new Date(Date.parse(comment.date)))}
                        </div>
                        )}
                <CommentForm campsiteId={campsiteId} postComment={postComment} />
            </div>
        );
    };
    return <div />

}

  
function CampsiteInfo(props) {

if (props.isLoading) {
    return(
        <div className="container">
            <div className="row">
                <Loading />
            </div>
        </div>
    )
}  
if(props.errMess) {
    return(
        <div className="container">
            <div className="row">
                <div className="col">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        </div>
    )
}

if (props.campsite) {

    return(
        <div className="container">
        <   div className="row">
                <div className="col">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/directory'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <h2>{props.campsite.name}</h2>
                    <hr />
                </div>
            </div>
        
            <div className='row' key='this.props.campsite.id'>
                <RenderCampsite campsite={props.campsite} />
                <RenderComments 
                comments={props.comments}
                postComment = {props.postComment}
                campsiteId = {props.campsite.id} 
                />
            </div>
        </div>
        );
    }
return <div />;
}



class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false,
            
        };
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(values){ 
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
        this.toggleModal();
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}><i className='fa fa-pencil fa-lg' />&nbsp;&nbsp;

Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                    
                        <LocalForm onSubmit={this.handleSubmit}>
                            <div className='form-group'>
                            <label htmlFor='rating'>Rating</label>
                                <Control.select 
                                className='form-control' 
                                model='.rating' 
                                id='rating' 
                                name='rating'
                                >
                                    <option value='1'>1</option>
                                    <option value='2'>2</option>
                                    <option value='3'>3</option>
                                    <option value='4'>4</option>
                                    <option value='5'>5</option>
                                </Control.select>
                            
                            </div>
                            <div className='form-group'>
                            <label htmlFor='author'>Author</label>
                            
                                <Control.text 
                                className='form-control'
                                model='.author' id='author' 
                                name='author'
                                
                                
                                validators={{
                                    minLength: minLength(2),
                                    maxLength: maxLength(15)
                                }}/>
                            <Errors
                                    className='text-danger'
                                    model='.author'
                                    show='touched'
                                    component='div'
                                    messages={{
                                        
                                        minLength: 'Must be at least 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                            />
                            
                            </div>
                            <div className='form-group'>
                            <label htmlFor='text'>Comment</label>
                            
                                <Control.textarea  
                                className='form-control'
                                model='.text' 
                                id='text' 
                                name='text' 
                                />
                            
                            </div>
                            <Button type='submit' value='submit'>Submit</Button>
                        </LocalForm> 
                    </ModalBody>
                    
                </Modal>
            </React.Fragment>
        )
    }
}


export default CampsiteInfo;

