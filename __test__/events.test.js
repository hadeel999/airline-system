'use strict';
const PORT = process.env.PORT || 3000;
const ioServer = require('socket.io')(PORT);
const {faker}= require('@faker-js/faker');
const io = require('socket.io-client');
let host = `http://localhost:${process.env.PORT}/airline`;
const systemConnection = io.connect(host);

 
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

    beforeAll(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
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

    afterAll(()=>{
        consoleSpy.mockRestore();
        systemConnection.close();
        ioServer.close();
    });


})
