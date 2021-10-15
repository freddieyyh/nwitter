import React, { useState } from 'react';
import * as auth from 'firebase/auth';
import { authService } from 'fbase';

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // eslint-disable-next-line
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target: {
                name, value
            }
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if (newAccount) {
                await auth.createUserWithEmailAndPassword(authService, email, password)
            } else {
                await auth.signInWithEmailAndPassword(authService, email, password)
            }
            
        } catch (error) {
            setError(error.message);
        }
        
    }

    const toggleAccount = () => setNewAccount((prev) => !prev);

    return (<>
        <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
            <input name="password" type="password" placeholder="password" required value={password} onChange={onChange} />
            <input type="submit" placeholder="Log In" value={newAccount ? "Create Account" : "Log In"} />
            {error}
        </form>
        <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
    </>);
};

export default AuthForm;