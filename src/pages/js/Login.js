import React, { useEffect, useState } from "react";
import "../css/login.css";
import LoginImg from "../img/image-1.webp";
import loginimg from "../img/image-2.webp";
import { AiOutlineUser } from "react-icons/ai";
import { FiMail } from "react-icons/fi";
import { BiLockAlt } from "react-icons/bi";
import axios from "axios";
import url from "./Host";
import { type } from "@testing-library/user-event/dist/type";
import Navbar from "./Navbar";
import { FcGoogle } from 'react-icons/fc'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { FaFacebook } from 'react-icons/fa'

import Swal from "sweetalert2";


export default function Login() {
  const [page, setPage] = useState(1)
  const [email, setEmail] = useState()
  const [name, setName] = useState()
  const [data, setData] = useState([])

  function userModal() {

    var formdata = new FormData()


    formdata.append("username", document.querySelector('.name').value)
    formdata.append("email", document.querySelector('.email').value)
    formdata.append("password", document.querySelector('.password').value)

    axios.post(`${url}/auth/register`, formdata).then(res => {
      setPage(4)
    }).catch(err=>{
      Swal.fire("Уже есть пользователь с таким именем или эмаилом")
    })
  }



  function userVeri() {
    var formdata = new FormData()


    formdata.append('code', document.querySelector("#verifak").value)

  axios.post(`${url}/auth/verify`,formdata).then(res=>{
      Swal.fire("Вы успешно зарегистрировались")
          localStorage.setItem("token",res.data.access)
    window.location="/user"

  }).catch(err=>{
         Swal.fire("Вы неправильно ввели код, попробуйте снова")

    })
  }

  function userAvto() {
    var formdata = new FormData()
    formdata.append("email", document.querySelector("#email").value)
    formdata.append("password", document.querySelector("#parol").value)


    // wait otaw


    axios.post(`${url}/auth/login`,formdata).then(res=>{
      sessionStorage.setItem("password",document.querySelector("#parol").value)
      Swal.fire("Вы успешно вошли в аккаунт")
      localStorage.setItem("token",res.data.access)
    window.location="/user"
     

    }).catch(err=>{
      Swal.fire('Пароль или логин неправилный. Попробуйте снова')
      // Swal.fire("Пароль или логин неправилный. Попробуйте снова")
    })

  }




  const [state1, setState1] = React.useState();
  useEffect(() => {
    setState1(
      localStorage.getItem("lang") ? localStorage.getItem("lang") : "en"
    );
  }, []);

     
  return (
    <div>
      <Navbar />
      <div className="login_big_div">
        {page === 4 ? (
          <div className="login_db">
            <div className="login_relative">
              <img className="LoginImg" src={LoginImg} alt="" />
              <div className="login_small_div">
                <form>
                  <div className="login_small_div_input">
                    <h1>{state1 === "en" ? ("Verification") : ("Верификация")}</h1>
                    <p>{state1 === "en" ? ("Code sent to your email") : ("Код отправлен на вашу электронную почту")}</p>
                    <div className="royhat_small_input">
                      <FiMail className="login_icon" />
                      <input placeholder="Верификация" id="verifak" type="number" required />
                    </div>
                    <div className="login_button_div">
                      <button type="button" onClick={() => userVeri()}>{state1 === "en" ? ("Verification") : ("Верификация")}</button>
                    </div>
                  </div>
                </form>
              </div>
              <img className="loginimg" src={loginimg} alt="" />
            </div>
          </div>) : (
          <div className="login_db">
            <div className="login_i_register_button">
              <button onClick={() => setPage(1)} style={page === 1 ? { background: '#9cf' } : { background: 'white', color: 'black', border: '2px solid #9cf' }}>{state1 === "en" ? ("Login") : ("Авторизоваться")}</button>
              <button onClick={() => setPage(2)} style={page === 2 ? { background: '#9cf' } : { background: 'white', color: 'black', border: '2px solid #9cf' }}>{state1 === "en" ? ("Registration") : ("Регистрация")}</button>
            </div>
            {page === 1 ? (
              <div className="login_relative">
                <img className="LoginImg" src={LoginImg} alt="" />
                <div className="login_small_div">
                  <form action="">
                    <div className="login_small_div_input">
                      <h1>{state1 === "en" ? ("Login") : ("Авторизоваться")}</h1>
                      <div className="royhat_small_input">
                        <FiMail className="login_icon" />
                        <input placeholder={state1 === "en" ? ("Email") : ("Электронная почта")} id="email" type="text" required />
                      </div>
                      <div className="royhat_small_input">
                        <BiLockAlt className="login_icon" />
                        <input placeholder={state1 === "en" ? ("Password") : ("Пароль")} id="parol" type="password" required />
                      </div>
                      <div className="parol-esdan-chiqdi">
                        <a href="">Забыл пароль ?</a>
                      </div>
                      <div className="login_button_div">
                        <button type="button" onClick={() => userAvto()} >{state1 === "en" ? ("Login") : ("Авторизоваться")}</button>
                      </div>
                      <div className="google_div">
                        <FcGoogle className="google_icon" />
                        <AiFillTwitterCircle className="twiter_icon" />
                        <FaFacebook className="facebooc_icon" />

                      </div>
                    </div>
                  </form>
                </div>
                <img className="loginimg" src={loginimg} alt="" />
              </div>) :
              (
                <div className="login_relative">
                  <img className="LoginImg" src={LoginImg} alt="" />
                  <div className="login_small_div">
                    <form>
                      <div className="login_small_div_input">
                        <h1>{state1 === "en" ? ("Registration") : ("Регистрация")}</h1>
                        <div className="login_small_input">
                          <AiOutlineUser className="login_icon" />
                          <input className="name" placeholder={state1 === "en" ? ("Name") : ("Имя")} type="text" required />
                          <div className="error">{state1 === "en" ? ("It's already in use") : ("Это уже используется")}</div>
                        </div>
                        <div className="login_small_input">
                          <FiMail className="login_icon" />
                          <input onChange={setEmail} className="email" placeholder={state1 === "en" ? ("Email") : ("Электронная почта")} type="text" required />
                          <div className="error">{state1 === "en" ? ("It's already in use") : ("Это уже используется")}</div>
                        </div>
                        <div className="login_small_input">
                          <BiLockAlt className="login_icon" />
                          <input className="password" placeholder={state1 === "en" ? ("Password") : ("Пароль")} type="password" required />
                          <div className="error">{state1 === "en" ? ("The password cannot be less than 8") : ("Пароль не может быть меньше 8")}</div>
                        </div>
                        <div className="login_button_div">
                          <button type="button" onClick={() => userModal()}>{state1 === "en" ? ("Registration") : ("Регистрация")}</button>
                        </div>
                        <div className="google_div">
                          <FcGoogle className="google_icon" />
                          <AiFillTwitterCircle className="twiter_icon" />
                          <FaFacebook className="facebooc_icon" />

                        </div>
                      </div>
                    </form>
                  </div>
                  <img className="loginimg" src={loginimg} alt="" />
                </div>
              )}
          </div>
        )}


      </div>
    </div>
  );
}
