import React from 'react';
import { Dashboard } from '../../pages/Dashboard/Dashboard';


export const DashboardContainer = () => {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '100%' }}>
        <Dashboard />
    </div>;
};
