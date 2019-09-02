import React from 'react'; 

export default props=> 
<div>
    <form>
        <label htmlFor="name">Nafn:</label><br/>
        <input id="name">{props.name}</input><br/>

        <label htmlFor="mail">Netfang:</label><br/>
        <input id="mail">{props.mail}</input><br/>

        <label htmlFor="comment">Athugasemd:</label><br/>
        <input id="comment">{props.comment}</input><br/>

        <button>Senda</button>
    </form>
    
</div>