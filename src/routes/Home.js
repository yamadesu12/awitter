import { dbService,storageService} from "fbase";
import { useEffect, useState } from "react";
import Aweet from "components/Aweet";
import { v4 as uuidv4} from "uuid";


const Home = ({ userObj }) => {
  

    const [aweet, setAweet] = useState("");
    const [aweets, setAweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    useEffect(() => {
        dbService.collection("aweets").onSnapshot((snapshot) => {
          const newArray = snapshot.docs.map((document) => ({
            id: document.id,
            ...document.data(),
          }));
          const sortedArray = newArray.sort((a, b) => b.createdAt - a.createdAt); // createdAt 속성을 기준으로 내림차순 정렬
          setAweets(sortedArray);
        });
      }, []);

   

    const onSubmit= async (event) => {
        event.preventDefault();
        /*
        await dbService.collection("aweets").add({
            text: aweet,
            createdAt:Date.now(),
            creatorId: userObj.uid,
        });
        setAweet("");*/
        const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);

        const response = await fileRef.putString(attachment, "data_url");
        console.log(response);
    };

    const onChange = (event) => {
        event.preventDefault();
        const{
            target: {value },
        }= event;
        setAweet(value);
        };
    
        const onFileChange = (event) => {
            const {
                target: {files},
            } = event ;
            const theFile = files[0];
            const reader = new FileReader();
            reader.onloadend = (finishedEvent) => {
                const {
                    currentTarget : {result},
                } = finishedEvent;
                setAttachment(result);
                
            };
            reader.readAsDataURL(theFile);
        };

const onClearAttachment = () => setAttachment("");

return (
    <>
    <form onSubmit = {onSubmit}>
        <input
        value = {aweet}
        onChange={onChange}
        type = "text"
        placeholder="무슨 일이 일어나고 있나요?"
        maxLengh={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange}/>
        <input type = "submit" value = "Aweet"/>
        {attachment && ( 
        <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>취소</button>
        </div>
)}
    </form>
    <div>
        {aweets.map((aweet)=> (
          <Aweet key = {aweet.id}
           aweetObj={aweet}
           isOwner = {aweet.creatorId === userObj.uid}
           />
                ))}
                </div>
                </>
);
};

export default Home;