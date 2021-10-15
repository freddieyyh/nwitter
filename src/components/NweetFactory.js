import React, { useState } from 'react';
import { dbService, storageService } from 'fbase';
import * as firestore from "firebase/firestore";
import * as storage from "firebase/storage";
import {v4 as uuidv4} from 'uuid';

const NweetFactory = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment !== "") {
            const attachmentRef = storage.ref(storageService, `${userObj.user.uid}/${uuidv4()}`);
            const response = await storage.uploadString(attachmentRef, attachment, "data_url");
            attachmentUrl = await storage.getDownloadURL(response.ref);
        }
        
        const nweetObj = {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.user.uid,
            attachmentUrl,
        };
        await firestore.addDoc(firestore.collection(dbService, "nweets"), nweetObj);
        setNweet("");
        setAttachment(null);
    };
    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    }

    const onFileChange = (event) => {
        const { target: { files }, } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const { currentTarget: { result, }, } = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    };

    const onClearAttachment = () => {
        setAttachment(null);
    };

    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="What's on your mind?" maxLength={120} onChange={onChange} value={nweet}></input>
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" value="Nweet"></input>
            {attachment && (
                <div>
                    <img src={attachment} width="50px" height="50px" alt=""></img>
                    <button onClick={onClearAttachment}>Clear</button>
                </div>
            )
            }
        </form>
    );
};

export default NweetFactory;