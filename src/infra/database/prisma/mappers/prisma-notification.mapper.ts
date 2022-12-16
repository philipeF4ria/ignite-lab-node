import { Notification } from '@app/entities/notification';

class PrismaNotificationMapper {
    static toPrisma(notification: Notification) {
        return {
            id: notification.id,
            category: notification.category,
            content: notification.content.value,
            recipientId: notification.recipientId,
            readtAt: notification.readAt,
            createdAt: notification.createdAt,
        }
    }
}

export { PrismaNotificationMapper }
