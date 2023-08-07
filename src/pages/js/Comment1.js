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
import {AiOutlineDelete}from "react-icons/ai"
import {CgClose} from "react-icons/cg"
import anonim from '../img/anonim-user.png'


export default function Comment1() {
  const [comment,setComment]=useState([])
  const [comment2,setComment2]=useState()
  const [page, setPage]=useState(4)
  const [state1, setState1] = React.useState();
  const [deleteId1,setDeleteId1]=useState()

  const [user,setUser]=useState([])
  const [oneuser,setoneuser]=useState([])

  // useEffect(() => {
  //   setState1(
  //     localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
  //   );},[]);

  // useEffect((id)=>{


  //   axios.get(`${url}/api/course_theme_comment/${id}`, {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}})
  //   .then(res=>{
  //     setComment(res.data)
  //     console.log(res.data);
  //   })
  //   .catch(err=>{
  //     alert("error")
  //   })
  // },[])  

useEffect(()=>{
  axios.get(`${url}/api/course_theme_comment/${JSON.parse(localStorage.getItem("page_video")).id}`, {
    headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}})
  .then(res=>{
    setComment(res.data)
    console.log(res.data);
  })
  .catch(err=>{
  })



axios.get(`${url}/auth/oneuser`,{
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
}).then(res=>{
setoneuser(res.data)
console.log(res.data,"salom");
})
},[])


  function messagePost(id){

    var formdata = new FormData()
    formdata.append("text",document.querySelector("#chat_text").value)
    formdata.append("image",document.querySelector("#comment_file").files[0])
    formdata.append("user_id", oneuser[0].id)
    formdata.append("theme", JSON.parse(localStorage.getItem("page_video")).id)
    formdata.append("subcomment", 0)

    axios.post(`${url}/api/course_theme_comment/`, formdata, {
      headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}
    })
    .then(res=>{
      axios.get(`${url}/api/course_theme_comment/${JSON.parse(localStorage.getItem("page_video")).id}`, {
        headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}})
      .then(res=>{
  
        setComment(res.data)
        console.log(res.data,);
      })
    document.querySelector("#chat_text").value=""

    })
    .catch(err=>{
      alert("Нельзя писать больше 50 символов")
    })

    axios.get(`${url}/api/course_theme_comment/${JSON.parse(localStorage.getItem("page_video")).id}`, {
      headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}})
    .then(res=>{

      setComment(res.data)
      console.log(res.data,);
    })
    .catch(err=>{
    })
  }

  function deleteComment(id) {
    axios
    .delete(`${url}/api/course_theme_comment/${id}`, {headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}})
    .then(res=>[
      alert("Вы действительно хотите удалить свой комментарий"),
      axios.get(`${url}/api/course_theme_comment/${JSON.parse(localStorage.getItem("page_video")).id}`, {
        headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}})
      .then(res=>{
  
        setComment(res.data)
        console.log(res.data,);
      })
    ])
    axios.get(`${url}/api/course_theme_comment/${JSON.parse(localStorage.getItem("page_video")).id}`, {
      headers:{Authorization: `Bearer ${localStorage.getItem("token")}`}})
    .then(res=>{

      setComment(res.data)
      console.log(res.data,);
    })
    .catch(err=>{
      alert("Вы не смогли удалить комментарий, попробуйте снова.")
    })
  }

  function OpenotvetMadal(item) {
    document.querySelector(".commetn_otvet_kaytarish").style="display: flex; "
setComment2(item)


  }
  function CloseotvetMadal() {
    document.querySelector(".commetn_otvet_kaytarish").style="display: none;"
  }
  function cencelModal() {
    document.querySelector("#chat_text").value=""
  }

  return (
    <div>

    <div className='m_comment_kotta'> 
    <div className="m_otdel_bgc">

      {comment.map(item => {
        return(
          <div className="m_comment">
          <div className="m_comment_img">
          {
            oneuser.map(item2 => {
              return(
                <>
            {/* {item2.image==null?(<img src={person} alt="" />):(
            <img src={item2.image.includes("http")?item2.image:`${url}/${item2.image}`} alt="" />)} */}
            <img src={item.oneuser?item.oneuser.image.includes("http")?item.oneuser.image:`${url}/${item.oneuser.image}`:
            <img src={anonim} alt="" />} alt="" />
           </>
              )
            })
          }
            
          </div>
          <div className="m_comment_text">
              
         

                <h5>{item.oneuser?item.oneuser.username:"Anonim User"}</h5>
            
              <img src={item.image.includes("http")?item.image:`${url}/${item.image}`} alt="" />
              <p className='m_comment_text1505'>{item.text}</p>
              <div className="m_comment_otvet"> 
<p  className='m_otvet_comment' onClick={()=>OpenotvetMadal(item.text)}><span><FiCornerUpLeft/></span><a href="#comment_down">Ответить</a></p> 
  
              {oneuser.map(item5=>{
                return(
                  <>
                  {item5.id==item.user_id?(
              <p className='m_comment_delete' onClick={()=>{deleteComment(item.id)}}><span><AiOutlineDelete/></span>удалить</p>):
              ("")
              }
                </>
                )
                
              })}
            
              
              </div>
          </div>
      </div>
        )
       })}  




      
                  <div className="commetn_otvet_kaytarish">
                  <div className="m_comment_img1">
          {
            oneuser.map(item2 => {
              return(
                <>
             <img src={comment.oneuser?comment.oneuser.image.includes("http")?comment.oneuser.image:`${url}/${comment.oneuser.image}`:
            <img src={anonim} alt="" />} alt="" />
                </>
              )
            })
          }
            
          </div>
                    <div className="comment_otvet_block" id='comment_down'>
                    {
            oneuser.map(item1 => {
              return(
                <h6>{comment.item1?comment.item1.username:"Anonim User"}</h6>
              )
            })
          }

                <p>{comment2?(<>{comment2.slice(0,15)}...</>):(<>{comment2}</>)}</p>

                        
                    </div>
                
                  <span id='closeModal' onClick={()=>{CloseotvetMadal()}}><CgClose/></span>
                  </div>


            <div className="m_comment_yozish">
              <input type="file" id='comment_file' />
              <p><FcFile/></p>
              
              <textarea placeholder='Введите текст' id="chat_text"></textarea>
            </div>
            <div className="m_comment_button">
              <button className='m_otmen' onClick={()=>{cencelModal()}}>Cancel</button>
              <button onClick={(event)=>{ messagePost(); cencelModal()}} className='m_otpravit'>Send</button>
              </div></div>
    </div>
    </div>
  )
}
