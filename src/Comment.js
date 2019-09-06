import React from 'react';

const Comment = (props)=>{

    return(
        <div>
            <p>Nafn:<br/>{props.name}</p>
            <p>Netfang:<br/>{props.email}</p>
            <p>Athugasemd:<br/>{props.comment}</p><br/>
        </div>
    )
}


export default Comment; 

