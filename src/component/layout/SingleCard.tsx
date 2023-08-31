
import { IconType } from 'antd/es/notification/interface'
import React from 'react'

type propType ={
    bg: string
    text_color:string
    icon: React.ReactElement<IconType>
    header_card?:string
    prict_card?:string
}




const SingleCard = (prop: propType) => {

    return (
        <>
            <div className={`single_card ${prop.bg}`}>
                <div className={`icon ${prop.text_color}`}> {prop.icon}</div>
                <div className="conten">
                    <h1>{prop.header_card}</h1>
                    <p>{prop.prict_card}</p>
                </div>
            </div>
        </>
    )
}

export default SingleCard