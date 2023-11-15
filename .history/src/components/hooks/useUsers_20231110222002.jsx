import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
//* Hook que sirve para 

export const useUser = () => {
  return useContext(UserContext)
}
