//탐라
import { dbService, storageService } from "fbase";
import { useEffect, useState } from "react";
import Aweet from "components/Aweet";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const Home = ({ userObj }) => {
  const [aweet, setAweet] = useState("");
  const [aweets, setAweets] = useState([]);
  const [attachment, setAttachment] = useState("");

  useEffect(() => {
    dbService
      .collection("aweets")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const newArray = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }));
        setAweets(newArray);
      });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (aweet === "") {
      return;
    }
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    await dbService.collection("aweets").add({
      text: aweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    });
    setAweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setAweet(value);
  };

  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };

    if (Boolean(theFile)) {
      reader.readAsDataURL(theFile);
    }
  };

  const onClearAttachment = () => setAttachment("");

  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <form onSubmit={onSubmit} className="factoryForm">
        <div className="factoryInput__container">
        <input
  className="factoryInput__input wider"
  value={aweet}
  onChange={onChange}
  type="text"
  placeholder="무슨일이 일어나고 있나요?"
  maxLength={130}
  style={{ borderColor: "#FFCCE5", fontSize: "16px" }}
/>
          <input
            type="submit"
            value="&rarr;"
            className="factoryInput__arrow"
            style={{ backgroundColor: "#FFCCE5", width: "40px",}}
          />
        </div>
        <label htmlFor="attach-file" className="factoryInput__label">
          <span style={{ color: "#FFCCE5" }}>사진 추가 </span>
          <FontAwesomeIcon icon={faPlus} color={"#FFCCE5"} />
        </label>
        <input
          id="attach-file"
          type="file"
          accept="image/*"
          onChange={onFileChange}
          style={{
            opacity: 0,
          }}
        />
        {attachment && (
          <div className="factoryForm__attachment">
            <img
              src={attachment}
              style={{
                backgroundImage: attachment,
              }}
            />
            <div className="factoryForm__clear" onClick={onClearAttachment}>
              <span>Remove</span>
              <FontAwesomeIcon icon={faTimes} />
            </div>
          </div>
        )}
      </form>
      <div style={{ marginTop: 30 }}>
        {aweets.map((aweet) => (
          <Aweet
            key={aweet.id}
            aweetObj={aweet}
            isOwner={aweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;