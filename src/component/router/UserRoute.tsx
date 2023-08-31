import React from 'react'
import { useAppSelector } from "../../store/store.ts"
import LoadingToRedirect from './LoadingToRedirect.tsx'

type Props = {
  //children: string | JSX.Element | JSX.Element[] 
  children: React.ReactNode
}

const UserRoute = ({ children }: Props) => {
  const { appReducer } = useAppSelector((state: any) => ({ ...state }));
  return (appReducer.user && appReducer.user.token ? <div>{children}</div> : <LoadingToRedirect />)
}

export default UserRoute