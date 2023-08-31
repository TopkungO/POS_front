import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Layout } from 'antd';

//css
import "./style/App.css"
//layout
import Nav from "./component/layout/Nav"
//page
import Home from './component/page/Home';
import Login from './component/page/Login';
import Register from './component/page/Register';

//pageAdmin
import AdminRoute from './component/router/AdminRoute'; //RouteAdmin
import HomeAdmin from './component/page/admin/HomeAdmin';
import Dashboard from './component/page/admin/Dashboard';
import UserDash from './component/page/admin/UserDash';
import Category from './component/page/admin/Category';
import Order from './component/page/admin/Order';
import Product from './component/page/admin/Product';
import Report from './component/page/admin/Report';
import EditProduct from './component/page/admin/layoutAdmin/EditProduct';
//pageuser
import UserRoute from './component/router/UserRoute'; //RouteUser



const { Header } = Layout;
const App: React.FC = () => {

  return (
    <Layout>
      <Header style={{ display: 'flex', justifyContent: "space-between" }}>
        <div style={{ color: "white" }} >

          <h1>logo</h1>
        </div>
        <Nav />
      </Header>

      <Layout style={{ padding: '0 24px 24px', width: "100vw", height: "100vh" }}>
        <Routes>
          //Todo:-----------------------------------
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />



          //Todo:-------------adminRoute-------------
          <Route path='/admin' element={
            <AdminRoute>
              <HomeAdmin />
            </AdminRoute>}
          />
          <Route path='/dashboard' element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>}
          />
          <Route path='/user' element={
            <AdminRoute>
              <UserDash />
            </AdminRoute>}
          />
          <Route path='/category' element={
            <AdminRoute>
              <Category />
            </AdminRoute>}
          />
          <Route path='/products' element={
            <AdminRoute>
              <Product />
            </AdminRoute>}
          />
          <Route path='/orders' element={
            <AdminRoute>
              <Order />
            </AdminRoute>}
          />
          <Route path='/reports' element={
            <AdminRoute>
              <Report />
            </AdminRoute>}
          />
          <Route path='/product/:id' element={
            <AdminRoute>
              <EditProduct />
            </AdminRoute>}
          />

          //Todo:-------------userRoute--------------
          {/* <Route path='/user' element={
            <UserRoute>
              <HomeUser/>
            </UserRoute>
          } */}

        </Routes>
      </Layout>
    </Layout>
  );
};

export default App;