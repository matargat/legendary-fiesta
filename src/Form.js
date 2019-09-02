import React from 'react'; 

export default props=> 
<div>
    <form>
        <input>{props.name}</input>
        <input>{props.mail}</input>
        <input>{props.comment}</input>
    </form>
    
</div>