import { Notification as RawNotification } from '@prisma/client';

import { Notification } from '@app/entities/notification';
import { Content } from '@app/entities/content';

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

    static toDomain(raw: RawNotification ): Notification {
        return new Notification(
            {
                category: raw.category,
                content: new Content(raw.content),
                recipientId: raw.recipientId,
                readAt: raw.readtAt,
                canceledAt: raw.canceledAt,
                createdAt: raw.createdAt,
            },
            raw.id
        );
    }
}

export { PrismaNotificationMapper }
