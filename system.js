'use strict';
const events = require('./modular/events');
require('./modular/team/manager');

events.on('new-flight', (payload)=>{
    let Flight=payload.Flight;
    console.log( "Flight ", Flight);
})
require('./modular/team/pilot');

events.on('took-off', (payload)=>{
    let Flight=payload.Flight;
    console.log( "Flight ", Flight);
})

events.on('arrived', (payload)=>{
    let Flight=payload.Flight;
    console.log( "Flight ", Flight);
})