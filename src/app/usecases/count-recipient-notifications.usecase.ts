import { NotificationsRepository } from '../repositories/notifications.repository';
import { Injectable } from '@nestjs/common';

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
