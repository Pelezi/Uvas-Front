import React from "react";

import { Outlet } from "react-router-dom";

import Layout from '../components/layout';

const AppRoutes: React.FC = () => {
    return (
        <Layout>

            <Outlet />
            
        </Layout>
    )
}

export default AppRoutes;