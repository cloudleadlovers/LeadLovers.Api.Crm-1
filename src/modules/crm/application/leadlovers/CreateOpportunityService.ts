import { inject, injectable } from 'tsyringe';

import { AppError } from '@common/errors/AppError';
import { CRMRule } from '@common/shared/enums/CRMRules';
import ICRMProvider from '@modules/crm/external/providers/DBProviders/models/ICRMProvider';
import IOpportunityProvider from '@modules/crm/external/providers/DBProviders/models/IOpportunityProvider';
import {
  CreateOpportunityInput,
  CreateOpportunityOutput
} from '@modules/crm/presentation/dtos/CreateOpportunityDTO';

@injectable()
export default class CreateOpportunityService {
  constructor(
    @inject('LeadloversCRMProvider')
    private crmProvider: ICRMProvider,
    @inject('LeadloversOpportunityProvider')
    private opportunityProvider: IOpportunityProvider
  ) {}

  public async execute(
    params: CreateOpportunityInput
  ): Promise<CreateOpportunityOutput> {
    await this.guardAgainstInvalidCreation(
      params.crmId,
      params.stageId,
      params.contactId
    );
    const opportunity = await this.opportunityProvider.createOpportunity({
      contactId: params.contactId,
      stageId: params.stageId,
      userId: params.userId,
      deal: params.deal,
      email: params.email ?? '',
      name: params.name,
      phone: params.phone ?? '',
      responsible: {
        id: params.responsible.id,
        name: params.responsible.name,
        icon: params.responsible.icon
      },
      score: params.score ?? 0,
      value: params.value ?? 0,
      commercialPhone: params.commercialPhone,
      tags: params.tags
    });
    //TO-DO: executar ações da coluna nesta oportunidade
    /*
      TO-DO: trabalhar com notificação
      verificar se tem notificações
        enviar notificação de oportunidade criada
      enviar notificação da coluna
    */
    await this.opportunityProvider.logOpportunityCreation({
      stage: { destinationId: params.stageId },
      opportunity: {
        id: opportunity.id,
        dataAfter: {
          contactId: params.contactId,
          stageId: params.stageId,
          deal: params.deal,
          email: params.email ?? '',
          name: params.name,
          phone: params.phone ?? '',
          responsible: {
            id: params.responsible.id,
            name: params.responsible.name,
            icon: params.responsible.icon
          },
          score: params.score ?? 0,
          value: params.value ?? 0,
          commercialPhone: params.commercialPhone,
          tags: params.tags,
          id: opportunity.id,
          createdAt: opportunity.createdAt,
          position: opportunity.position,
          userId: params.userId
        }
      },
      userId: params.userId
    });
    return { id: opportunity.id };
  }

  private async guardAgainstInvalidCreation(
    crmId: number,
    stageId: number,
    contactId: number
  ) {
    const crm = await this.crmProvider.findCRM(crmId);
    if (!crm) {
      throw new AppError('CRM not found', 404);
    }
    if (crm.rule === CRMRule.ONLY_ONE_PER_COLUMN) {
      const opportunity =
        await this.opportunityProvider.findOpportunityByStageIdAndContactId(
          stageId,
          contactId
        );
      if (opportunity) {
        throw new AppError('Opportunity already exists in this stage', 400);
      }
    }
    if (crm.rule === CRMRule.ONLY_ONE_IN_CRM) {
      const opportunity =
        await this.opportunityProvider.findOpportunityByCRMIdAndContactId(
          crmId,
          contactId
        );
      if (opportunity) {
        throw new AppError('Opportunity already exists in this CRM', 400);
      }
    }
  }
}
