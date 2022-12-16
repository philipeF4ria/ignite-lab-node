import { NotificationsRepository } from '../repositories/notifications.repository';
import { Injectable } from '@nestjs/common';
import { NotificationNotFound } from './errors/notification-not-found.error';

type UnreadNotificationRequest = {
    notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
class UnreadNotificationUseCase {
    constructor(
        private notificationsRepository: NotificationsRepository
    ){}

    async execute(request: UnreadNotificationRequest): Promise<UnreadNotificationResponse> {
        const { notificationId } = request;

        const notification = await this.notificationsRepository.findById(notificationId);
    
        if (!notification) {
            throw new NotificationNotFound();
        }
        
        notification.unread();

        await this.notificationsRepository.save(notification);
    }
}

export { UnreadNotificationUseCase }
