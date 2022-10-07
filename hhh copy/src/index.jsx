import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom"
import App from './app.jsx'
import Drawer from './drawer.jsx'

const routing = (
    
    <Router>
      <div>
      </div>
      {/* 路由入口 */}
      <Link to="/*">inex</Link>
      <Link to="/App">页面111</Link>
      <Link to="/Drawer">页面121</Link>
      {/* 路由出口 */}
      <Routes>
        {/* <Routes path="/first" component={First}></Routes> */}
        <Route path="/App" element={<App />}></Route>
        <Route path="/*" element={<App />}></Route>
        <Route path="/Drawer" element={<Drawer />}></Route>
      </Routes>
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'))