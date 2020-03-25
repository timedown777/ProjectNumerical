import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Router,Route,Link,browserHistory} from 'react-router'
import Bi from './bisection';
import FP from './flaseposition';
import OP from './onepoint';
import NT from './newton';
import SC from './secant';


ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}/>
    <Route path="/bisections" component={Bi}/>
    <Route path="/flaseposition" component={FP}/>
    <Route path="/onepoint" component={OP}/>
    <Route path="/newton" component={NT}/>
    <Route path="/secant" component={SC}/>
  </Router>,document.getElementById('root')
);