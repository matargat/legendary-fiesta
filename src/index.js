import React from 'react';
import ReactDOM from 'react-dom';
import Dish from './Dish';

//client side að setja component inn í main div
ReactDOM.hydrate(<Dish></Dish>, document.getElementById("main"));