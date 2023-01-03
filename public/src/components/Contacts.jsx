import React, { useState, useEffect } from "react";

const Contacts = ({ contacts, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const getLocalStorage = async () => {
      const data = await JSON.parse(localStorage.getItem("ChatAppUser"));
      setCurrentUserName(data.username.toUpperCase());
      setCurrentUserImage(data.avatarImage);
    };
    getLocalStorage();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <div className="text-white">
      <div className="max-h-[400px] overflow-scroll overflow-x-hidden pr-2">
        {contacts.map((contact, index) => {
          return (
            <div
              key={contact._id}
              className={`flex justify-start items-center gap-5 w-[250px] p-2 bg-indigo-400 mt-2 rounded ${
                index === currentSelected ? "bg-indigo-900 duration-300 border" : ""
              }`}
              onClick={() => changeCurrentChat(index, contact)}
            >
              <div className="w-14 h-14 rounded-full overflow-hidden">
                <img src={contact.avatarImage} alt="avatar" />
              </div>
              <div className="username">
                <h3 className="text-[1.2rem] font-bold">{contact.username}</h3>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-start items-center gap-5 w-[250px] p-2 bg-orange-800 mt-10 rounded ">
        <div className="w-14 h-14 rounded-full overflow-hidden">
          <img src={currentUserImage} alt="avatar" />
        </div>
        <div className="username">
          <span>You</span>
          <h2 className="text-[1.2rem] font-bold">{currentUserName}</h2>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
