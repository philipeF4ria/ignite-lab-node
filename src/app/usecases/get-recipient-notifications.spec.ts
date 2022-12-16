import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications.repository';

import { makeNotification } from '@test/factories/notification.factory';
import { GetRecipientNotificationsUseCase } from './get-recipient-notifications.usecase';

describe('Get recipients notifications', () => {
    it('should be able to get recipient notifications', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        
        const getRecipientNotifications = new GetRecipientNotificationsUseCase(notificationsRepository);
     
        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-01' }),
        );

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-01' }),
        );

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-02' }),
        );

        const { notifications } = await getRecipientNotifications.execute({
            recipientId: 'recipient-01'
        });

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ recipientId: 'recipient-01' }),
                expect.objectContaining({ recipientId: 'recipient-01' }),
            ]),
        );
    });
});
