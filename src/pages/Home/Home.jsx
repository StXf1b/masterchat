import "./Home.css"
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect, useRef } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useCollection } from "../../hooks/useCollection";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { toast } from "react-toastify";

function Home() {
    const { user } = useUser();
    const [message, setMessage] = useState("")
    const [cooldown, setCooldown] = useState(false)
    const { addDocument, deleteDocument } = useFirestore("messages")
    const { documents } = useCollection("messages")
    const username = user?.username;
    const imageUrl = user?.imageUrl;
    const uid = user?.id;
    const bottomRef = useRef(null)

    const handleLastId = () => {
      const lastId = documents?.map(doc => doc.nrid).sort((a, b) => b - a)
      if (lastId.length === 0) return 0
      return Number(lastId[0])
    }

    const handleSubmit = async () => {
        if (!message) toast.error("Please enter a message");
        if (cooldown) return toast.error("Please wait 3 seconds before sending another message");
        if (message.length > 2000) return toast.error("Message must be less than 2000 characters");
        await addDocument({ message, username, imageUrl, uid, nrid: handleLastId() + 1 })
        setMessage("")
        setCooldown(true)
        setTimeout(() => {
          setCooldown(false)
        }, 3000)
    }
  const handleDelete = async () => {
    if (uid !== "user_2Tljm8eouvEl6X9FM6NGpm9Xzbw") return toast.error("You are not authorized to delete all messages");
    documents.forEach(doc => {
      deleteDocument(doc.id)
    })
    toast.success("Deleted all messages")
  }
  // scroll to bottom when new message is sent
  // const scroll = document.querySelector(".scroll-into-view")
  // if (scroll) scroll.scrollIntoView({ behavior: "smooth" }) might not need this


// scroll to bottom when page is loaded
  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [])

  return (
    <>
      {uid === "user_2Tljm8eouvEl6X9FM6NGpm9Xzbw" && (
        // delete button 
        <button onClick={handleDelete} className="btn-delete">Delete all messages</button>
      )}
    <div className="home flex justify-center align-middle mt-[5%] sm:mt-10">
      <div className="justify-center bg-regal-dark w-[100%] lg:w-[45%] h-[700px]">
        <div className=" flex justify-center align-middle p-10 bg-slate-900 h-3 w-[100%]">
          <h1 className="text-3xl sm:text-4xl mt-[-20px] font-bold text-white">Logged in as <span className=" text-blue-400">{user?.username.toUpperCase()}</span></h1>
        </div>
        <div className="ml-10 mr-10 w-auto pl-5 pr-5 sm:pl-16 sm:pr-16 mt-10 bg-slate-600 h-[80%] scrolll">
          {documents && documents.sort((a,b) => a.nrid - b.nrid).map(doc => (
          <>
            <div key={doc.createdAt} className="flex">
              <img src={doc.imageUrl} className="w-12 h-12 imgurl mt-3" />
              <p className="mt-3 font-bold text-md ml-3 uppercase">{doc.username}</p>
              <p className="ml-2 mt-4 text-[13px] text-gray-500 font-bold">{formatDistanceToNow(doc.createdAt.toDate(), {addSuffix: true })}</p>
            </div>
            <div className="ml-[3.8rem] mt-[-20px] message-box">
              <p className="text-sm">{doc.message}</p>
            </div>
          </>
          ))}
          <div ref={bottomRef} className="scroll-into-view" />
            <div className="mt-10">
              <div className="flex justify-between">
                <input onChange={(e) => setMessage(e.target.value)} value={message} className=" text-regal-dark input-mess" type="text" />
                <button className="send-mess-btn" onClick={handleSubmit}>Send</button>
              </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Home