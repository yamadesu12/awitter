import { dbService } from "fbase";
import { useState } from "react";

const Aweet = ({ aweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newAweet, setNewAweet] = useState(aweetObj.text);

const onDeleteClick = async () => {
  const ok = window .confirm ("삭제하시겠습니까?");
  console.log(ok);
  if (ok) {
    console.log(aweetObj.id);
    const data = await dbService.doc(`aweets/${aweetObj.id}`).delete();
    console.log(data);
  }
  
};

const toggleEditing = () => setEditing((prev) => !prev);

const onChange = (event) => {
const {
target : {value },
} = event;
setNewAweet(value);

};

const onSubmit = async (event) => {
event.preventDefault();
await dbService.doc(`aweets/${aweetObj.id}`).update({ text: newAweet });
setEditing(false);
};

    return (
        <div>
            {editing ? (
                <>
                <form onSubmit = {onSubmit}>
                    <input onChange = {onChange} value={newAweet} required />
                    <input type = "submit" value = "Update Aweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                    </>
            ) : (
                <>
           
            <h4>{aweetObj.text}</h4>
            {isOwner && (
                <>
           
            <button onClick={onDeleteClick}>Delete Aweet</button>
            <button onClick={toggleEditing}>Edit Aweet</button>
            </>
    )}
    </>
            )}
        </div>
    );
};

export default Aweet;