const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express(); 

var http = require('http');
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const port = 8000;
  
app.use(cors());


//API to fetch the coordinates based on the coefficient of restitution selected by the user. The mu is passed through the query params.
app.get('/fetchArrayForGivenMu/:mu1',function(req,res){
    var mu1 = req.params.mu1;
    console.log("mu1",mu1);
    var initialVelocity = 3;
      var thetaO = 45;
      var gravConst = 9.81;
      var thetaI = 0;
      var ti = 0;
      var ti1 = 0;
      var tid = 0;
      var arr = [];
      var arr1 = [];
      var y,x=0;
      var yCoordinateInitial = 2;
      var sinThetaI,cosThetaI,xCoordinate,yCoordinate,yCoordinatepart1,cosSquareTheta,yCoordinatepart2,tanThetaI = 0;
      ti1 = 0;
      for(var i = 0 ; i<7 ; i ++){
        if(i == 0){
          mu  = 1;
          thetaI = thetaO;
        }
        else{ mu = mu1/10;};
        console.log(i);
        console.log("40mu",mu);
         ti = (2*mu*initialVelocity*Math.sin(thetaI))/gravConst;  
 
        for(var j = 0 ; j <11  ; j ++){
          tid = j*(ti/10);
      
         yCoordinate = (mu*initialVelocity*Math.sin(thetaI)*tid) - (0.5*gravConst*tid*tid);

          if(i==0){ xCoordinate = tid; 
          }
          else{
         xCoordinate = tid+ti1;}
         arr.push(xCoordinate);
         arr.push(yCoordinate);
         arr1.push(arr);
         arr = [];     
        }
        ti1 = ti + ti1;
        tanThetaI = mu*Math.sin(thetaI)/Math.cos(thetaO);
        thetaI = Math.atan(tanThetaI);
      }
 res.send(arr1);
 });

app.listen(port, () => console.log("listening on port "+ port));




