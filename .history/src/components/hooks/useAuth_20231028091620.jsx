import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
//* Hook que sirve para 




import React from 'react'

export const useAuth = () => {
  return useContext(AuthContext)
}
