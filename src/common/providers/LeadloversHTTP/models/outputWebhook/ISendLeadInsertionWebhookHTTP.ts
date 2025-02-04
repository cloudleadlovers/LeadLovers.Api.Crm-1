export interface ISendLeadInsertionWebhookHTTP {
  send(userId: number, leadCodi: number): Promise<void>;
}
