import { container } from 'tsyringe';

import { InsertLeadLogStorage } from './implementations/tableStorage/InsertLeadLogStorage';

import { IInsertLeadLogStorage } from './models/tableStorage/IInsertLeadLogStorage';

container.registerSingleton<IInsertLeadLogStorage>(
  'InsertLeadLogStorage',
  InsertLeadLogStorage
);
