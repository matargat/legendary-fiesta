import React, { useState } from 'react';
import Course from './Course'; 


const Dish = (props)=> {
    const [courses, setCourses] = useState(props.jsonData || jsonData);
   
    return (
        <div>
            {courses.map((course, i)=>{
                return <Course title={course.title} about={course.about} price={course.price} key={i} token={courses[0].token}/>

            })}
        </div>
    );
}

export default Dish;
