'use strict';

/* eslint-disable no-console */
const socketIO = require('socket.io');
const tlscert = require('@sealsystems/tlscert');
const server = require('https').createServer(tlscert.get());

const io = socketIO(server);
const eventManagement = io.of('/event/management');

eventManagement.on('connection', (socket) => {
  console.log('##### got new management connection');

  socket.on('event', (event) => {
    console.log('##### got management event', JSON.stringify(event, null, 2));
  });
});

eventManagement.use((socket, next) => {
  console.log('##### in middleware');
  next();
});

const eventNotification = io.of('/event/notification');

eventNotification.on('connection', (socket) => {
  console.log('##### got new notification connection');

  socket.on('event', (event) => {
    console.log('##### got notification event', JSON.stringify(event, null, 2));
  });
});

server.listen(3000);
