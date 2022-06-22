'use strict';
const { faker } =require('@faker-js/faker');
const events = require("../../modular/events");


events.on('arrived', (payload)=>{
    setTimeout(() => {
        console.log(`Manager: we're greatly thankful for the amazing flight, ${payload.Details.pilot}`);            
    }, 10);
})

setInterval(()=>{
    let Flight={
        event:'new-flight',
        time:faker.date.future(),
        Details:{
            airLine:'Royal Jordanian Airlines',
            flightID:faker.datatype.uuid(),
            pilot:`${faker.name.firstName()} ${faker.name.lastName()}`,
            destination:`${faker.address.city()}, ${faker.address.country()}`    
        }
    };
    console.log("-------------------------------------");
    console.log(`Manager: new flight with ID '${Flight.Details.flightID}' have been scheduled`);
    let payload = {Flight:Flight,Details:Flight.Details};
    events.emit('new-flight',payload);

},10000)