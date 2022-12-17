import { 
  Body, 
  Controller, 
  Get, 
  Param, 
  Patch, 
  Post
} from '@nestjs/common';

import { SendNotificationUseCase } from '@app/usecases/send-notification.usecase';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification.view-model';
import { CancelNotificationUseCase } from '@app/usecases/cancel-notification.usecase';
import { ReadNotificationUseCase } from '@app/usecases/read-notification.usecase';
import { UnreadNotificationUseCase } from '@app/usecases/unread-notification.usecase';
import { CountRecipientNotificationsUseCase } from '@app/usecases/count-recipient-notifications.usecase';
import { GetRecipientNotificationsUseCase } from '@app/usecases/get-recipient-notifications.usecase';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotificationUseCase,
    private cancelNotification: CancelNotificationUseCase,
    private readNotification: ReadNotificationUseCase,
    private unreadNotification: UnreadNotificationUseCase,
    private countRecipientNotifications: CountRecipientNotificationsUseCase,
    private getRecipientNotifications: GetRecipientNotificationsUseCase,
  ){}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(
    @Param('recipientId') recipientId: string
  ) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count
    }
  }

  @Get('from/:recipientId')
  async getFromRecipient(
    @Param('recipientId') recipientId: string
  ) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    }
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ 
      notificationId: id ,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { 
      notification: NotificationViewModel.toHTTP(notification),
    }
  }
}
