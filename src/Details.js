import React from 'react';
import Course from './Course';
import Form from './Form';
import Comment from './Comment';

const Details = (props)=> {
  
    return (
        <div>
            
            <Course title={props.title} about={props.about} price={props.price} token={props.token}/>
            <Form token={props.token} title={props.title} />

            {props.comments.map((comment, i)=>{
                return (
                    <Comment name={comment.name} email={comment.email} comment={comment.comment} key={i}/>
                    
                )
            })}
            
        </div>
    );
}

export default Details;