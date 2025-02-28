import { Inject, Injectable } from '@angular/core';
import { NewPasswordUser } from '@public/auth/newpassword/newpassword.component';
import { RegistrationUser } from '@public/auth/register/registration.component';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk/global';
import { CognitoCallback, CognitoUtil } from './cognito.service';

import { Logger } from '../util/logger.service';

const log = new Logger('UserRegistrationService');

@Injectable()
export class UserRegistrationService {

    constructor(@Inject(CognitoUtil) public cognitoUtil: CognitoUtil) { }

    register(user: RegistrationUser, callback: CognitoCallback): void {
        log.error('UserRegistrationService: user is ' + user);

        const attributeList = [];

        const dataEmail = {
            Name: 'email',
            Value: user.email
        };
        const dataNickname = {
            Name: 'nickname',
            Value: user.name
        };
        attributeList.push(new CognitoUserAttribute(dataEmail));
        attributeList.push(new CognitoUserAttribute(dataNickname));
        attributeList.push(new CognitoUserAttribute({
            Name: 'phone_number',
            Value: user.phone_number
        }));

        this.cognitoUtil.getUserPool().signUp(user.email, user.password, attributeList, null, function (err: any, result: any) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                log.debug('UserRegistrationService: registered user is ' + result);
                callback.cognitoCallback(null, result);
            }
        });

    }

    confirmRegistration(username: string, confirmationCode: string, callback: CognitoCallback): void {

        const userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.confirmRegistration(confirmationCode, true, function (err: any, result: any) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

    resendCode(username: string, callback: CognitoCallback): void {
        const userData = {
            Username: username,
            Pool: this.cognitoUtil.getUserPool()
        };

        const cognitoUser = new CognitoUser(userData);

        cognitoUser.resendConfirmationCode(function (err: any, result: any) {
            if (err) {
                callback.cognitoCallback(err.message, null);
            } else {
                callback.cognitoCallback(null, result);
            }
        });
    }

    newPassword(newPasswordUser: NewPasswordUser, callback: CognitoCallback): void {
        // Get these details and call
        const authenticationData = {
            Username: newPasswordUser.username,
            Password: newPasswordUser.existingPassword,
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        const userData = {
            Username: newPasswordUser.username,
            Pool: this.cognitoUtil.getUserPool()
        };

        // UserLoginService: Params set...Authenticating the user
        const cognitoUser = new CognitoUser(userData);
        log.debug('UserLoginService: config is ');
        log.debug(AWS.config);
        cognitoUser.authenticateUser(authenticationDetails, {
            newPasswordRequired: function (userAttributes: any, requiredAttributes: any) {
                // User was signed up by an admin and must provide new
                // password and required attributes, if any, to complete
                // authentication.

                // the api doesn't accept this field back
                delete userAttributes.email_verified;
                cognitoUser.completeNewPasswordChallenge(newPasswordUser.password, requiredAttributes, {
                    onSuccess: function (result: any) {
                        callback.cognitoCallback(null, userAttributes);
                    },
                    onFailure: function (err: any) {
                        callback.cognitoCallback(err, null);
                    }
                });
            },
            onSuccess: function (result: any) {
                // if the change password is OK.
                callback.cognitoCallback(null, result);
            },
            onFailure: function (err: any) {
                callback.cognitoCallback(err, null);
            }
        });
    }
}
