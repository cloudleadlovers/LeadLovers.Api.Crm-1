import { inject, injectable } from 'tsyringe';

import ITeamReportProvider, {
  TeamReport,
  TeamReportFilters
} from '@modules/dashboard/external/providers/DbProviders/models/ITeamReportProvider';

type TeamReportInsights = {
  teamReport: TeamReport[];
};

type Params = {
  boardId: number;
  filters?: TeamReportFilters;
};

@injectable()
export default class GetTeamReportInsightsService {
  constructor(
    @inject('LeadloversTeamReportProvider')
    private teamReportProvider: ITeamReportProvider
  ) {}

  public async execute({
    boardId,
    filters
  }: Params): Promise<TeamReportInsights> {
    const teamReport = await this.teamReportProvider.getTeamReport(
      boardId,
      filters
    );
    return { teamReport };
  }
}
