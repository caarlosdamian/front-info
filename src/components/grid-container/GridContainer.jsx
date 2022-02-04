import React from 'react';
import { BottomGrid } from '../../pages/bottom/BottomGrid';
import { Top } from '../../pages/top/Top'

export const GridContainer = () => {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Top />
        <BottomGrid />
    </div>;
};
