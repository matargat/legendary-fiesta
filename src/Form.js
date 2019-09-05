import React, { useState } from 'react'; 
 
const Form = (props) => {
    const [comment, setComment] = useState({ name: '', email: '', comment:'', rating: '' });
    const [emailError, setEmailError] = useState({ });
    const [commentError, setCommentError] = useState({ });

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
    console.log(emailError);
    // if(props.errors){
    //     props.errors.forEach((error)=>{
    //         if(error.param === "email") {
    //             setEmailError(error)
    //         }
    //         else if(error.param === "comment"){
    //             setCommentError(error)
    //         }
    //     })
    // }
    console.log(props.errors);
    return (

    <div>
        <form action={"/comments/"+props.title} method="post" onSubmit={publish}>
        <input type="hidden" name="token" value={props.token}></input>

        <input type="hidden" name="title" value={props.title}></input>

            <label htmlFor="name">Nafn:</label><br/>
            <input name="name" id="name" type="text" onKeyUp={getName}></input><br/>

            <label htmlFor="email">Netfang:</label><br/>
            <input name="email" id="email" type="text" onKeyUp={getEmail}></input><br/>

            {/* <p>{emailError? props.error:null}</p> */}
            
            <label htmlFor="comment">Athugasemd:</label><br/>
            <input name="comment" id="comment" type="text" onKeyUp={getComment}></input><br/>

            {/* <p>{commentError? props.error:null}</p> */}

            <button type="submit">Senda</button>
        </form>
        
    </div>
    )

 }


export default Form; 