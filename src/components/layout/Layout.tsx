import React, { useState } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

import styles from "./Layout.module.css";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [show, setShow] = useState(false);

    const toggleSidebar = () => {
        setShow(prevShow => !prevShow);
    };

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.main}>
                <div className={styles.sidebar}>
                    <div>
                        <button className={styles.sidebarToggle} id="sidebarToggle" onClick={toggleSidebar}>☰</button>
                    </div>
                    {/* <Sidebar /> */}
                    <Sidebar show={show} />
                </div>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;