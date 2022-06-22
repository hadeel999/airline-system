'use strict';
const events = require('../modular/events')
const {faker}= require('@faker-js/faker');

describe('Events Test', () => {

    let consoleSpy;
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

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log');
    });

    it('new-flight event test',async()=>{
        events.emit('new-flight',Flight);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    })

    it('took-off event test',async()=>{
        events.emit('took-off',Flight);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    })

    it('arrived event test',async()=>{
        events.emit('arrived',Flight);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    })

})
