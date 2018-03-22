'use strict';

/* eslint-disable no-console */
const io = require('socket.io-client');

const baseUrl = 'https://IntelliJ:3000';
const management = io(`${baseUrl}/event/management`, { rejectUnauthorized: 0 });

management.on('connect', () => {
  console.log('management event upstream connected to server.');
  management.emit('event', { message: 'management' });
  management.close();
});

management.on('connect_error', (err) => {
  console.log('management connect_error event upstream.', err);
});

management.on('connect_timeout', (err) => {
  console.log('management connect_timeout event upstream.', err);
});

management.on('error', (err) => {
  console.log('management error event upstream.', err);
});

management.on('reconnecting', (attempt) => {
  console.log('management event upstream reconnecting.', attempt);
});

management.on('reconnect_error', (err) => {
  console.log('management event upstream reconnect_error', err);
});
management.on('reconnect_failed', (err) => {
  console.log('management event upstream reconnect_failed', err);
});

const notification = io(`${baseUrl}/event/notification`);

notification.on('connect', () => {
  console.log('notification event upstream connected to server.');
  notification.emit('event', { message: 'notificationt' });
  notification.close();
});

notification.on('error', (err) => {
  console.log('notification error event upstream.', err);
});

notification.on('reconnecting', (attempt) => {
  console.log('notification event upstream reconnecting.', attempt);
});
