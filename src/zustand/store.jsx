import { create } from 'zustand'
import { addScoreBD, editChampions, setUpdateProfile } from '../firebase/firebase'

const useGameStore = create((set, get) => ({
   loading: true,
   players: [
           {
            id: 'player_1',
            name: 'Yess',
            alias: '',
            img: '',
            score: 0,
            champions: 0,
           },
           {
            id: 'player_2',
            name: 'Sebas',
            alias: '',
            img: '',
            score: 0,
            champions: 0,
           }   
    ],
       increaseScore: async (id, score_player_1, score_player_2) => {
           set((state) => ({
               players: [{...state.players[0], score: score_player_1}, {...state.players[1], score: score_player_2} ]
            }))
            // actualizar BD
            addScoreBD(get().players[id])
    },
       increaseChampions: async (champions_player_1, champions_player_2) => {
         set((state) => ({
            players: [{...state.players[0], score:0, champions: champions_player_1},
             {...state.players[1], score: 0, champions: champions_player_2} ] 
        }))
       //actualizar BD
       editChampions(get().players[0], get().players[1])
    },
       getDatabase: (data)=> {
         const getData = data.length > 0  ? data : get().players
         set((state) => ({
            players: [...getData]
         }))
         set((state) => ({
            loading: false
         }))
       },
       updateProfile: (id, data)=> {
     
         const key = id === "player_1" ? 0 : 1    
         set((state) => {   
            const players =  structuredClone(state.players) // 
            players[key] = {...state.players[key], img: data.img, alias: data.alias}
            return { players }
          })
          //update BD
          setUpdateProfile(get().players[key])

       },
    
    
  }))

  export default useGameStore