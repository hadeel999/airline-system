'use strict';
const {systemConnection}=require("../modular/pilot/pilot");
const {ioServer}=require("../modular/system/system");
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
        ioServer.emit('new-flight',Flight);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    })

    it('new-flight and took-off events test',async()=>{
        systemConnection.emit('took-off',Flight);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    })

    it('arrived event test',async()=>{
        ioServer.emit('arrived',Flight);
        await consoleSpy();
        expect(consoleSpy).toHaveBeenCalled();
    })

})
