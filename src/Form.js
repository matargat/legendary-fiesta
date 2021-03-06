import React, { useState } from 'react';

const Form = (props) => {
    const [comment, setComment] = useState({ name: '', email: '', comment: '', rating: '' });
    const [emailError, setEmailError] = useState({});
    const [commentError, setCommentError] = useState({});

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
        setComment({ ...comment, name: e.target.value })
    };
    const getEmail = e => {
        setComment({ ...comment, email: e.target.value })
    };
    const getComment = e => {
        setComment({ ...comment, comment: e.target.value })
    };

    console.log("emailError", emailError);
    if(props.errors){
        props.errors.forEach((error)=>{
            if(error.param === "email" && !emailError.param) {
                setEmailError(error)
            }
            else if(error.param === "comment" && !commentError.param){
                setCommentError(error)
            }
        })
    }
    console.log(props.errors);
    console.log("emailError", emailError);
    return (

        <div>
            <form action={"/comments/" + props.title} method="post" onSubmit={publish}>
                <input type="hidden" name="token" value={props.token}></input>

                <input type="hidden" name="title" value={props.title}></input>

                <label htmlFor="name">Nafn:</label><br />
                <input name="name" id="name" type="text" onKeyUp={getName} required></input><br />

                <label htmlFor="email">Netfang:</label><br />
                <input name="email" id="email" type="email" onKeyUp={getEmail} required></input><br />

                <p>{emailError? emailError.msg:null}</p>

                <label htmlFor="comment">Athugasemd:</label><br />
                <input name="comment" id="comment" type="text" onKeyUp={getComment}></input><br />

                <p>{commentError? commentError.msg:null}</p>
                <p>Einkunn:</p>
                <select required >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3" selected>3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <br />

                <button type="submit">Senda</button>
            </form>

        </div>
        
    )
        
}


export default Form; 