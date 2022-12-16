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
    ],
})
class HttpModule {}

export { HttpModule }
