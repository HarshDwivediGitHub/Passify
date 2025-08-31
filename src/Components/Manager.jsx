import React, { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();

  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
      transition: Bounce,
    });
  };


  const showPassword = () => {
    passwordRef.current.type = "text"
    if (ref.current.src.includes("icons/image_processing20210620-27756-xnhfye.png")) {
      ref.current.src = "icons/1722188.png";
      passwordRef.current.type = "password"

    } else {
      ref.current.src = "icons/image_processing20210620-27756-xnhfye.png";
      passwordRef.current.type = "text"

    }
  };

  const savePassword = () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

      if (form.id) {
        // Update existing password
        const updatedArray = passwordArray.map(item =>
          item.id === form.id ? form : item
        );
        setpasswordArray(updatedArray);
        localStorage.setItem("passwords", JSON.stringify(updatedArray));
      } else {
        // Add new password
        const newPassword = { ...form, id: uuidv4() };
        const updatedArray = [...passwordArray, newPassword];
        setpasswordArray(updatedArray);
        localStorage.setItem("passwords", JSON.stringify(updatedArray));
      }

      // clear form after save
      setform({ site: "", username: "", password: "" });
      toast('Password saved!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
    else {
      toast('Error: Password not saved', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
  }


  const deletePassword = (id) => {
    console.log("Deleting password with id", id)
    let c = confirm("Do you really want to delete this password?")
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id));
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
      toast('Password Deleted!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  const editPassword = (id) => {
    console.log("Editing password with id", id);

    const selectedPassword = passwordArray.find(item => item.id === id);
    if (selectedPassword) {
      setform(selectedPassword); // includes id, so savePassword knows it’s edit mode
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <div className="mycontainer">
        <h1 className='text-3xl sm:text-4xl font-bold text-center'>
          Pass<span className="text-indigo-700">ify</span>
        </h1>
        <p className='text-black text-base sm:text-lg text-center'>Built for trust. Secured for you</p>

        {/* form */}
        <div className="flex flex-col p-4 text-black gap-6 sm:gap-8 items-center">
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL'
            className='rounded-full border-indigo-500 border-2 w-full p-2 sm:p-4 sm:py-1 text-sm sm:text-base' type="text" name='site' id='site' />

          <div className="flex flex-col md:flex-row w-full justify-between gap-4 sm:gap-8">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username'
              className='rounded-full border-2 border-indigo-500 w-full p-2 sm:p-4 sm:py-1 text-sm sm:text-base' type="text" name='username' id='username' />

            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password'
                className='rounded-full border-2 border-indigo-500 w-full p-2 sm:p-4 sm:py-1 text-sm sm:text-base' type="password" name='password' id='password' />
              <span className='absolute right-2 top-2 cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-1' width={22} src="icons/1722188.png" alt="eye" />
              </span>
            </div>
          </div>

          <button onClick={savePassword} className='flex justify-center items-center gap-1 bg-indigo-400 rounded-full px-6 sm:px-8 py-2 w-fit border-indigo-900 border-2 hover:bg-indigo-300 font-bold text-sm sm:text-base'>
            <lord-icon src="https://cdn.lordicon.com/efxgwrkc.json" style={{ "width": "22px", "height": "22px" }} trigger="hover"></lord-icon>
            Save
          </button>
        </div>

        {/* table */}
        <div className="passwords mt-4 overflow-x-auto">
          <h2 className='font-bold text-xl sm:text-2xl py-3 sm:py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 &&
            <table className="table-auto w-full rounded-md overflow-hidden text-sm sm:text-base min-w-[500px] mb-10">
              <thead className='bg-indigo-800 text-white'>
                <tr>
                  <th className='py-2 px-2'>Site</th>
                  <th className='py-2 px-2'>Username</th>
                  <th className='py-2 px-2'>Password</th>
                  <th className='py-2 px-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-indigo-100'>
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center'>
                        <a href={item.site} target='_blank'>{item.site}</a>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.site) }}>
                          <lord-icon
                            style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/xuoapdes.json"
                            trigger="hover">
                          </lord-icon>
                        </div></div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center'>
                        <span>{item.username}</span>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.username) }}>
                          <lord-icon
                            style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/xuoapdes.json"
                            trigger="hover">
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center'>
                        <span>{item.password}</span>
                        <div className='lordiconcopy size-7 cursor-pointer' onClick={() => { copyText(item.password) }}>
                          <lord-icon
                            style={{ "width": "20px", "height": "20px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/xuoapdes.json"
                            trigger="hover">
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>

                      <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}><lord-icon
                        src="https://cdn.lordicon.com/exymduqj.json"
                        trigger="hover" stroke="bold"
                        colors="primary:#121331,secondary:#000000"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon></span>
                      <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}><lord-icon
                        src="https://cdn.lordicon.com/xyfswyxf.json"
                        trigger="hover"
                        colors="primary:#121331,secondary:#000000"
                        style={{ "width": "25px", "height": "25px" }}>
                      </lord-icon></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          }
        </div>
      </div>
    </>
  );
};

export default Manager;
