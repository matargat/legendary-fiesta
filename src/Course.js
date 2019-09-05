import React from 'react'; 
import Form from './Form';
import Comment from './Comment';

export default props=> 
props.title === "column_break"?
<div></div>:
<div>
    <h2>{props.title}</h2>
    <p>{props.about}</p>
    <p>{props.price}</p>
    
    {/* <Form token={props.token} title={props.title}/> */}
    {/* <Comment name={comment.name} email={comment.email} comment={comment.comment}/> */}
    {/* <Comment /> */}
</div>