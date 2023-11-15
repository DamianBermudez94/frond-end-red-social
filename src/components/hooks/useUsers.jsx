import { useContext } from 'react'
import UserContext from '../context/UserProvider'
//* Hook que sirve para 

export const useUser = () => {
  return useContext(UserContext)
}
