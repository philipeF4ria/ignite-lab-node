import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';

import { UnreadNotificationUseCase } from './unread-notification.usecase';
import { makeNotification } from '@test/factories/notification.factory';

describe('Unread notification', () => {
    it('should be able unread a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        
        const unreadNotification = new UnreadNotificationUseCase(notificationsRepository);
        
        const notification = makeNotification({
            readAt: new Date(),
        });

        await notificationsRepository.create(notification);

        await unreadNotification.execute({
            notificationId: notification.id
        });

        expect(notificationsRepository.notifications[0].readAt).toBeNull
    });

    it ('should not be able to read a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        
        const readNotification = new UnreadNotificationUseCase(notificationsRepository);
    
        expect(() => {
            return readNotification.execute({
                notificationId: 'fake-notification-id'
            });
        }).rejects.toThrow('Notification not found');
    });
});
