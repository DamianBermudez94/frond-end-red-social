import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
//* Hook que 
const useAuth = () => {
  return useContext(AuthContext)
}
export default useAuth;