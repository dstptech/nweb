import React from 'react';
import { Outlet } from 'react-router-dom';
import '../style/index.css';

export default function Layout() {
  return <Outlet />;
}