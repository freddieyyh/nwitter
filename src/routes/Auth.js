import React from 'react';
import { authService } from 'fbase';
import * as auth from 'firebase/auth';
import AuthForm from 'components/AuthForm';

const Auth = () => {
    const onSocialClick = async(event) => {
        const {target: {name}} = event;
        let provider;
        if (name === "google") {
            provider = new auth.GoogleAuthProvider();
        } else if (name === "github") {
            provider = new auth.GithubAuthProvider();
        }
        await auth.signInWithPopup(authService, provider)
    };

    return (<div>
        <AuthForm />
        <div>
            <button name="google" onClick={onSocialClick}>Continuew with Google</button>
            <button name="github" onClick={onSocialClick}>Continuew with Github</button>
        </div>
    </div>
    )
};
export default Auth;