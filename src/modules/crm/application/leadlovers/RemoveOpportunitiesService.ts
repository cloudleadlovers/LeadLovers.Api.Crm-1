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
    @inject('LeadloversStageProvider')
    private stageProvider: IStageProvider,
    @inject('LeadloversOpportunityProvider')
    private opportunityProvider: IOpportunityProvider
  ) {}

  public async execute(params: RemoveOpportunitiesInput): Promise<void> {
    await this.ensureCRMOwnership(params.crmId, params.userId);
    await this.deleteOpportunitiesSequentially(params);
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

  private async deleteOpportunitiesSequentially(
    params: RemoveOpportunitiesInput
  ): Promise<void> {
    for await (const opportunity of params.opportunities) {
      const opportunityDeleted =
        await this.opportunityProvider.deleteOpportunity(
          opportunity.stageId,
          opportunity.id
        );
      if (!opportunityDeleted) {
        throw new Error(`Failure to remove opportunity.`);
      }
      await this.opportunityProvider.deleteNotificationByOpportunityId(
        opportunity.id
      );
      await this.opportunityProvider.logOpportunityRemoval({
        stage: {},
        opportunity: {
          id: opportunityDeleted.currentValues.id,
          dataBefore: {
            contactId: opportunityDeleted.currentValues.contactId,
            stageId: opportunityDeleted.currentValues.stageId,
            deal: opportunityDeleted.currentValues.deal,
            email: opportunityDeleted.currentValues.email ?? '',
            name: opportunityDeleted.currentValues.name,
            phone: opportunityDeleted.currentValues.phone ?? '',
            responsible: {
              id: opportunityDeleted.currentValues.responsible.id,
              name: opportunityDeleted.currentValues.responsible.name,
              icon: opportunityDeleted.currentValues.responsible.icon
            },
            score: opportunityDeleted.currentValues.score ?? 0,
            value: opportunityDeleted.currentValues.value ?? 0,
            commercialPhone: opportunityDeleted.currentValues.commercialPhone,
            tags: opportunityDeleted.currentValues.tags,
            id: opportunityDeleted.currentValues.id,
            createdAt: opportunityDeleted.currentValues.createdAt,
            position: opportunityDeleted.currentValues.position,
            userId: opportunityDeleted.currentValues.userId
          }
        },
        userId: params.userId
      });
      await this.stageProvider.reorderOpportunitiesByPosition(
        opportunity.stageId,
        opportunityDeleted.currentValues.position
      );
    }
  }
}
