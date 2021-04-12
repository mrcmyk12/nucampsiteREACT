import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';



class CampsiteInfo extends Component{

    renderCampsite(campsite) {
        return(
            <div className='col-md-5 m-1'>
                <Card >
                    <CardImg top src={campsite.image} alt={this.props.campsite.name} />
                    <CardBody>
                        <CardTitle>{campsite.name}</CardTitle>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }

    renderComments(comments) {

        if (comments){
            return(
                <div className="div col-5-md m-1" key={this.props.campsite.id}>
                    <h4>Comments</h4>
                        {comments.map( comment => 
                            <div className='p-1' key={comment.id}>
                              {comment.text}<br></br>
                              --{comment.author}, {new Intl.DateTimeFormat('en-US', 
                              { year: 'numeric', month: 'short', day: '2-digit'}).format
                              (new Date(Date.parse(comment.date)))}
                            </div>
                            
                         
                    )}
                </div>
            );
        };
        return <div>No Content</div>

    }

  
    render() {

        
        if (this.props.campsite) {

           return(
            <div className='row' key='this.props.campsite.id'>
               {this.renderCampsite(this.props.campsite)}
               {this.renderComments(this.props.campsite.comments)}
            </div>
            );
        }
        
           return(
            <div />
           );
        

    }
}

export default CampsiteInfo;