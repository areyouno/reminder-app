import React from 'react';
import styles from './Layout.module.css';

import SideBar from '../Navigation/SideBar/SideBar';
// import Reminder from '../Reminder/Reminder';

const Layout = props => {
       return (
              <div className={styles.Layout}>
                     <SideBar></SideBar>
              </div>
       );
};

export default Layout;
