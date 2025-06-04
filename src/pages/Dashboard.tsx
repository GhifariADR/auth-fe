import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { usePageTitle } from '../utils/usePageTitle';
import SideBar from '../components/SideBar';

const Dashboard: React.FC = () => {

  usePageTitle("Dashboard")
    
  return (
    <div>
        <SideBar/>                   
        <DashboardLayout/>                    
    </div>
    
  );
};

export default Dashboard;