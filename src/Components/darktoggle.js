import React, { useEffect, useState } from "react";
// import Toggle from 'react-toggle'
// import { BsMoon } from "react-icons/bs";
// import { BsSun } from "react-icons/bs";

const DARK_CLASS = "dark";

const DarkToggle = () => {

  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    try {
      const dark = localStorage.getItem('prevState')
      if(dark != null) {
        setIsDark(dark==='true')
        if (dark) {
          document.documentElement.classList.add(DARK_CLASS)
        } else {
          document.documentElement.classList.remove(DARK_CLASS)
        }
      }
    }
    catch(e) {

    }
  }, [])

     useEffect(() => {
       if (isDark) {
         document.documentElement.classList.add(DARK_CLASS)
       } else {
         document.documentElement.classList.remove(DARK_CLASS)
       }
     }, [isDark]);

  return (
      <label className="switch">
        <p>DARK MODE</p>
        <input type="checkbox" 
        checked={isDark}
        className="DarkToggle"
        onChange={event => {
          setIsDark(event.target.checked)
          localStorage.setItem('prevState', event.target.checked)
        }}
        ></input>
        <span class="slider round"></span>
      </label>
  );
};
export default DarkToggle;