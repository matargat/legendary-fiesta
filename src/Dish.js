import React, { useState } from 'react';
import Course from './Course'; 


const Dish = (props)=> {
    const [courses, setCourses] = useState(props.jsonData);
   
    return (
        <div>
            {courses.map((course, i)=>{
                return <Course title={course.title} about={course.about} price={course.price} key={i}/>

            })}
            {/* <Comment /> */}
        </div>
    );
}

export default Dish;


// import React from 'react';

// export default props => <h1>{props.menu.map(menuItem=><div>{menuItem.title}</div>)}</h1>;
// {
//     return(
//         <div>
//             <Dish />
//         </div>
//     )

// }

// gera componenta með propsi