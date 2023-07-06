import React, { useState } from 'react'
import '../css/Pdp.css'
import Nav from 'react-bootstrap/Nav';
import Filtr from "./Searchfilter"
import 'bootstrap/dist/css/bootstrap.min.css';
import Bilim from './Bilim'
// import Mon from '../img/Mon.png'
// import { AiFillStar } from 'react-icons/ai'
// import {HiArrowRight} from 'react-icons/hi'
// import Rasp from '../img/Rasp.png'
// import {BsPlus} from 'react-icons/bs'
import {TiThMenu} from 'react-icons/ti'
export default function Pdp() {
    const [toggle, setToggle] = useState(1)

    function updatetoggle(id) {
        setToggle(id)
    }

    function menuModal(){
        document.querySelector(".profil_modal_media").classList.toggle("menu_modal")
    }

    return (
        <div>
            <div className="gray_blok">
                <div className="fil_text_blok">
                <h1 onClick={()=>updatetoggle(1)} className='fromLeft'>Мои курсы</h1>
                <h1 onClick={()=>updatetoggle(2)} className='fromLeft'>Мои усвоенные знания</h1>
                <h1 onClick={()=>updatetoggle(3)} className='fromLeft'>Мои сертификаты</h1>
                <h1 onClick={()=>updatetoggle(4)} className='fromLeft'>Мои наставники-члены</h1>
                </div>
                <div className="profil_blok_menu_size">
                <TiThMenu onClick={()=>menuModal()} className='profil_blok_menu'/>
                </div>
                <div className="profil_modal_media">
                <h1 onClick={()=>updatetoggle(1)} className='fromMenu'>Мои курсы</h1>
                <h1 onClick={()=>updatetoggle(2)} className='fromMenu'>Мои усвоенные знания</h1>
                <h1 onClick={()=>updatetoggle(3)} className='fromMenu'>Мои сертификаты</h1>
                <h1 onClick={()=>updatetoggle(4)} className='fromMenu'>Мои наставники-члены</h1>
                </div>
            </div>
            
            <div className={toggle === 1 ? "show-content" : "content"}><Filtr /></div>
            <div className={toggle === 2 ? "show-content" : "content"}><Bilim/></div>
            <div className={toggle === 3 ? "show-content" : "content"}>sertifikatim </div>
            <div className={toggle === 4 ? "show-content" : "content"}>azolarim</div>

        </div>
    )
}
