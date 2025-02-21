import { inject, injectable } from 'tsyringe';

import { AppError } from '@common/errors/AppError';
import { CRMRule } from '@common/shared/enums/CRMRules';
import { removesNonNumericCharacters } from '@common/utils/removesNonNumericCharacters';
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
    if (!params.contactId) {
      throw new AppError('ContactId is required', 400);
    }
    await this.guardAgainstInvalidCreation(params);
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
      tags: params.tags ? `${params.tags}` : undefined
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
          tags: params.tags ? `${params.tags}` : undefined,
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

  private async guardAgainstInvalidCreation({
    crmId,
    stageId,
    contactId,
    phone
  }: CreateOpportunityInput) {
    if (!contactId) {
      throw new AppError('ContactId is required', 400);
    }
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
      if (phone) {
        let opportunity =
          await this.opportunityProvider.findOpportunityByStageIdAndPhone(
            stageId,
            phone
          );
        if (opportunity) {
          throw new AppError('Opportunity already exists in this stage', 400);
        }
        const transformedPhone = this.transformPhone(phone);
        opportunity =
          await this.opportunityProvider.findOpportunityByStageIdAndPhone(
            stageId,
            transformedPhone
          );
        if (opportunity) {
          throw new AppError('Opportunity already exists in this stage', 400);
        }
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
      if (phone) {
        let opportunity =
          await this.opportunityProvider.findOpportunityByCRMIdAndPhone(
            crmId,
            phone
          );
        if (opportunity) {
          throw new AppError('Opportunity already exists in this CRM', 400);
        }
        const transformedPhone = this.transformPhone(phone);
        opportunity =
          await this.opportunityProvider.findOpportunityByCRMIdAndPhone(
            crmId,
            transformedPhone
          );
        if (opportunity) {
          throw new AppError('Opportunity already exists in this CRM', 400);
        }
      }
    }
  }

  private phoneHaveNineDigit(phone: string): boolean {
    phone = removesNonNumericCharacters(phone);
    if (phone.length <= 2 || phone.length < 8) return false;
    const firstTwoNumbers = phone.substring(0, 2);
    const fifthNumber = phone.length >= 5 ? phone.substring(4, 1) : '';
    const thirdNumber = phone.length >= 3 ? phone.substring(2, 1) : '';
    const firstNumber = phone.substring(0, 1);
    const phoneLength = phone.length;
    if (firstTwoNumbers == '55' && (phoneLength == 12 || phoneLength == 13)) {
      if (phoneLength == 13 && fifthNumber == '9') return true;
    } else {
      if (phoneLength == 10 || phoneLength == 11) {
        if (phoneLength == 11 && thirdNumber == '9') return true;
      } else if (phoneLength == 8 || phoneLength == 9) {
        if (phoneLength == 9 && firstNumber == '9') return true;
      }
    }
    return false;
  }

  private insertNineDigit(phone: string): string {
    phone = removesNonNumericCharacters(phone);
    if (phone.length < 8) return phone;
    const firstTwoNumbers = phone.substring(0, 2);
    const phoneLength = phone.length;
    if (firstTwoNumbers == '55' && (phoneLength == 12 || phoneLength == 13)) {
      if (phoneLength == 12)
        return phone.substring(0, 4) + '9' + phone.substring(4, 8);
    } else {
      if (phoneLength == 10 || phoneLength == 11) {
        if (phoneLength == 10)
          return phone.substring(0, 2) + '9' + phone.substring(2, 8);
      } else if (phoneLength == 8 || phoneLength == 9) {
        if (phoneLength == 8) return '9' + phone;
      }
    }
    return phone;
  }

  private removeNineDigit(phone: string): string {
    phone = removesNonNumericCharacters(phone);
    if (phone.length < 8) return phone;
    const firstTwoNumbers = phone.substring(0, 2);
    const fifthNumber = phone.length >= 5 ? phone[4] : '';
    const thirdNumber = phone.length >= 3 ? phone[2] : '';
    const firstNumber = phone[0];
    const phoneLength = phone.length;
    if (
      firstTwoNumbers === '55' &&
      (phoneLength === 12 || phoneLength === 13)
    ) {
      if (phoneLength === 13 && fifthNumber === '9') {
        return phone.substring(0, 4) + phone.substring(5, 13);
      }
    } else {
      if (phoneLength === 10 || phoneLength === 11) {
        if (phoneLength === 11 && thirdNumber === '9') {
          return phone.substring(0, 2) + phone.substring(3, 11);
        }
      } else if (phoneLength === 8 || phoneLength === 9) {
        if (phoneLength === 9 && firstNumber === '9') {
          return phone.substring(1, 9);
        }
      }
    }
    return phone;
  }

  private transformPhone(phone: string): string {
    if (this.phoneHaveNineDigit(phone)) {
      return this.removeNineDigit(phone);
    }
    return this.insertNineDigit(phone);
  }
}
