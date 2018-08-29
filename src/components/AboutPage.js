import React from 'react';
//import { Link } from 'react-router-dom';
import '../styles/about-page.scss';

// Since this component is simple and static, there's no parent container for it.
const AboutPage = () => {
  return (
    <div className="main-app-container">
      <h2 className="alt-header">About</h2>
      <p>
        Kisi Mini has been created as a testing project for the recruitment process of Kisi
      </p>
    </div>
  );
};

export default AboutPage;