import { Notification } from '../entities/notification';
import { Content } from '../entities/content';
import { NotificationsRepository } from '../repositories/notifications.repository';
import { Injectable } from '@nestjs/common';

type SendNotificationRequest = {
    recipientId: string;
    content: string;
    category: string;
}

type SendNotificationResponse = {
    notification: Notification;
}

@Injectable()
class SendNotificationUseCase {
    constructor(
        private notificationsRepository: NotificationsRepository
    ){}

    async execute(request: SendNotificationRequest): Promise<SendNotificationResponse> {
        const { recipientId, content, category } = request;

        const notification = new Notification({
            recipientId,
            content: new Content(content),
            category,
        });

        await this.notificationsRepository.create(notification);

        return {
            notification
        }
    }
}

export { SendNotificationUseCase }
