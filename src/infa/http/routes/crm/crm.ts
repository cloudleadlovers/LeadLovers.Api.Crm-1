import { Router } from 'express';

import { FindCRMs } from '@modules/crm/presentation/FindCRMs';
import { authenticate } from 'infa/http/middlewares/authJWT';

const findCRMs = new FindCRMs();

const crmRouter = Router();

crmRouter.use(authenticate);
crmRouter.get('/', findCRMs.handle);

export default crmRouter;
