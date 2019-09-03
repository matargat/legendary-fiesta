import express from 'express';
import fs from 'fs';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Dish from './src/Dish';
import fetch from 'isomorphic-fetch';
import csurf from 'csurf';
import session from 'express-session';
import bodyParser from 'body-parser'

const app = express();
const csrfProtection = csurf({ cookie: false })

app.use(express.static('./dist'));
app.use(
    bodyParser.urlencoded({extended:false})
);
app.use(session({
    secret: 'Kaffi er gott'
  }))

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
                const oldCourse = [];

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
            </head>
            <body>
                <div id="main">${markup}</div>
                <script src="dist/main.js"></script>
                
            </body>
            </html>`
            );
        }
        )
})

// // CSURF

// // setup route middlewares
// const csrfProtection = csrf({ cookie: true })
// const parseForm = bodyParser.urlencoded({ extended: false })

// // parse cookies
// // we need this because "cookie" is true in csrfProtection
// app.use(cookieParser())

// app.get('/form', csrfProtection, function (req, res) {
//   // pass the csrfToken to the view
//   res.send('send', { csrfToken: req.csrfToken() })
// })

// app.post('/process', parseForm, csrfProtection, function (req, res) {
//   res.send('data is being processed')
// })

app.post('/', (req, res) => {
    fs.appendFile('./comments', JSON.stringify(req.body), (err) => {
        if (err) throw err;
        console.log('Comment added')
    })
})

app.listen(3000, () => console.log("listening to port 3000")); 