import express from 'express';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Dish from './src/Dish';
import fetch from 'isomorphic-fetch';

const app = express();
let menuItems = [];

const fetchData = () => {
    fetch("http://www.fiskmarkadurinn.is/wp-json/acf/v3/pages/10")
        .then(r => r.json())
        .then(json => {
            menuItems = [...json.acf.column_2, ...json.acf.column_3, ...json.acf.column_4, ...json.acf.column_5,];
            // console.log(menuItems);

            fs.readFile('./rettir', 'utf8', (err, data)=>{
                // console.log(data);
                //setjum JSON.parse til þess að fá json formatti en ekki streng.
                const dataArr = JSON.parse(data); 
                const oldCourse = []; 

                dataArr.map((fileCourse)=>{
                    
                    const match =  menuItems.reduce((sum, apiCourse)=>{
                        if(fileCourse.title === apiCourse.title){
                            return sum+1
                        }
                        
                        else{
                            return sum+0
                        }
                    },0)
                    
                    if(!match){
                        fs.writeFile('./archive', JSON.stringify(fileCourse), ()=>{
                            console.log(fileCourse +" going to archive");
                        })
                    }
                })
                fs.writeFile('./rettir', JSON.stringify(menuItems), () => {
                    console.log("menu er komið inn í rettir");
                })

            })
        })
}
setInterval(() => fetchData(), 86400000);
fetchData();


app.get("/menu", (req, res) => {
    res.send(menuItems);
})

app.get("/", (req, res) => {
    fetch("http://localhost:3000/menu")
    .then(r=>r.json())
    .then(json=> {
        const markup = ReactDOMServer.renderToString(<Dish jsonData={json}/>)
        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <div id="main">${markup}</div>
                <script src="dist/main.js"></script>
            </body>
            </html>`
        );
    }
        
    )




    // const appComponent = ReactDOMserver.renderToString(<App menu={menuItems}/>);
    // fs.readFile('./index.html', 'utf-8', (err, data) => {
    //     const responseStr = data.replace('<div id="main"></div>', `<div id="main">${appComponent}</div>`);
    //     res.send(responseStr);
    // })
})

// app.get("/test", (req, res) => {
//     fs.readFile('./index.html', 'utf-8', (err, data) => {

//         fs.readFile('./rettir', 'utf-8', (err, data2) => {
//             const responseStr = data.replace('<div id="main"></div>',
//                 `<div id="main">
//                 <h2>${JSON.parse(data2)[0].title}</h2>
//                 <p>${JSON.parse(data2)[0].about}</p>
//                 <p>${JSON.parse(data2)[0].price}</p>
//             </div > `
//         );
//         res.send(responseStr);
//         })
//     })
// })

app.listen(3000, () => console.log("listening to port 3000")); 