import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';

import { CountRecipientNotificationsUseCase } from './count-recipient-notifications.usecase';
import { makeNotification } from '@test/factories/notification.factory';

describe('Count recipients notifications', () => {
    it('should be able to count recipient notifications', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        
        const countRecipientNotifications = new CountRecipientNotificationsUseCase(notificationsRepository);
     
        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-01' }),
        );

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-01' }),
        );

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-02' }),
        );

        const { count } = await countRecipientNotifications.execute({
            recipientId: 'recipient-01'
        });

        expect(count).toEqual(2);
    });
});
