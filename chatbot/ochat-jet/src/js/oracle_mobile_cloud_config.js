var mcs_config = {
  "logLevel": mcs.logLevelInfo,
  "mobileBackends": {
    "YOUR_BACKEND_NAME": {
      "default": true,
      "baseUrl": "http://localhost:3010",
      "applicationKey": "YOUR_BACKEND_APPLICATION_KEY",
      "authorization": {
        "basicAuth": {
          "backendId": "a963201e-f4f4-4bfa-bf4e-2e622dcccaf2",
          "anonymousToken": "UFJJTUVfREVDRVBUSUNPTl9NT0JJTEVfQU5PTllNT1VTX0FQUElEOnZrZWJxUmwuamEwbTdu"
        },
        "oAuth": {
          "clientId": "YOUR_CLIENT_ID",
          "clientSecret": "YOUR_ClIENT_SECRET",
          "tokenEndpoint": "YOUR_TOKEN_ENDPOINT"
        },
        "facebookAuth":{
          "facebookAppId": "YOUR_FACEBOOK_APP_ID"
        },
        "ssoAuth":{
          "tokenEndpoint": "YOUR_SSO_TOKEN_ENDPOINT"
        }
      }
    }
  }
};
