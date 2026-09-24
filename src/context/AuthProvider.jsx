import { useEffect, useState } from 'react'
import AuthContext from './AuthContext.js'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [isAuthLoading, setIsAuthLoading] = useState(true)

  useEffect(() => {
    async function restoreSession() {
      if (!token) {
        setIsAuthLoading(false)
        return
      }

      try {
        const response = await fetch('http://localhost:3000/auth/me', {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })

        if (!response.ok) {
          throw new Error('Oturum doğrulanamadı')
        }

        const data = await response.json()
        setUser(data)
      } catch (error) {
        console.error('Oturum geri yüklenirken hata oluştu:', error)
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
      } finally {
        setIsAuthLoading(false)
      }
    }

    restoreSession()
  }, [token])

  async function login(email,password){
    
        const response = await fetch("http://localhost:3000/auth/login",{
            method: "POST",
            headers:{
               "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email:email,
                password:password
            })
        })
        const data = await response.json()
        if(!response.ok){
            throw new Error(data.message)
        }
        localStorage.setItem("token",data.token)
        setToken(data.token)
        setUser(data.user)
        return data.user
    
  }

  function logout(){
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  const contextValue = {
    user,
    token,
    setUser,
    setToken,
    isAuthLoading,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
