import { Injectable } from '@nestjs/common';

import { Notification } from '../entities/notification';

import { NotificationsRepository } from '../repositories/notifications.repository';

type GetRecipientNotificationsRequest = {
    recipientId: string;
}

type GetRecipientNotificationsResponse = {
    notifications: Notification[]
};

@Injectable()
class GetRecipientNotificationsUseCase {
    constructor(
        private notificationsRepository: NotificationsRepository
    ){}

    async execute(request: GetRecipientNotificationsRequest): Promise<GetRecipientNotificationsResponse> {
        const { recipientId } = request;

        const notifications = await this.notificationsRepository.findManyByRecipientId(recipientId);

        return {
            notifications,
        }
    }
}

export { GetRecipientNotificationsUseCase }
