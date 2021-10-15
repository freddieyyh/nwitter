import { dbService, storageService } from "fbase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { React, useState } from "react";
import * as storage from "firebase/storage";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    // eslint-disable-next-line
    const [newNweet, setNewNweet] = useState(nweetObj.text);

    const onDeleteClick = async (event) => {
        const ok = window.confirm("Are you sure you want to delete this nweet?");
        if (ok) {
            await deleteDoc(doc(dbService, `nweets/${nweetObj.id}`));
            await storage.deleteObject(storage.ref(storageService, nweetObj.attachmentUrl));
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewNweet(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateDoc(doc(dbService, `nweets/${nweetObj.id}`), {
            text: newNweet,
        });
        setEditing(false);
    };

    return (
        <div>
            {
                editing ? (
                    isOwner && <>
                        <form onSubmit={onSubmit}>
                            <input type="text" value={newNweet} required placeholder="Edit you nweet" onChange={onChange}></input>
                            <input type="submit" value="Update Nweet"></input>
                        </form>
                        <button onClick={toggleEditing}>Cancel</button>
                    </>
                ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {nweetObj.attachmentUrl && (
                            <img src={nweetObj.attachmentUrl} width="50px" height="50px" alt=""></img>
                        )}
                        {
                            isOwner && (
                                <>
                                    <button onClick={onDeleteClick}>Delete</button>
                                    <button onClick={toggleEditing}>Edit</button>
                                </>
                            )
                        }

                    </>)
            }
        </div>
    );
};

export default Nweet;