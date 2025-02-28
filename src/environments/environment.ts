/**
 * Environments
 */
export const environment = {
  production: false,
  // Endpoints para la app 'group' coincide con una key de 'api-endpoints'.
  endpoints: {
    group: 'stage',
    version: 1
  },
  // Constantes para cognito productivo.
  cognito: {
    region: 'us-east-1',
    identityPoolId: null,
    userPoolId: 'us-east-1_5vEqf5WT0',
    clientId: '6sovc853lkkuk7km70jlvlu8u2',
    rekognitionBucket: 'rekognition-pics',
    albumName: 'usercontent',
    bucketRegion: 'us-east-1',
    ddbTableName: 'LoginTrail',
    cognito_idp_endpoint: '',
    cognito_identity_endpoint: '',
    sts_endpoint: '',
    dynamodb_endpoint: '',
    s3_endpoint: ''
  },
  domainImages: 'https://d2dctyer3ngjhx.cloudfront.net'
};
