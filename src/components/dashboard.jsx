import styled from 'styled-components'
import DashboardItem from './dashboard-item'
import useGameStore from "../zustand/store"
import Modal from './modal'
import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'


const DashboardStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
    block-size: 100vh;
    justify-content: center;
    max-inline-size:64rem;
    margin: auto;
    padding-inline: 1.5rem;
    padding-block: 3rem;
    box-sizing: border-box;
    gap: 2rem;
    align-items: center;

    @media screen and (min-width: 752px) {
      &{
        gap: 2rem;
        align-items: center;
        block-size: auto;
      }
    }


`

function Dashboard() {
    
    const {players, increaseChampions, increaseScore} = useGameStore()
    const initialValues= {
        active: false,
        nameWinner: ''
    }
    const [winner, setWinner] = useState(initialValues)
    

    useEffect(()=> {
        if(winner.active){
           confetti()
           setTimeout(() => {
             setWinner(initialValues)
          }, 2000);
         
        }
    }, [winner.active])
   

    function handleClicScore(e){
    // console.log(e.target.offsetParent.id)
    // COPIA DEL ARRAY PARA TENER EL VALOR ACTUALIZADO
    // SUMAR PUNTOS
    const id = e.target.offsetParent.id === 'player_1' ? 0 : 1
    const playersCOPY = structuredClone(players)
    playersCOPY[id].score+= 1
    increaseScore(id, playersCOPY[0].score, playersCOPY[1].score)
    
    //CAMPEON
    if(playersCOPY[0].score === 30 || playersCOPY[1].score === 30 ){
        playersCOPY[id].champions+= 1
       increaseChampions(playersCOPY[0].champions, playersCOPY[1].champions)
       setWinner({active:true, nameWinner: id })
    //    confetti();
    //    confetti()
    //    setCurrentUser(true)
    }
  
  }
    return (
        <DashboardStyled>
             {players?.map((player, i)=> {
                return <DashboardItem player={player} key={`player-${i}`}  handleClicScore={handleClicScore}/>
      })}
      {winner.active ? 
        <Modal>
            <img className='profilePhoto'  src={players[winner.nameWinner].img} />
            <p className='modalWinner'> Felicidades {players[winner.nameWinner].alias} </p>
         
           
        </Modal> 
        : null
      }
        </DashboardStyled>
    )
}

export default Dashboard
