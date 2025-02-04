import { inject, injectable } from 'tsyringe';

import { IInsertLeadLogStorage } from '@common/providers/LeadloversAzure/models/tableStorage/IInsertLeadLogStorage';
import { IRemoveLeadFromBlackListRepository } from '@common/providers/LeadloversDB/models/leadBlackList/IRemoveLeadFromBlackListRepository';
import { IUpsertLeadCaptureDataRepository } from '@common/providers/LeadloversDB/models/leadCaptureData/IUpsertLeadCaptureDataRepository';
import { IFindLeadCaptureFieldsByUserIdRepository } from '@common/providers/LeadloversDB/models/leadCaptureField/IFindLeadCaptureFieldsByUserIdRepository';
import { IFindLeadFromMachineByPhoneRepository } from '@common/providers/LeadloversDB/models/leads/IFindLeadFromMachineByPhoneRepository';
import { IInsertLeadOnWhatsAppMachineRepository } from '@common/providers/LeadloversDB/models/leads/IInsertLeadOnWhatsAppMachineRepository';
import { IInsertLeadRepository } from '@common/providers/LeadloversDB/models/leads/IInsertLeadRepository';
import { IInsertLeadTrackRepository } from '@common/providers/LeadloversDB/models/leadTrack/IInsertLeadTrackRepository';
import { IInsertTagsTrackRepository } from '@common/providers/LeadloversDB/models/leadTrack/IInsertTagsTrackRepository';
import { IRemoveTagsTrackRepository } from '@common/providers/LeadloversDB/models/leadTrack/IRemoveTagsTrackRepository';
import { IFindLeadUsuaSistByLeadCodiRepository } from '@common/providers/LeadloversDB/models/leadUsuaSists/IFindLeadUsuaSistByLeadCodiRepository';
import {
  IFindLeadUsuaSistRepository,
  LeadUsuaSist
} from '@common/providers/LeadloversDB/models/leadUsuaSists/IFindLeadUsuaSistRepository';
import { IInsertLeadUsuaSistTagRepository } from '@common/providers/LeadloversDB/models/leadUsuaSistTags/IInsertLeadUsuaSistTagRepository';
import { IRemoveLeadUsuaSistTagsByLeadUsuaSistCodiRepository } from '@common/providers/LeadloversDB/models/leadUsuaSistTags/IRemoveLeadUsuaSistTagsByLeadUsuaSistCodiRepository';
import { IInsertLeadTrackHTTP } from '@common/providers/LeadloversHTTP/models/leadTrack/IInsertLeadTrackHTTP';
import { IInsertTagsTrackHTTP } from '@common/providers/LeadloversHTTP/models/leadTrack/IInsertTagsTrackHTTP';
import { IRemoveTagsTrackHTTP } from '@common/providers/LeadloversHTTP/models/leadTrack/IRemoveTagsTrackHTTP';
import { ISendLeadInsertionWebhookHTTP } from '@common/providers/LeadloversHTTP/models/outputWebhook/ISendLeadInsertionWebhookHTTP';
import { CreateOpportunityInput } from '@modules/crm/presentation/dtos/CreateOpportunityDTO';

@injectable()
export default class CreateContactService {
  constructor(
    @inject('FindLeadFromMachineByPhoneRepository')
    private findLeadFromMachineByPhoneRepository: IFindLeadFromMachineByPhoneRepository,
    @inject('InsertLeadTrackRepository')
    private insertLeadTrackRepository: IInsertLeadTrackRepository,
    @inject('FindLeadCaptureFieldsByUserIdRepository')
    private findLeadCaptureFieldsByUserIdRepository: IFindLeadCaptureFieldsByUserIdRepository,
    @inject('FindLeadUsuaSistRepository')
    private findLeadUsuaSistRepository: IFindLeadUsuaSistRepository,
    @inject('FindLeadUsuaSistByLeadCodiRepository')
    private findLeadUsuaSistByLeadCodiRepository: IFindLeadUsuaSistByLeadCodiRepository,
    @inject('InsertLeadLogStorage')
    private insertLeadLogStorage: IInsertLeadLogStorage,
    @inject('InsertLeadOnWhatsAppMachineRepository')
    private insertLeadOnWhatsAppMachineRepository: IInsertLeadOnWhatsAppMachineRepository,
    @inject('InsertLeadRepository')
    private insertLeadRepository: IInsertLeadRepository,
    @inject('InsertLeadTrackHTTP')
    private insertLeadTrackHTTP: IInsertLeadTrackHTTP,
    @inject('InsertLeadUsuaSistTagRepository')
    private insertLeadUsuaSistTagRepository: IInsertLeadUsuaSistTagRepository,
    @inject('InsertTagsTrackHTTP')
    private insertTagsTrackHTTP: IInsertTagsTrackHTTP,
    @inject('InsertTagsTrackRepository')
    private insertTagsTrackRepository: IInsertTagsTrackRepository,
    @inject('RemoveLeadFromBlackListRepository')
    private removeLeadFromBlackListRepository: IRemoveLeadFromBlackListRepository,
    @inject('RemoveLeadUsuaSistTagsByLeadUsuaSistCodiRepository')
    private removeLeadUsuaSistTagsByLeadUsuaSistCodiRepository: IRemoveLeadUsuaSistTagsByLeadUsuaSistCodiRepository,
    @inject('RemoveTagsTrackHTTP')
    private removeTagsTrackHTTP: IRemoveTagsTrackHTTP,
    @inject('RemoveTagsTrackRepository')
    private removeTagsTrackRepository: IRemoveTagsTrackRepository,
    @inject('SendLeadInsertionWebhookHTTP')
    private sendLeadInsertionWebhookHTTP: ISendLeadInsertionWebhookHTTP,
    @inject('UpsertLeadCaptureDataRepository')
    private upsertLeadCaptureDataRepository: IUpsertLeadCaptureDataRepository
  ) {}

