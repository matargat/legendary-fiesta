import React, { useState } from 'react'; 
 
const Form = (props) => {
    const [comment, setComment] = useState({ name: '', email: '', comment:'', rating: '' });

    const publish = (e) => {
        e.preventDefault();
        fetch('http://localhost:3000', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(comment)
        })
        .then((result) => {
            console.log(result)
        })
    }

    const getName = e => {
        setComment({...comment, name: e.target.value})
    };
    const getEmail = e => {
        setComment({...comment, email: e.target.value})
    };
    const getComment = e => {
        setComment({...comment, comment: e.target.value})
    };
    // const getRating = e => {
    //     setComment({...comment, rating: e.target.value})
    // }


    return (

    <div>
        {/* <form action="/process" method="POST" onSubmit={publish}> */}
        <form action="/" method="post" onSubmit={publish}>
        <input type="hidden" name="token" value={props.token}></input>
        
            {/* <input type="hidden" name="_csrf" value="{{csrfToken}}"/> */}
            <label htmlFor="name">Nafn:</label><br/>
            <input name="name" id="name" type="text" onKeyUp={getName}></input><br/>

            <label htmlFor="email">Netfang:</label><br/>
            <input name="email" id="email" type="text" onKeyUp={getEmail}></input><br/>

            <label htmlFor="comment">Athugasemd:</label><br/>
            <input name="comment" id="comment" type="text" onKeyUp={getComment}></input><br/>

            <button type="submit">Senda</button>
        </form>
        
    </div>
    )

 }


export default Form; 