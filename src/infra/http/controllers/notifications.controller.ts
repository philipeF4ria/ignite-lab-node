import { Body, Controller, Post } from '@nestjs/common';

import { SendNotificationUseCase } from '@app/usecases/send-notification.usecase';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification.view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotificationUseCase
  ){}

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
