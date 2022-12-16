import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';

import { CancelNotificationUseCase } from './cancel-notification.usecase';
import { makeNotification } from '@test/factories/notification.factory';

describe('Cancel notification', () => {
    it('should be able cancel a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        
        const cancelNotification = new CancelNotificationUseCase(notificationsRepository);
        
        const notification = makeNotification();

        await notificationsRepository.create(notification);

        await cancelNotification.execute({
            notificationId: notification.id
        });

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(
            expect.any(Date)
        );
    });

    it ('should not be able to cancel a non existing notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        
        const cancelNotification = new CancelNotificationUseCase(notificationsRepository);
    
        expect(() => {
            return cancelNotification.execute({
                notificationId: 'fake-notification-id'
            });
        }).rejects.toThrow('Notification not found');
    });
});
