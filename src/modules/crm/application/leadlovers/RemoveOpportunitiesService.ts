import { inject, injectable } from 'tsyringe';

import ICRMProvider from '@modules/crm/external/providers/DBProviders/models/ICRMProvider';
import IOpportunityProvider from '@modules/crm/external/providers/DBProviders/models/IOpportunityProvider';
import IStageProvider from '@modules/crm/external/providers/DBProviders/models/IStageProvider';
import { RemoveOpportunitiesInput } from '@modules/crm/presentation/dtos/RemoveOpportunitiesDTO';

@injectable()
export default class RemoveOpportunitiesService {
  constructor(
    @inject('LeadloversCRMProvider')
    private crmProvider: ICRMProvider,
    @inject('LeadloversOpportunityProvider')
    private opportunityProvider: IOpportunityProvider,
    @inject('LeadloversStageProvider')
    private stageProvider: IStageProvider
  ) {}

  public async execute(params: RemoveOpportunitiesInput): Promise<void> {
    await this.ensureCRMOwnership(params.crmId, params.userId);
    await this.deleteOpportunities(params);
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

  private async deleteOpportunities(
    params: RemoveOpportunitiesInput
  ): Promise<void> {
    const opportunities = await this.opportunityProvider.deleteOpportunities(
      params.opportunityIds
    );
    await this.opportunityProvider.deleteNotificationsByOpportunityIds(
      params.opportunityIds
    );
    const stageIds = new Set<number>();
    await Promise.all(
      opportunities.map(async opportunity => {
        await this.opportunityProvider.logOpportunityRemoval({
          stage: {},
          opportunity: {
            id: opportunity.currentValues.id,
            dataBefore: {
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
        stageIds.add(opportunity.currentValues.stageId);
      })
    );
    await Promise.all(
      Array.from(stageIds).map(async stageId => {
        await this.stageProvider.reorderOpportunities(stageId);
      })
    );
  }
}
