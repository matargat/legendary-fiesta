import React from 'react';

const Comment = (props)=>{

    return(
        <div>
            <p>Nafn:<br/>{props.name}</p><br/>
            <p>Netfang:<br/>{props.email}</p><br/>
            <p>Athugasemd:<br/>{props.comment}</p><br/>
        </div>
    )
}


export default Comment; 

