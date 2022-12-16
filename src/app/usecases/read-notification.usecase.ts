import { NotificationsRepository } from '../repositories/notifications.repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from './errors/notification-not-found.error';

type ReadNotificationRequest = {
    notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
class ReadNotificationUseCase {
    constructor(
        private notificationsRepository: NotificationsRepository
    ){}

    async execute(request: ReadNotificationRequest): Promise<ReadNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationsRepository.findById(notificationId);
    
        if (!notification) {
            throw new NotificationNotFound();
        }
        
        notification.read();

        await this.notificationsRepository.save(notification);
    }
}

export { ReadNotificationUseCase }
