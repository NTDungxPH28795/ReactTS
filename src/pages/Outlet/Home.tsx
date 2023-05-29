import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderHome from './Component/Header'
import FooterHome from './Component/Footer'

const Home = () => {
    return (
        <div>
            <HeaderHome />
            <Outlet />
            <FooterHome />
        </div>
    )
}

export default Home