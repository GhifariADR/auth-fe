import React from 'react';
import Navbar from '../components/Navbar';
import DashboardLayout from '../layouts/DashboardLayout';
import { usePageTitle } from '../utils/usePageTitle';

const Dashboard: React.FC = () => {

  usePageTitle("Dashboard")
    
  return (
    <div>
      <Navbar/>
      <DashboardLayout/>
    </div>
    
  );
};

export default Dashboard;