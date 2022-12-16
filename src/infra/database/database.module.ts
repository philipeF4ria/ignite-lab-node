import { Module } from '@nestjs/common';

import { NotificationsRepository } from 'src/app/repositories/notifications.repository';
import { PrismaService } from './prisma/prisma.service';
import { NotificationsPrismaRepository } from './prisma/repositories/notifications.prisma.repository';

@Module({
    providers: [
        PrismaService,
        {
            provide: NotificationsRepository,
            useClass: NotificationsPrismaRepository,
        },
    ],
    exports: [
        NotificationsRepository,
    ],
})
class DatabaseModule {}

export { DatabaseModule }
