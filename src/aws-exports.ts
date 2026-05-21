import { Amplify } from 'aws-amplify';

const userPoolId = import.meta.env.VITE_USER_POOL_ID ?? 'us-east-1_5d0d948e5';
const userPoolClientId = import.meta.env.VITE_USER_POOL_CLIENT_ID ?? '60a5190ee0ea4a9dae61012f64';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId,
      userPoolClientId,
      userPoolEndpoint: 'http://localhost:5173/cognito'
    }
  }
});