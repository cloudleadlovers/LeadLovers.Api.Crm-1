import { container } from 'tsyringe';

import { HttpLeadLoversSSOProvider } from './implementations/HttpLeadLoversSSOProvider';
import { ILeadLoversSSOProvider } from './models/ILeadLoversSSOProvider';

container.registerInstance<ILeadLoversSSOProvider>(
  'LeadLoversSSOProvider',
  new HttpLeadLoversSSOProvider()
);
