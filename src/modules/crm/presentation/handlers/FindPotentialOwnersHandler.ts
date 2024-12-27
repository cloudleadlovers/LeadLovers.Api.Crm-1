import { Request, Response } from 'express';
import { container } from 'tsyringe';

import FindPotentialOwnersByUserId from '@modules/crm/application/leadlovers/FindPotentialOwnersByUserId';
import { findPotentialOwnersDTO } from '../dtos/FindPotentialOwnersDTO';

export class FindPotentialOwnersHandler {
  public async handle(request: Request, response: Response): Promise<Response> {
    const findPotentialOwnersByUserId = container.resolve(
      FindPotentialOwnersByUserId
    );

    const userId = Number(request.user.key);
    const potentialOwners = await findPotentialOwnersByUserId.execute(userId);
    const output = findPotentialOwnersDTO.safeParse(potentialOwners);
    if (!output.success) {
      return response
        .status(400)
        .json({ status: 'error', result: output.error });
    }
    return response
      .status(200)
      .json({ status: 'success', result: output.data });
  }
}
