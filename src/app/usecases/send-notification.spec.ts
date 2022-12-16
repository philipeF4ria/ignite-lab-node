import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';
import { SendNotificationUseCase } from './send-notification.usecase';

describe('Send notification', () => {
    it('should be able send a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();

        const sendNotification = new SendNotificationUseCase(notificationsRepository);
    
        const { notification } = await sendNotification.execute({
            content: 'This is a notification',
            category: 'social',
            recipientId: 'example-recipient-id',
        });

        expect(notificationsRepository.notifications).toHaveLength(1);
        expect(notificationsRepository.notifications[0]).toEqual(notification);
    });
});
