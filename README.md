# trackandtrace

### Get started
- [Install](https://docs.expo.io/versions/v36.0.0/get-started/installation/) the `expo-cli`
- Install the dependencies (`npm i` or `yarn`)
- Run `expo start`


### Setup AWS Amplify
- [Install and configure](https://aws-amplify.github.io/docs/cli-toolchain/quickstart?sdk=js) the `@aws-amplify/cli`
- From the root directory, run `amplify init`
  ```
    Yonahs-MacBook-Pro-2:react Yonah$ amplify init
    Note: It is recommended to run this command from the root of your app directory
    ? Enter a name for the project trackandtrace
    ? Enter a name for the environment dev
    ? Choose your default editor: Visual Studio Code
    ? Choose the type of app that you're building javascript
    Please tell us about your project
    ? What javascript framework are you using react-native
    ? Source Directory Path: (leave blank to use default)
    ? Distribution Directory Path: (leave blank to use default)
    ? Build Command: (leave blank to use default)
    ? Start Command: (leave blank to use default)
    Using default provider  awscloudformation

    For more information on AWS Profiles, see:
    https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html

    ? Do you want to use an AWS profile? Yes
    ? Please choose the profile you want to use default
    ....
  ```

- Also from the root directory, run `amplify add auth`
  ```
  Yonahs-MacBook-Pro-2:react Yonah$ amplify add auth
  Using service: Cognito, provided by: awscloudformation
  
  The current configured provider is Amazon Cognito. 
  
  Do you want to use the default authentication and security configuration? Manual configuration
  Select the authentication/authorization services that you want to use: User Sign-Up, Sign-In, connected with AWS IAM controls (Enables per-user Storage features for 
  images or other content, Analytics, and more)
  Please provide a friendly name for your resource that will be used to label this category in the project: (leave blank to use default)
  Please enter a name for your identity pool. (leave blank to use default)
  Allow unauthenticated logins? (Provides scoped down permissions that you can control via AWS IAM) Yes
  Do you want to enable 3rd party authentication providers in your identity pool? No
  Please provide a name for your user pool: (leave blank to use default)
  Warning: you will not be able to edit these selections. 
  How do you want users to be able to sign in? Phone Number
  Do you want to add User Pool Groups? No
  Do you want to add an admin queries API? No
  Multifactor authentication (MFA) user login options: OFF
  Email based user registration/forgot password: Disabled (Uses SMS/TOTP as an alternative)
  Please specify an SMS verification message: (leave blank to use default)
  Do you want to override the default password policy for this User Pool? No
  Warning: you will not be able to edit these selections. 
  What attributes are required for signing up? (uncheck email)
  Specify the app's refresh token expiration period (in days): 30
  Do you want to specify the user attributes this app can read and write? No
  Do you want to enable any of the following capabilities? (leave blank to use default)
  Do you want to use an OAuth flow? No
  ? Do you want to configure Lambda Triggers for Cognito? No
  ```
- Also from the root directory, run `amplify add storage`
  ```
  Yonahs-MacBook-Pro-2:react Yonah$ amplify add storage
  ? Please select from one of the below mentioned services: Content (Images, audio, video, etc.)
  ? Please provide a friendly name for your resource that will be used to label this category in the project: reports
  ? Please provide bucket name: (leave blank to use default)
  ? Who should have access: Auth and guest users
  ? What kind of access do you want for Authenticated users? create/update
  ? What kind of access do you want for Guest users? create/update
  ? Do you want to add a Lambda Trigger for your S3 Bucket? No
  ```
- Run `amplify push`