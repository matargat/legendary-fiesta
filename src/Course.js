import React from 'react'; 
import Form from './Form';
import Comment from './Comment';

export default props=> 
<div>
    <h2>{props.title}</h2>
    <p>{props.about}</p>
    <p>{props.price}</p>
    <Form />
</div>