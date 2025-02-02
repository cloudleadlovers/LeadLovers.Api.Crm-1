import { inject, injectable } from 'tsyringe';

import { LogText } from '@common/shared/enums/LogText';
import ICRMProvider from '@modules/crm/external/providers/DBProviders/models/ICRMProvider';
import IOpportunityProvider from '@modules/crm/external/providers/DBProviders/models/IOpportunityProvider';
import IStageProvider from '@modules/crm/external/providers/DBProviders/models/IStageProvider';
import { RemoveStageInput } from '@modules/crm/presentation/dtos/RemoveStageDTO';

@injectable()
export default class RemoveStageService {
  constructor(
    @inject('LeadloversCRMProvider')
    private crmProvider: ICRMProvider,
    @inject('LeadloversStageProvider')
    private stageProvider: IStageProvider,
    @inject('LeadloversOpportunityProvider')
    private opportunityProvider: IOpportunityProvider
  ) {}

  public async execute(params: RemoveStageInput): Promise<void> {
    await this.ensureCRMOwnership(params.crmId, params.userId);
    await this.deleteStage(params);
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

  private async deleteStage(params: RemoveStageInput): Promise<void> {
    const stage = await this.stageProvider.deleteStage({
      ...params,
      id: params.stageId
    });
    if (!stage) throw new Error('Stage not found.');
    await this.stageProvider.deleteNotificationByStageId(params.stageId);
    await this.stageProvider.logStageRemoval(params.stageId, params.userId, {
      text: LogText.StageRemoved,
      args: [stage.name, params.userEmail]
    });
  }

  private async deleteOpportunities(params: RemoveStageInput): Promise<void> {
    const opportunities =
      await this.opportunityProvider.deleteOpportunitiesByStageId(
        params.stageId
      );
    if (!opportunities.length) return;
    const opportunityIds = opportunities.map(opportunity => opportunity.id);
    await this.opportunityProvider.deleteNotificationsByOpportunityIds(
      opportunityIds
    );
    await Promise.all(
      opportunities.map(async opportunity => {
        await this.opportunityProvider.logOpportunityRemoval({
          stage: {},
          opportunity: {
            id: opportunity.id,
            dataBefore: {
              contactId: opportunity.contactId,
              stageId: opportunity.stageId,
              deal: opportunity.deal,
              email: opportunity.email ?? '',
              name: opportunity.name,
              phone: opportunity.phone ?? '',
              responsible: {
                id: opportunity.responsible.id,
                name: opportunity.responsible.name,
                icon: opportunity.responsible.icon
              },
              score: opportunity.score ?? 0,
              value: opportunity.value ?? 0,
              commercialPhone: opportunity.commercialPhone,
              tags: opportunity.tags,
              id: opportunity.id,
              createdAt: opportunity.createdAt,
              position: opportunity.position,
              userId: opportunity.userId
            }
          },
          userId: params.userId
        });
      })
    );
  }
}
