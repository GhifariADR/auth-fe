import React from 'react';
import Navbar from '../components/Navbar';
import DashboardLayout from '../layouts/DashboardLayout';

const Dashboard: React.FC = () => {
    
  return (
    <div>
      <Navbar/>
      <DashboardLayout/>
    </div>
    
  );
};

export default Dashboard;