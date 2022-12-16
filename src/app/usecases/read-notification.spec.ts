import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';

import { ReadNotificationUseCase } from './read-notification.usecase';
import { makeNotification } from '@test/factories/notification.factory';

describe('Read notification', () => {
    it('should be able read a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        
        const readNotification = new ReadNotificationUseCase(notificationsRepository);
        
        const notification = makeNotification();

        await notificationsRepository.create(notification);

        await readNotification.execute({
            notificationId: notification.id
        });

        expect(notificationsRepository.notifications[0].readAt).toEqual(
            expect.any(Date)
        );
    });

    it ('should not be able to read a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        
        const readNotification = new ReadNotificationUseCase(notificationsRepository);
    
        expect(() => {
            return readNotification.execute({
                notificationId: 'fake-notification-id'
            });
        }).rejects.toThrow('Notification not found');
    });
});
