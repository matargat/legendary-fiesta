import express from 'express';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import fetch from 'isomorphic-fetch';
import csurf from 'csurf';
import session from 'express-session';
import bodyParser from 'body-parser';
import Dish from './src/Dish';
import Details from './src/Details';
import {check, validationResult} from 'express-validator'; 
import compression from 'compression';

const app = express();
const csrfProtection = csurf({ cookie: false })

app.use(compression({
    filter: function () { return true; }
  }));
app.use(express.static('./dist'));
app.use(
    bodyParser.urlencoded({extended:false})
);
app.use(session({
    secret: 'Kaffi er gott'
  }))


// app.use((req, res, next)=> {
//     res.set('Cache-Control', 'public, max-age=31557600'); // one year
//     res.set('Content-Encoding', 'gzip')
//     next()
// })

let menuItems = [];

const fetchData = () => {
    fetch("http://www.fiskmarkadurinn.is/wp-json/acf/v3/pages/10")
        .then(r => r.json())
        .then(json => {
            menuItems = [...json.acf.column_2, ...json.acf.column_3, ...json.acf.column_4, ...json.acf.column_5,];
            // console.log(menuItems);
            fs.readFile('./rettir', 'utf8', (err, data) => {
                // console.log(data);
                //setjum JSON.parse til þess að fá json format en ekki streng.
                const dataArr = JSON.parse(data);

                dataArr.map((fileCourse) => {

                    const match = menuItems.reduce((sum, apiCourse) => {
                        if (fileCourse.title === apiCourse.title) {
                            return sum + 1
                        }

                        else {
                            return sum + 0
                        }
                    }, 0)

                    if (!match) {
                        fs.writeFile('./archive', JSON.stringify(fileCourse), () => {
                            console.log(fileCourse + " going to archive");
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

app.get("/", csrfProtection, (req, res) => {
    menuItems[0].token = req.csrfToken()
    fetch("http://localhost:3000/menu")
        .then(r => r.json())
        .then(json => {
            const markup = ReactDOMServer.renderToString(<Dish jsonData={json} />)
            res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <script>const jsonData = ${JSON.stringify(json)}</script>
            </head>
            <body>
                <div id="main">${markup}</div>
                <script src="/main.js"></script>
                
            </body>
            </html>`
            );
        }
        )
})



app.post('/comments/:title', [
    check('name').isLength({ min: 3 }).trim().escape().withMessage('ATH! nafn verður að vera a.m.k. 3 bókstafir'),
    check('email').isEmail().normalizeEmail().withMessage('ógilt netfang'),
    check('comment').isLength({ max: 500 }).matches(/^(?!.*(já|nei|svartur|hvítur|orkupakki)).*$/).withMessage('ATH! það má ekki nota orðin: "já", "nei", "svartur", "hvítur" eða "orkupakki"')
], (req, res) => { 

    fs.readFile('./comments', 'utf8', (err, data)=>{
        const allComments = JSON.parse(data);
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            res.status(422)
        }
        else {
            allComments.push(req.body);
            fs.writeFile('./comments', JSON.stringify(allComments), (err) => {
                if (err) throw err;
                console.log('Comment added')
    
               
            });
        }
        
        const selectedCourse = menuItems.filter((course)=>{
            return course.title === req.params.title
        })[0]
    
    
        const titleMatch = allComments.filter((comment)=>{
            return req.params.title === comment.title
        })

        const markup = ReactDOMServer.renderToString(<Details errors={errors.array()} title={selectedCourse.title} about={selectedCourse.about} price={selectedCourse.price} token={menuItems[0].token} comments={titleMatch}/>)
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
                <script src="/main.js"></script>
                
            </body>
            </html>`
        )
    })

    
    
})

app.get('/comments/:title', (req, res) => { 
    const selectedCourse = menuItems.filter((course)=>{
        return course.title === req.params.title
    })[0]

    fs.readFile('./comments', 'utf8', (err, data)=>{
        const commentsArr = JSON.parse(data);

            const titleMatch = commentsArr.filter((comment)=>{
                return req.params.title === comment.title
            })
    
            const markup = ReactDOMServer.renderToString(<Details title={selectedCourse.title} about={selectedCourse.about} price={selectedCourse.price} token={menuItems[0].token} comments={titleMatch}/>)
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
                    <script src="/main.js"></script>
                    
                </body>
                </html>`
            )
        });
 
})

app.get('/test/:test', (req, res)=>{
    res.send(req.params.test)
})

app.listen(3000, () => console.log("listening to port 3000")); 