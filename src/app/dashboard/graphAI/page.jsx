"use client";
import React, { useEffect, useRef, useState } from 'react';
import botImg from '../../../../public/bot-img.png'
import robot from '../../../../public/robot.png'
import man from '../../../../public/man.png'

import Image from 'next/image';
import { getRequest, postRequest } from '@/lib/api.service';
import Cookies from 'js-cookie';
import { HashLoaderComponent } from '@/app/components/loader';
import { toast,ToastContainer } from 'react-toastify';

export default function GraphAI() {


  const [chatsConversations, setChatsRooms] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [userPrompt, setPrompt] = useState("");
  const [loader,setLoader] = useState(true);

  const isInitialMount = useRef(true);


  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      getUserChatList();
      setTimeout(() => {
        setLoader(false);
      }, 3000);
    }
  }, []);

  function getUserChatList() {
    const userId = JSON.parse(Cookies.get('userId'));
    getRequest(`http://localhost:3000/api/chatBot/v1?userId=${userId}`).then((response) => {
      console.log(response)
      let list2 = response?.data?.data;
      let list = response?.data?.data.reverse();
      setChatsRooms(list || []);
      chatDiv.scrollTo(0,document.scrollHeight);
      // if(selectedChat == null && ){
      //   setSelectedChat(list2[0]);
      // }
    }).catch((err) => {
      console.log(err)
    })
  }

  const addNewChat = () => {
    const userId = JSON.parse(Cookies.get('userId'));
    const BearerToken = JSON.parse(Cookies.get('AuthToken'));
    postRequest(`http://localhost:3000/api/chatBot/v1?userId=${userId}`).then((response) => {
      console.log(response);

    }).then(() => {
      getUserChatList();
    }).catch((err) => {
      console.log(err)
    })
  }

  const sendMessage = () => {

    if(userPrompt == ""){
      toast.error("Please Provide Some prompt !");
      return;
    }
    const payload = {
      "prompt": userPrompt,
      "ChatroomId": selectedChat._id
    }
    postRequest('http://localhost:3000/api/chatBot/v1/prompt', payload).then((response) => {
      console.log(response);
      setPrompt("");

      if(response.status == 201){
        setSelectedChat(response?.data?.updateChatRoom)
      }
      getUserChatList();
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    // <div className='h-[100vh] w-full px-5 overflow-hidden' id='graphAi'>
    <div className="flex antialiased text-gray-800 overflow-x-hidden overflow-y-hidden">
              <ToastContainer />

      {!loader && <div className="flex flex-row h-full w-full">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="flex items-center justify-center rounded-2xl text-green-700 bg-green-100 h-10 w-10">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
            </div>
            <div className="ml-2 font-bold text-2xl">GraphAI</div>
          </div>
          <div className="flex flex-col mt-8">
            <div className="flex flex-row items-center rounded-xl  cursor-pointer justify-between">
              <button className="flex flex-row w-full items-center border  justify-between text-[16px] hover:bg-gray-100 rounded-xl p-4" onClick={() => addNewChat()}>
                <div className="font-bold">New Conversation</div>
                <div className="flex items-center justify-center text-black text-[16px] h-4 w-4">
                  <i className="bi bi-plus-circle"></i>
                </div>
              </button>
            </div>
            <div className="flex flex-col space-y-1 mt-4 h-[50vh] scroll-smooth -mx-2 overflow-y-auto">
              {
                chatsConversations.map((x, i) => (
                  <>
                    <button className={`flex flex-row items-center hover:bg-gray-100 rounded-xl p-4 ${selectedChat?._id == x._id ? 'bg-gray-100' : ''}`} key={x._id} onClick={() => setSelectedChat(x)}>
                      <div className="ml-2 text-sm font-semibold text-left w-40 overflow-hidden" style={{ textWrap: 'nowrap', textOverflow: 'ellipsis' }}>{x?.chatTitle}</div>
                    </button>
                  </>
                ))
              }
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-auto h-[85vh] overflow-auto p-6">
          {selectedChat != null && <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              {selectedChat.chats.map((chat) => (
                <div className="flex flex-col h-full" id='chatBoard' key={chat._id}>
                  <div className="grid grid-cols-12 gap-y-2">
                    <div className="col-start-6 user-chat col-end-13 p-3 rounded-lg">
                      <div className="flex items-center justify-start flex-row-reverse">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-100 flex-shrink-0">
                          <Image src={man} alt='U' />
                        </div>
                        <div className="relative mr-3 text-sm bg-green-100 py-2 px-4 shadow rounded-xl">
                          <div>{chat.userMessage}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-1 bot-chat col-end-8 p-3 rounded-lg">
                      <div className="flex flex-row items-center">
                        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white flex-shrink-0">
                          <Image src={botImg} alt="B" />
                        </div>
                        <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                          <div>{chat.AiReply}</div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
              <div>
                <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex-grow ml-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    value={userPrompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex w-full border rounded-xl focus:outline-none focus:border-green-300 pl-4 h-10"
                  />
                  <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <button className="flex items-center justify-center bg-green-500 hover:bg-green-600 rounded-xl text-white px-4 py-1 flex-shrink-0" onClick={() => sendMessage()}>
                  <span>Send</span>
                  <span className="ml-2">
                    <svg
                      className="w-4 h-4 transform rotate-45 -mt-px"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>}
          {selectedChat == null && <div className="flex flex-col flex-auto justify-center items-center flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <Image src={robot} alt='GraphAI' width={400} />
            <div className='mt-10'>
              <h2 className='text-4xl font-bold'>Introducing GraphAI</h2>
              <button className='w-full bg-green-600 p-3 mt-5 text-white transition-all rounded-lg hover:bg-green-700 ' onClick={() => addNewChat()} >Start Conversation </button>
            </div>
          </div>}
        </div>
      </div>}
      {loader && <div className='w-full h-full flex flex-row justify-center overflow-hidden items-center'> <HashLoaderComponent isLoading={loader} /> </div>}
    </div>

    // </div>
  )
}
