import { NotificationProps, Notification } from '@app/entities/notification';
import { Content } from '@app/entities/content';

type Override = Partial<NotificationProps>;

function makeNotification(override: Override = {}) {
    return new Notification({
        category: 'social',
        content: new Content('Você tem uma nova solicitação de amizade'),
        recipientId: 'recipient-id',
        ...override,
    });
}

export { makeNotification }
