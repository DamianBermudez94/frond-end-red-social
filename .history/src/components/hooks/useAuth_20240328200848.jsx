import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
//* Hook que sirve para reutilizar el AuthContext en cualquier componente de forma mas clara 

export const useAuth = () => {
  return useContext(AuthContext);
}
