import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
//* Hook que sirve para 
const useAuth = () => {
  return useContext(AuthContext)
}
export default useAuth;