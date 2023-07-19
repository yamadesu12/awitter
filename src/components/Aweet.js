// 트윗쓰는창
import { dbService, storageService } from "fbase";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Aweet = ({ aweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newAweet, setNewAweet] = useState(aweetObj.text);

  const onDeleteClick = async () => {
    const ok = window.confirm("삭제하시겠습니까?");
    if (ok) {
      await dbService.doc(`aweets/${aweetObj.id}`).delete();
      if (aweetObj.attachmentUrl !== "") {
        await storageService.refFromURL(aweetObj.attachmentUrl).delete();
      }
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewAweet(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.doc(`aweets/${aweetObj.id}`).update({ text: newAweet });
    setEditing(false);
  };

  return (
    <div className="nweet">
      {editing ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              onChange={onChange}
              value={newAweet}
              required
              placeholder="Edit your nweet"
              autoFocus
              className="formInput"
            />
            <input type="submit" value="수정하기" className="formBtn" />
          </form>
          <button onClick={toggleEditing} className="formBtn cancelBtn">
            취소하기
          </button>
        </>
      ) : (
        <>
          <h4>{aweetObj.text}</h4>
          {aweetObj.attachmentUrl && (
            <img src={aweetObj.attachmentUrl} width="50px" height="200px" />
          )}
          {isOwner && (
            <div className="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEditing}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Aweet;