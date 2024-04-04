import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
//* Hook que sirve para 

export const useAuth = () => {
  return useContext(AuthContext);
}
