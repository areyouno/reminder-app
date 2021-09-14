import React from "react";
import styles from "./Layout.module.scss";

import SideBar from "../Navigation/SideBar/SideBar";

const Layout = props => {
       return (
              <div className={styles.Layout}>
                     <SideBar></SideBar>
              </div>
       );
};

export default Layout;
