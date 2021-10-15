import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authService, dbService } from 'fbase';
import * as firestore from "firebase/firestore";
import {updateProfile} from 'firebase/auth';

const Profile = ( { userObj, refreshUser } ) => {
    //eslint-disable-next-line
    const [newDisplayName, setNewDisplayName] = useState(userObj.user.displayName);
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const getMyNweets = async () => {
        const query = firestore.query(firestore.collection(dbService, "nweets"), firestore.where("creatorId", "==", userObj.user.uid), firestore.orderBy("createdAt"));
        const nweets = await firestore.getDocs(query);
        console.log(nweets.docs.map((doc) => doc.data() ))
    };

    useEffect(() => {
        getMyNweets();
        // eslint-disable-next-line
    }, []);

    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.user.displayName !== newDisplayName) {
            await updateProfile(userObj.user, {
                displayName: newDisplayName, 
                // photoURL: "https://example.com/jane-q-user/profile.jpg"
              });
            refreshUser();
        }
    };

    return (
        <>
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="username" onChange={onChange} value={newDisplayName}></input>
            <input type="submit" value="Update profile"></input>
        </form>
            <button onClick={onLogOutClick}>Log out</button>
        </>
    );
};

export default Profile;