import React from "react";
import { useRef, useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);


  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setpasswordArray(passwords)
}
  
  useEffect(() => {
    getPasswords()
    
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "password";
    if (ref.current.src.includes("/icon/eye.png")) {
      ref.current.src = "/icon/hide.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "/icon/eye.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = async() => {
    if(form.site.length >3&& form.username.length>3&&form.password.length>3){

      await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id:form.id})})

    setpasswordArray([...passwordArray, {...form,id:uuidv4()}]);
    await fetch("http://localhost:3000/",{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({...form,id:uuidv4()})})
    // localStorage.setItem("password", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
    
    setform({ site: "", username: "", password: "" })
    toast.success('Saved!', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  else{
    toast.error('Error: Not Saved', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }
  };


  const handelDelete = async(id) => {
    let c= confirm("Do you Really want to delete this password");
    if(c){
    setpasswordArray(passwordArray.filter(item=>item.id!=id));
    let res=await fetch("http://localhost:3000/",{method:"DELETE",headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id})})
    toast.success('Deleted successfully', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    }
  };

  const handelEdit = (id) => {
    
    setform({...passwordArray.filter(item=>item.id===id)[0],id:id})
    setpasswordArray(passwordArray.filter(item=>item.id!=id));
  };



  const handelChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (t) => {
    toast.success('Copied to clipboard', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    navigator.clipboard.writeText(t);
  };
  

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
        </div>
      </div>

      <div className="max-w-4xl myContainer">
        <h1 className="text-center font-bold text-xl">
          <span className="text-blue-400">I-</span>
          <span className="text-blue-600">rem</span>
          <span className="text-blue-800">ember</span>
        </h1>
        <h2 className="text-center text-blue-600 text-xl">
          To manage your passwords efficiently
        </h2>
        <div className="text-black flex flex-col p-4 gap-5 items-center">
          <input
            value={form.site}
            onChange={handelChange}
            placeholder="Enter the URL"
            className="rounded-full border border-blue-300 w-full p-2"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex w-full gap-5">
            <input
              value={form.username}
              onChange={handelChange}
              placeholder="Enter Username"
              className="rounded-full border border-blue-300 w-full p-2 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handelChange}
                placeholder="Enter Password"
                className="rounded-full border border-blue-300 w-full p-2 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-0 top-2 cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  src="/icon/eye.png"
                  alt="eye"
                  width={19}
                  className="mx-1"
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex bg-blue-300 rounded-full w-fit justify-center items-center p-2 hover:bg-blue-200"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Add
          </button>
        </div>
        <div className="passwords">
          <h1 className="font-bold text-xl py-4 text-center text-blue-900">
            Your Passwords
          </h1>

          {passwordArray.length == 0 && <p className="text-blue-400 text-center text-xl font-bold">No Password Saved</p>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-xl overflow-hidden mb-1">
              <thead className="bg-blue-300">
                <tr>
                  <th className="py-3 text-blue-800">Site</th>
                  <th className="py-3 text-blue-800">Username</th>
                  <th className="py-3 text-blue-800">Password</th>
                  <th className="py-3 text-blue-800">Action</th>
                </tr>
              </thead>
              <tbody className="bg-blue-200">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center  py-2 bottom-2 border border-white">
                        <div className="flex justify-center">
                          <a href="{item.site}" target="_blank">
                            {item.site}
                          </a>
                          <img
                            className="mx-2 size-5 my-1 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                            src="/icon/copy.png"
                            alt="copy"
                          />
                        </div>
                      </td>

                      <td className="py-2 bottom-2 border border-white">
                        <div className="flex justify-center">
                          <a href="{item.username}" target="_blank">
                            {item.username}
                          </a>{" "}
                          <img
                            onClick={() => {
                              copyText(item.username);
                            }}
                            className="mx-2 size-5 my-1 cursor-pointer"
                            src="/icon/copy.png"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="py-2 bottom-2 border border-white">
                        <div className="flex justify-center">
                          <a href="{item.site}" target="_blank">
                            {item.password}
                          </a>{" "}
                          <img
                            onClick={() => {
                              copyText(item.password);
                            }}
                            className="mx-2 size-5 my-1 cursor-pointer"
                            src="/icon/copy.png"
                            alt="copy"
                          />
                        </div>
                      </td>
                      <td className="flex py-4 gap-4  border border-white justify-center">
                      <span><img src="/icon/edit-text.png" alt="edit" className="cursor-pointer size-4" onClick={()=>{handelEdit(item.id)}}/></span>
                      <span><img src="/icon/delete.png" alt="delete" className="cursor-pointer size-4" onClick={()=>{handelDelete(item.id)}}/></span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
