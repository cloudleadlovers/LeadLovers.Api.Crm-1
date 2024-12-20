export interface IAuthConfig {
  secret: string;
  expiresIn: string;
}

export default {
  sso_url: process.env.SSO_API_URL,
  jwt: {
    secret: process.env.API_SECRET ?? 'undefined',
    expiresIn: '24h'
  } as IAuthConfig
};
