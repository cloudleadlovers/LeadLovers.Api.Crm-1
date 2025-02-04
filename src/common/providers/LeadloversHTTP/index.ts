import { container } from 'tsyringe';

import { InsertLeadTrackHTTP } from './implementations/leadTrack/InsertLeadTrackHTTP';
import { InsertTagsTrackHTTP } from './implementations/leadTrack/InsertTagsTrackHTTP';
import { RemoveTagsTrackHTTP } from './implementations/leadTrack/RemoveTagsTrackHTTP';
import { SendLeadInsertionWebhookHTTP } from './implementations/outputWebhook/SendLeadInsertionWebhookHTTP';

import { IInsertLeadTrackHTTP } from './models/leadTrack/IInsertLeadTrackHTTP';
import { IInsertTagsTrackHTTP } from './models/leadTrack/IInsertTagsTrackHTTP';
import { IRemoveTagsTrackHTTP } from './models/leadTrack/IRemoveTagsTrackHTTP';
import { ISendLeadInsertionWebhookHTTP } from './models/outputWebhook/ISendLeadInsertionWebhookHTTP';

container.registerSingleton<IInsertLeadTrackHTTP>(
  'InsertLeadTrackHTTP',
  InsertLeadTrackHTTP
);

container.registerSingleton<IInsertTagsTrackHTTP>(
  'InsertTagsTrackHTTP',
  InsertTagsTrackHTTP
);

container.registerSingleton<IRemoveTagsTrackHTTP>(
  'RemoveTagsTrackHTTP',
  RemoveTagsTrackHTTP
);

container.registerSingleton<ISendLeadInsertionWebhookHTTP>(
  'SendLeadInsertionWebhookHTTP',
  SendLeadInsertionWebhookHTTP
);
