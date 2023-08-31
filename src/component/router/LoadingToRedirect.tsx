import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../store/store'

import { logout } from '../function/auth'
import { LOGOUT } from '../../store/userSlice'


const LoadingToRedirect = () => {
  const [count, setCount] = useState(3)
  const { persistedReducer } = useAppSelector((state: any) => ({ ...state }))
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 1000)

    // count === 0 && navigate("/")
    if(count=== 0) {

      const user = {
        username: persistedReducer.user.username,
      }

      logout(user)
        .then(res => {
          console.log(res);
          const payload = {
            username: "",
            role: [],
            token: ""
          }
          dispatch(LOGOUT(payload))
          localStorage.clear()
          navigate("/")
          
        }).catch(err => {
          console.log(err);
        })        

        return () => clearInterval(interval)
    }

  }, [count])

  return (
    <div>
      <h1>No Permission, redirect in {count}</h1>
    </div>
  )

    ;
}

export default LoadingToRedirect