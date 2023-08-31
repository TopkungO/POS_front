import React, { useEffect, useState } from 'react'
//function
import { currentAdmin } from '../function/auth'
import { useAppSelector } from '../../store/store'
import LoadingToRedirect from './LoadingToRedirect'

type Props = {
    children: React.ReactNode
}

const AdminRoute = ({ children }: Props) => {
    // const { persistedReducer } = useAppSelector((state: any) => ({ ...state }))
    const [adminOk, setAdminOk] = useState(false)

    const tokenST = localStorage.getItem("token")
    useEffect(() => {

        if (tokenST) {
            currentAdmin(tokenST)
                .then(res => {
                    console.log(res);
                    setAdminOk(true)
                }).catch(err => {
                    console.log(err);
                    setAdminOk(false)
                })
        }


    }, [tokenST])

    return adminOk ? <div>{children}</div> : <LoadingToRedirect />
    
}

export default AdminRoute