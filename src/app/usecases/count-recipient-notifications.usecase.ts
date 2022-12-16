import { NotificationsRepository } from '../repositories/notifications.repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from './errors/notification-not-found.error';

type CountRecipientNotificationsRequest = {
    recipientId: string;
}

type CountRecipientNotificationsResponse = {
    count: number;
};

@Injectable()
class CountRecipientNotificationsUseCase {
    constructor(
        private notificationsRepository: NotificationsRepository
    ){}

    async execute(request: CountRecipientNotificationsRequest): Promise<CountRecipientNotificationsResponse> {
        const { recipientId } = request;

        const count = await this.notificationsRepository.countManyByRecipientId(recipientId);

        return {
            count
        }
    }
}

export { CountRecipientNotificationsUseCase }
