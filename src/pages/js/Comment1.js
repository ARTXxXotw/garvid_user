import React, { useEffect, useState } from 'react'
import '../css/comment.css'
import {FiCornerUpLeft} from 'react-icons/fi'
import {FcFile} from 'react-icons/fc'
import img_comment from '../img/Ellipse.jpg'
import img_comment1 from '../img/Ellipse.png'
import axios from 'axios'
import url from './Host'
import person from '../img/149071.png'
import { MdClose } from "react-icons/md";
import "../css/yozishmalar.css";




export default function Comment1() {
  const [comment,setComment]=useState([])
  const [state1, setState1] = React.useState();
  const [user,setUser]=useState([])

  // useEffect(() => {
  //   setState1(
  //     localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
  //   );},[]);

  // useEffect(()=>{
  //   axios.get(`${url}/course_theme_comment `, {
  //     headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
  //   })
  //   .then(res=>{
  //     setComment(res.data)
  //     console.log(res.data);
      
  //   })
  //   .catch(err=>{
  //     alert(err )
  //   })
  // },[])  

  function messagePost(id){
    var formdata = new FormData()

    formdata.append("text",document.querySelector("#chat_text").value)
    formdata.append("image",document.querySelector("#comment_file").files[0])
    formdata.append("theme",comment[0].theme)
    formdata.append("subcomment", comment[0].subcomment)
    formdata.append("user",comment[0].user)


    axios.post(`${url}/course_theme_comment`, formdata, {
      headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
    })
    .then(res=>{
      console.log(res.data);
    })
    .catch(err=>{
      alert("error")
    })

    axios.get(`${url}/course_theme_comment/${id}`, {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}})
    .then(res=>{
      setComment(res.data)
      console.log(res.data);
    })
    .catch(err=>{
      alert("error")
    })
  }


  return (
    <div>

    <div className='m_comment_kotta'> 
    <div className="m_otdel_bgc">

      {comment.map(item=>{
          <div className="m_comment">
          <div className="m_comment_img">
            {item.image===null?(<img src={person} alt="" />):(<img src={item.image} alt="" />)}
              <img src={person} alt="" />
          </div>
          <div className="m_comment_text">
              <h4>sdasdas</h4>
              <p>wsefwrg</p>
              <div className="m_comment_otvet"> 
              <p><span><FiCornerUpLeft/></span>Ответить</p> 
              </div>
          </div>
      </div>
       })}  




       {/* <div id="Javob" className="javob_berish">
                    <div className="javob_berish_div">
                      <div className="javob_berish_blok_text">
                        <h1>Turaev Jafarbek</h1>
                        <p>Lorem ipsum dolor sit.</p>
                      </div>
                      <div className="javob_berish_div_fill">
                        <MdClose onClick={() => javobClose()} />
                      </div>
                    </div>
                  </div> */}
                  
            <div className="m_comment_yozish">
              <input type="file" id='comment_file' />
              <p><FcFile/></p>
              
              <textarea placeholder='Введите текст' id="chat_text"></textarea>
            </div>
            <div className="m_comment_button">
              <button className='m_otmen'>Cancel</button>
              <button onClick={()=>messagePost()} className='m_otpravit'>Send</button>
              </div></div>
    </div>
    </div>
  )
}