  public async execute(input: CreateOpportunityInput): Promise<number> {
    const lead = {
      codi: 0,
      usuaSistCodi: 0,
      email: '',
      status: 0
    };
    if (input.machineType === 3 || input.machineType === 5) {
      if (!input.phone || input.phone == '') {
        throw new Error('Phone number not provided!');
      }
      const result = await this.insertLeadOnWhatsAppMachineRepository.insert({
        ...input,
        phone: input.phone
      });
      if (result !== 1 && result !== 2) {
        throw new Error('Failed to insert lead!');
      }
      const leadDB = await this.findLeadFromMachineByPhoneRepository.find(
        input.machineId,
        input.funnelId,
        input.phone
      );
      if (leadDB) lead.codi = leadDB.id;
    } else {
      const leadDB = await this.insertLeadRepository.insert({
        ...input,
        tags: input.tags ? `${input.tags}` : input.tags
      });
      lead.codi = leadDB.id;
    }
    const leadUsuaSist = await this.findLeadUsuaSistByLeadCodiRepository.find(
      lead.codi,
      input.userId
    );
    if (!leadUsuaSist) {
      throw new Error(
        `Failed to find leadUsuaSist using leadCodi: ${lead.codi}!`
      );
    }
    lead.usuaSistCodi = leadUsuaSist.id;
    lead.email = leadUsuaSist.leadEmail;
    lead.status = leadUsuaSist.statCodi;
    const insertSuccess = await this.insertLeadTrackHTTP.insert({
      leadUsuaSistCodi: lead.usuaSistCodi,
      userId: input.userId,
      machineId: input.insertOnMachine ? input.machineId : 0
    });
    if (!insertSuccess) {
      await this.insertLeadTrackRepository.insert({
        leadUsuaSistCodi: lead.usuaSistCodi,
        userId: input.userId,
        machineId: input.insertOnMachine ? input.machineId : 0
      });
    }
    await this.setTags(input, leadUsuaSist);
    if (lead.usuaSistCodi > 0) {
      const dynamicCaptureFields =
        await this.findLeadCaptureFieldsByUserIdRepository.find(input.userId);
      await Promise.all(
        dynamicCaptureFields.map(async dynamicCaptureField => {
          const value = input.dynamicFieldValues[dynamicCaptureField.id];
          if (!value) return;
          await this.upsertLeadCaptureDataRepository.upsert({
            fieldId: dynamicCaptureField.id,
            fieldType: dynamicCaptureField.typeId,
            fieldName: dynamicCaptureField.name,
            fieldTag: dynamicCaptureField.tag,
            fieldValue: value,
            leadUsuaSistCodi: lead.usuaSistCodi
          });
        })
      );
    }
    await this.sendLeadInsertionWebhookHTTP.send(input.userId, lead.codi);
    if (lead.status === 16 && lead.email !== '') {
      await this.removeLeadFromBlackListRepository.remove(lead.email);
    }
    return lead.codi;
  }

  private async setTags(
    input: CreateOpportunityInput,
    leadUsuaSist: LeadUsuaSist
  ): Promise<void> {
    const tags =
      await this.removeLeadUsuaSistTagsByLeadUsuaSistCodiRepository.remove(
        leadUsuaSist.id
      );
    if (tags.length) {
      const removeSuccess = await this.removeTagsTrackHTTP.remove({
        leadUsuaSistCodi: leadUsuaSist.id,
        userId: input.userId
      });
      if (!removeSuccess) {
        await this.removeTagsTrackRepository.remove({
          leadUsuaSistCodi: leadUsuaSist.id,
          userId: input.userId
        });
      }
    }
    if (input.tags?.length) {
      await Promise.all(
        input.tags.map(async tag => {
          await this.insertLeadUsuaSistTagRepository.insert(
            leadUsuaSist.id,
            tag
          );
        })
      );
      const insertSuccess = await this.insertTagsTrackHTTP.insert({
        leadUsuaSistCodi: leadUsuaSist.id,
        userId: input.userId
      });
      if (!insertSuccess) {
        await this.insertTagsTrackRepository.insert({
          leadUsuaSistCodi: leadUsuaSist.id,
          userId: input.userId
        });
      }
    }
    const leadUsuaSistDb = await this.findLeadUsuaSistRepository.find(
      leadUsuaSist.id
    );
    if (!leadUsuaSistDb) {
      throw new Error(
        `Failed to find leadUsuaSist using leadUsuaSistCodi: ${leadUsuaSist.id}!`
      );
    }
    await this.insertLeadLogStorage.insert({
      userId: input.userId,
      leadCodi: leadUsuaSistDb.leadCodi,
      tags: input.tags ? `${input.tags}` : ''
    });
  }
}
