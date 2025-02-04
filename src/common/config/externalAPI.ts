export default {
  leadTrack: {
    addApi: process.env.ADD_LEADTRACK_API_URL ?? 'http://localhost:3333'
  },
  outputWebhook: {
    webhookApi:
      process.env.OUTPUT_WEBHOOK_LEADLOVERS_API_URL ?? 'http://localhost:3333'
  }
};
