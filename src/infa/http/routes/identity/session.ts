import { Router } from 'express';

import { CreateSessionHandler } from '@modules/identity/presentation/handlers/CreateSessionHandler';

const createSession = new CreateSessionHandler();

const sessionRouter = Router();

sessionRouter.post('/', createSession.handle);

export default sessionRouter;
