const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = express.Router();
const app = express();
app.use(bodyParser.json());

const carmanufacturer = require('./carmake.json');
const carmodel = require('./carmodel.json');
const theftDevice = require('./antitheft.json');

router.get(['/api/loaddata/year'], function (req, res) {
    let years = [];
    let currentyear = new Date().getFullYear();
    //years.push('Pre-1980')
    for (i = 1980; i <= currentyear; i++) {
        years.push(i);
    }
    years.reverse();
    years.splice(years.length, 0, 'Pre-1980');
    let response = Object.assign({}, successResponse, { data: years })
    sendResponse(res, 200, response);
});

router.get(['/api/loaddata/carmanufacturer'], function (req, res) {
    let response = Object.assign({}, successResponse, { data: carmanufacturer })
    sendResponse(res, 200, response);
});

router.get(['/api/loaddata/carmodel/:make'], function (req, res) {
    let make = req.params.make;
    //console.log(make);
    let filtered = carmodel[make];
    let response = Object.assign({}, successResponse, { data: filtered })
    sendResponse(res, 200, response);
});

router.get(['/api/loaddata/antitheft'], function (req, res) {
    let response = Object.assign({}, successResponse, { data: theftDevice })
    sendResponse(res, 200, response);
});


let preference = {
    "reqProcessingTime": 1000
}

let successResponse = {
    operationStatus: {
        statusCode: '0',
        statusMessage: 'Success'
    }
}

const sendResponse = (res, statusCode, data) => {
    setTimeout(() => {
        res.status(statusCode).json(data);
    }, preference.reqProcessingTime);
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin", "X-Requested-With", "Content-Type", "Accept");
    next();
});

app.use(router);

app.listen(3001, () => {
    console.log('Application running at -- http://localhost:3001');
})