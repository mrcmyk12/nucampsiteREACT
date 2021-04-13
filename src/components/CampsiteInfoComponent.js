import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';





function RenderCampsite({campsite}) {
    return(
        <div className='col-md-5 m-1'>
            <Card >
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardTitle>{campsite.name}</CardTitle>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>
        </div>
    )
}

function RenderComments({comments}) {

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
            </div>
        );
    };
    return <div />

}

  
function CampsiteInfo(props) {

        
if (props.campsite) {

    return(
        <div className="container">
            <div className='row' key='this.props.campsite.id'>
                <RenderCampsite campsite={props.campsite} />
                <RenderComments comments={props.campsite.comments} />
            </div>
        </div>
        );
    }
return <div />;
}


export default CampsiteInfo;

