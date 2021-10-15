import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import * as firestore from "firebase/firestore";
import Nweet from 'components/Nweet';
import NweetFactory from 'components/NweetFactory';

const Home = ({ userObj }) => {
    console.log(userObj);
    
    const [nweets, setNweets] = useState([]);
    
    useEffect(() => {
        firestore.onSnapshot(firestore.collection(dbService, "nweets"), (snapshot) => {
            const nweetArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), }))
            setNweets(nweetArray);
        });
    }, [])
    
    return (<div>
        <NweetFactory userObj={userObj} />
        <div>
            {nweets.map((nweet) => {
                return (
                    <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.user.uid}></Nweet>
                );
            })}
        </div>
    </div>);
};
export default Home;