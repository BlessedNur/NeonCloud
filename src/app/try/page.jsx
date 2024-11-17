"use client"
import React, { useState } from 'react';
import styles from './page.module.css';
// import Sidebar from '@/components/Sidebar/Sidebar';
import Image from 'next/image';

const Page = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  
  return (
    <div className={styles.full}>
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.active : ''}`}>
        {/* <Sidebar /> */}
      </div>
      <div className={styles.content}>
        <div className={styles.topnav}>
          <div className={styles.left}>
            <input type="search" name="search" id="search" placeholder="Search" />
          </div>
          <div className={styles.right}>
            <i className="fa-regular fa-bell"></i>
            <div className={styles.profile}><Image src="/images/image.png" alt="" width={100} height={100} /></div>
            <div className={styles.hamburgerMenu} onClick={toggleSidebar}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
        <div className={styles.main}>
          <nav className={styles.nav}>
            <ul>
              <h1>Account Settings</h1>
              <button className={styles.btn2}>My profile</button>
            </ul>
          </nav>
          <section className={styles.emailsection}>
            <h2>Email</h2>
            <p>Your current email address is: <span className={styles.email}>dashprops@example.com</span></p>
            <div className={styles.separate}>
              <div><h4>New email address</h4></div>
              <div><input type="email" placeholder="Enter your new email address" className={styles.inputs} /></div>
            </div>
            <button className={styles.btn1}>Save Changes</button>
          </section>
          <section className={styles.passwordsection}>
            <h2>Change your password</h2>
            <p>Your current email address is: <span className={styles.email}>dashprops@example.com</span></p>
            <div className={styles.separate}>
              <div><h4>Current password</h4></div>
              <div><input type="password" className={styles.inputs} placeholder="Enter Current password" /></div>
            </div>
            <div className={styles.separate2}>
              <div><h4>New password</h4></div>
              <div><input type="password" className={styles.inputs} placeholder="Enter New password" /></div>
            </div>
            <div className={styles.separate3}>
              <div><h4>Confirm new password</h4></div>
              <div><input type="password" className={styles.inputs} placeholder="Confirm new password" /></div>
            </div>
            <div className={styles.passwordrequirements}>
              <h2>Password requirements:</h2>
              <p>Ensure all these conditions are met</p>
              <ul>
                <li>Minimum 8 characters long - the more, the better</li>
                <li>At least one lowercase character</li>
                <li>At least one uppercase character</li>
                <li>At least one number, symbol, or whitespace character</li>
              </ul>
              <button className={styles.btn}>Save Changes</button>
            </div>
          </section>
          <section className={styles.deletesection}>
            <h2>Danger Zone</h2>
            <p className={styles.para}>Delete your profile, along with your authentication associations.</p>
            <p>Delete any and all content you have, such as articles, comments, your reading list or chat messages.
              Allow your username to become available to anyone.</p>
            <button className={styles.btn}>Delete Account</button>
            <p>Feel free to contact <span className={styles.email}>dashprops@example.com</span> with any questions.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Page;