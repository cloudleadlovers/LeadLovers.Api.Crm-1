import { inject, injectable } from 'tsyringe';

import ICRMProvider from '@modules/crm/external/providers/DBProviders/models/ICRMProvider';
import IOpportunityProvider from '@modules/crm/external/providers/DBProviders/models/IOpportunityProvider';
import IStageProvider from '@modules/crm/external/providers/DBProviders/models/IStageProvider';
import { MoveOpportunitiesInput } from '@modules/crm/presentation/dtos/MoveOpportunitiesDTO';

@injectable()
export default class MoveOpportunitiesService {
  constructor(
    @inject('LeadloversCRMProvider')
    private crmProvider: ICRMProvider,
    @inject('LeadloversOpportunityProvider')
    private opportunityProvider: IOpportunityProvider,
    @inject('LeadloversStageProvider')
    private stageProvider: IStageProvider
  ) {}

  public async execute(params: MoveOpportunitiesInput): Promise<void> {
    await this.ensureCRMOwnership(params.crmId, params.userId);
    await this.moveOpportunities(params);
  }

  private async ensureCRMOwnership(
    crmId: number,
    userId: number
  ): Promise<void> {
    const crm = await this.crmProvider.findCRM(crmId);
    if (!crm) throw new Error('CRM not found.');
    if (crm.userId === userId) return;
    const owners = await this.crmProvider.findOwnersByCRMId(crmId);
    const owner = owners.find(owner => owner.id === userId);
    if (owner) return;
    throw new Error(
      `Access denied. You do not have permission to access this CRM.`
    );
  }

  private async moveOpportunities(
    params: MoveOpportunitiesInput
  ): Promise<void> {
    const opportunities = await this.opportunityProvider.moveOpportunities(
      params.opportunityIds,
      params.destinatinationStageId
    );
    //TO-DO Verificar se é necessário implementar notificação de oportunidade e etapa
    const oldStageIds = new Set<number>();
    const currentStageIds = new Set<number>();
    await Promise.all(
      opportunities.map(async opportunity => {
        await this.opportunityProvider.logOpportunityMovement({
          stage: {
            sourceId: opportunity.oldValues.stageId,
            destinationId: opportunity.currentValues.stageId
          },
          opportunity: {
            id: opportunity.currentValues.id,
            dataBefore: {
              contactId: opportunity.currentValues.contactId,
              stageId: opportunity.oldValues.stageId,
              deal: opportunity.currentValues.deal,
              email: opportunity.currentValues.email ?? '',
              name: opportunity.currentValues.name,
              phone: opportunity.currentValues.phone ?? '',
              responsible: {
                id: opportunity.currentValues.responsible.id,
                name: opportunity.currentValues.responsible.name,
                icon: opportunity.currentValues.responsible.icon
              },
              score: opportunity.currentValues.score ?? 0,
              value: opportunity.currentValues.value ?? 0,
              commercialPhone: opportunity.currentValues.commercialPhone,
              tags: opportunity.currentValues.tags,
              id: opportunity.currentValues.id,
              createdAt: opportunity.currentValues.createdAt,
              position: opportunity.oldValues.position,
              userId: opportunity.currentValues.userId
            },
            dataAfter: {
              contactId: opportunity.currentValues.contactId,
              stageId: opportunity.currentValues.stageId,
              deal: opportunity.currentValues.deal,
              email: opportunity.currentValues.email ?? '',
              name: opportunity.currentValues.name,
              phone: opportunity.currentValues.phone ?? '',
              responsible: {
                id: opportunity.currentValues.responsible.id,
                name: opportunity.currentValues.responsible.name,
                icon: opportunity.currentValues.responsible.icon
              },
              score: opportunity.currentValues.score ?? 0,
              value: opportunity.currentValues.value ?? 0,
              commercialPhone: opportunity.currentValues.commercialPhone,
              tags: opportunity.currentValues.tags,
              id: opportunity.currentValues.id,
              createdAt: opportunity.currentValues.createdAt,
              position: opportunity.currentValues.position,
              userId: opportunity.currentValues.userId
            }
          },
          userId: params.userId
        });
        oldStageIds.add(opportunity.oldValues.stageId);
        currentStageIds.add(opportunity.currentValues.stageId);
      })
    );
    await Promise.all(
      Array.from(oldStageIds).map(async stageId => {
        await this.stageProvider.reorderOpportunities(stageId);
      })
    );
    await Promise.all(
      Array.from(currentStageIds).map(async stageId => {
        await this.stageProvider.reorderOpportunities(stageId);
      })
    );
  }
}
