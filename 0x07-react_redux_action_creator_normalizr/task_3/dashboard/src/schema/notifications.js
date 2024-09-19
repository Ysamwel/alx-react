import * as notificationsData from '../../../../notifications.json';
import { schema } from 'normalizr';
import normalizedData from '../schema/notifications';

export function getAllNotificationsByUser(userId) {
  const { notifications, messages } = normalizedData.entities;
  
  return Object.values(notifications)
    .filter(notification => notification.author === userId)
    .map(notification => messages[notification.context]);
}

const user = new schema.Entity("users")
const message = new schema.Entity('messages', {}, {
    idAttribute: 'guid'
  });

  const notification = new schema.Entity('notifications', {
    author: user,
    context: message
  });
