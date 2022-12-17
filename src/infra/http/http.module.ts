import { CancelNotificationUseCase } from '@app/usecases/cancel-notification.usecase';
import { CountRecipientNotificationsUseCase } from '@app/usecases/count-recipient-notifications.usecase';
import { GetRecipientNotificationsUseCase } from '@app/usecases/get-recipient-notifications.usecase';
import { ReadNotificationUseCase } from '@app/usecases/read-notification.usecase';
import { UnreadNotificationUseCase } from '@app/usecases/unread-notification.usecase';
import { Module } from '@nestjs/common';

import { SendNotificationUseCase } from 'src/app/usecases/send-notification.usecase';
import { DatabaseModule } from '../database/database.module';

import { NotificationsController } from './controllers/notifications.controller';

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [
        NotificationsController,
    ],
    providers: [
        SendNotificationUseCase,
        CancelNotificationUseCase,
        CountRecipientNotificationsUseCase,
        GetRecipientNotificationsUseCase,
        ReadNotificationUseCase,
        UnreadNotificationUseCase,
    ],
})
class HttpModule {}

export { HttpModule }
