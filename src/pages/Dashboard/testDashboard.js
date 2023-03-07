import React from 'react';
import styles from './dashboard.module.css';
const template1 = "https://res.cloudinary.com/djlewzcd5/image/upload/v1670359345/istockphoto-1177339095-170667a_qnpg6m.jpg"

const TestDashboard = () => {
  return (
    <div className={styles.dashboard}>
      <div className={styles.profile}>
        <div className={styles.avatar}>
          <img src={template1} alt="Avatar" />
        </div>
        <div className={styles.info}>
          <h2>John Doe</h2>
          <p>Web Designer</p>
        </div>
      </div>
      <div className={styles.templates}>
        <h2>Available Templates</h2>
        <div className={styles.scroll}>
          <div className={styles.card}>
            <img src={template1} alt="Template 1" />
            <h3>Template 1</h3>
          </div>
          <div className={styles.card}>
            <img src={template1} alt="Template 2" />
            <h3>Template 2</h3>
          </div>
          <div className={styles.card}>
            <img src={template1} alt="Template 3" />
            <h3>Template 3</h3>
          </div>
          <div className={styles.card}>
            <img src={template1} alt="Template 4" />
            <h3>Template 4</h3>
          </div>
        </div>
      </div>
      <div className={styles.myTemplates}>
        <h2>My Templates</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <img src={template1} alt="My Template 1" />
            <h3>My Template 1</h3>
          </div>
          <div className={styles.card}>
            <img src={template1} alt="My Template 2" />
            <h3>My Template 2</h3>
          </div>
          <div className={styles.card}>
            <img src={template1} alt="My Template 3" />
            <h3>My Template 3</h3>
          </div>
          <div className={styles.card}>
            <img src={template1} alt="My Template 4" />
            <h3>My Template 4</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDashboard;
