'use strict';

/* eslint-disable no-process-env, no-console */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const io = require('socket.io-client');

const baseUrl = 'https://localhost:3000';
const management = io(`${baseUrl}/event/management`);

management.on('connect', () => {
  console.log('management event upstream connected to server.');
  management.emit('event', { message: 'management' });
  management.close();
});

management.on('error', (errSockio) => {
  console.log('management error event upstream.', { err: errSockio });
});

management.on('reconnecting', (attempt) => {
  console.log('management event upstream reconnecting.', { attempt });
});

const notification = io(`${baseUrl}/event/notification`);

notification.on('connect', () => {
  console.log('notification event upstream connected to server.');
  notification.emit('event', { message: 'notificationt' });
  notification.close();
});

notification.on('error', (errSockio) => {
  console.log('notification error event upstream.', { err: errSockio });
});

notification.on('reconnecting', (attempt) => {
  console.log('notification event upstream reconnecting.', { attempt });
});
