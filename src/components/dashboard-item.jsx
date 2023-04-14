import styled from 'styled-components'
import { useState, useRef } from 'react'
import { setUserProfilePhoto, getProfilePhotoURL } from '../firebase/firebase'
import useGameStore from "../zustand/store"
import Modal from './modal'
import dado from "../assets/dado.png"
import trofeo from "../assets/trofeo.png"


const DashboardItemStyled = styled.section`
    border: 2px solid #eee;
    padding: 1.5rem;
    border-radius: 1rem;
    max-inline-size: 300px;
    inline-size: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    flex-shrink: 1;
    position: relative;
    background: #ffffff5e;
    box-shadow: 1px 1px 5px #000;
    /* background: #303134;
    color: white; */


    .namePlayer{
        font: var(--title);
        margin:0;
        padding:0;
        text-align: center;
    }
    
    &.player_1{
        
    }

    &.player_2{
        
    }

    img.profilePhoto{
        inline-size: 100px;
        block-size: 100px;
        object-fit: cover;
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 1px 1px 5px #000;
        box-sizing: border-box;
    }
    p{
        margin: 0;
        padding: 0;
    }

    .editButton{
        position: absolute;
        inset-block-start: 1rem;
        inset-inline-end: 1rem;

    }

    .iconText{
        font-size: 1.5rem;
        font-weight: 800;
        display: flex;
        align-items: center;
        gap: .4rem;
        padding-inline: 1rem;
    }

    .info{
        display: flex;
        /* gap: 2rem; */
    }

    .iconText.effect{
        cursor: pointer;
        overflow: hidden;
        

    }

    .iconText.effect span{
        inline-size: 2rem;
        /* border: 1px solid red; */
    }

    .iconText.effect:active img{
        animation: example;
        animation-duration: 5s;
    }

    @keyframes example {
    0% {transform: scale(.5);}
    90% {transform: scale(1);}
    }

    .iconText.effect span{

    }

    .info .iconText:first-child{
        border-inline-end: 2px solid #eee;
    }

`

function DashboardItem({player, handleClicScore}) {
    const { updateProfile } = useGameStore()
    const [editProfile, setEditProfile] = useState(false)
    const [infoProfile, setInfoProfile] = useState({
        alias: '',
        img: '' 
    })

    const changeImg = useRef('')

    function handleClicEditProfile(){
        setEditProfile(true)
        setInfoProfile({alias: player.alias, img: player.img})
        
    }

    function handleClicUpdateProfile(e){
        console.log(e.target.offsetParent.id)
        setEditProfile(false)
        updateProfile(e.target.offsetParent.id, infoProfile)
    }

    function handleClicChangeImage(){
       if(changeImg.current){
         changeImg.current.click()
       }
    }
    //Cambio de imagen
    async function handleChangeImg(e){
        const id = e.target.name
        const files = e.target.files
        const fileReader = new FileReader()

        //Validamos si ya tiene un archivo seleccionado
        if(fileReader && files.length > 0){
          //convetir el primer elemento que encuentres
          fileReader.readAsArrayBuffer(files[0])
          fileReader.onload = async function(){
            const imgData = fileReader.result
            const res = await setUserProfilePhoto(id, imgData)
            if(res){
             const url =  await getProfilePhotoURL(res.metadata.fullPath)
             setInfoProfile(prev => { 
                return {...prev, img: url}
             }) 


            }
          }
        
        }
        // console.log(files)

     
    }

    return (
        //ARREGLAR UN UNICO ID
        <DashboardItemStyled className={player.id} id={player.id}>
        <h2 className='namePlayer'>{player.alias}</h2>
        {/* EDITANDO EL PERFIL */}
        {editProfile ? 
            <Modal id={player.id}>
                <div className='container-imgButton'>
                    {infoProfile.img ? <img className='profilePhoto'  src={infoProfile.img} /> : null }  
                    <button onClick={handleClicChangeImage}>✎</button>
                </div>
           
                <input  ref={changeImg} type="file" name={player.id} style={{display: 'none'}} onChange={handleChangeImg}/>
                <input type="text" placeholder='Yess...' value={infoProfile.alias} onChange={(e)=> 
                setInfoProfile(prev => { 
                    return {...prev, alias: e.target.value}
                } ) }/>
              <button className='editButton'  onClick={handleClicUpdateProfile}>✅</button>
            </Modal> 
            : 
            null
           }
          {
              <>
               {player.img ? <img className='profilePhoto' src={player.img} onDoubleClick={handleClicEditProfile} /> : null }  
               <div className='info'>
                    <p onClick={(e)=> handleClicScore(e)} className='iconText effect'>{<img src={dado} width="28"/>} <span> {player.score} </span> </p>
                    <p className='iconText'>{<img src={trofeo} width="28"/>} <i>  </i> {player.champions}</p>
               </div>

               {/* <button id={player.id}  onClick={(e)=> handleClicScore(e)}> + </button> */}
              </>
          }
        
         
        </DashboardItemStyled>
    )
}

export default DashboardItem
