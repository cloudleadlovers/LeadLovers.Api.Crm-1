import { Router } from 'express';

import { CreateSession } from '@modules/identity/presentation/CreateSession';

const createSession = new CreateSession();

const sessionRouter = Router();

sessionRouter.post('/', createSession.handle);

export default sessionRouter;
