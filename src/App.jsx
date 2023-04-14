import useGameStore from "./zustand/store"
import { useEffect } from "react"
import Dashboard from "./components/dashboard"
import { getData } from './firebase/firebase'
import Loading from "./components/loading"



function App() {
  const {loading ,players, getDatabase, increaseScore, increaseChampions} = useGameStore()
  
  useEffect(()=>{
    getData().then(data => {
      if(data.length > 0) getDatabase(data)
      //PANTALLA DE ERROR
    })
  },[])


  return (
    <>
     {!loading ? <Dashboard/>  : <Loading/>}
    </>
    
  )
}

export default App
