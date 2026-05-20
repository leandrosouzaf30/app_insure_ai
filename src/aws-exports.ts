import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'us-east-1_ea6664a4e',
      userPoolClientId: 'd011d28547d04b54b1ff1d9d76',
      userPoolEndpoint: 'http://localhost:5173/cognito'
    }
  }
});