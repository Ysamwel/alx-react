import * as notificationsData from '../../../../notifications.json';
import { schema } from 'normalizr';
export default function getAllNotificationsByUser(userId){
    return notificationsData.filter((notification) => notification.author.id === userId).map((notification) => notification.context);
}

const user = new schema.Entity("users")
const message = new schema.Entity('messages', {}, {
    idAttribute: 'guid'
  });

  const notification = new schema.Entity('notifications', {
    author: user,
    context: message
  });
