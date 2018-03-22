'use strict';

/* eslint-disable no-console */
const https = require('https');

const socketIO = require('socket.io');

const tlscert = require('@sealsystems/tlscert');

tlscert.get().then((keystore) => {
  const server = https.createServer(keystore).listen(3000);
  const io = socketIO(server);

  const eventManagement = io.of('/event/management');

  eventManagement.on('connection', (socket) => {
    console.log('##### got new management connection');

    socket.on('event', (event) => {
      console.log('##### got management event', JSON.stringify(event, null, 2));
    });
  });

  eventManagement.use((socket, next) => {
    console.log('##### in management middleware');
    next();
  });

  const eventNotification = io.of('/event/notification');

  eventNotification.on('connection', (socket) => {
    console.log('##### got new notification connection');

    socket.on('event', (event) => {
      console.log('##### got notification event', JSON.stringify(event, null, 2));
    });
  });

  eventNotification.use((socket, next) => {
    console.log('##### in notification middleware');
    next();
  });
});
