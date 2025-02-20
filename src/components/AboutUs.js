import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Public.module.css';
import aboutStyles from './About.module.css'; // Create new CSS module
import recipe_star_logo from '../img/recipe_star_logo.png';

const AboutUs = () => {
  useEffect(() => {
    let intervalId;
    // Crazy background animation
    const animateBackground = () => {
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
      let current = 0;
      intervalId = setInterval(() => {
        document.documentElement.style.setProperty(
          '--main-bg-color',
          colors[current]
        );
        current = (current + 1) % colors.length;
      }, 10000);
    };

    // Floating animation for team members
    const teamMembers = document.querySelectorAll(`.${aboutStyles.teamMember}`);
    teamMembers.forEach(member => {
      member.style.animation = `float 3s ease-in-out infinite`;
    });

    setTimeout(() => {
        const teamMembers = document.querySelectorAll(`.${aboutStyles.teamMember}`);
        teamMembers.forEach(member => {
          member.style.animation = `float 3s ease-in-out infinite`;
        });
      }, 100);

    animateBackground();
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={aboutStyles.aboutContainer}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          
          <Link to='/'>
          <div className={styles.logo}>
            <img src={recipe_star_logo} alt="Recipe star" className={styles.logoImg} />
          </div>
          </Link>
          
          <nav className={styles.nav}>
            <Link to="/login" className={styles.navLink}>Recipes</Link>
            <Link to="/aboutUs" className={styles.navLink}>About Us</Link>
          </nav>
          <div className={styles.headerButtons}>
            <Link to="/login"><button className={styles.button}>Login</button></Link>
            <Link to="/signup"><button className={styles.button}>Signup</button></Link>
            
          </div>
        </div>
      </header>

      <section className={`${styles.section} ${aboutStyles.crazySection}`}>
        <div className={aboutStyles.glitchContainer}>
          <h1 className={aboutStyles.glitchText} data-text="WE ARE RECIPE REBELS">
            WE ARE RECIPE REBELS
          </h1>
          <div className={aboutStyles.glitchLines}></div>
        </div>
      </section>

      <section className={`${styles.section} ${aboutStyles.teamSection}`}>
        <h2 className={aboutStyles.spinningTitle}>THE MAD SCIENTISTS</h2>
        <div className={aboutStyles.teamGrid}>
          {['Chef Chaos', 'Dr. Flavor', 'Ms. Spice', 'Captain Cook'].map((name, index) => (
            <div 
              key={index}
              className={aboutStyles.teamMember}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(360deg)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(0deg)'}
            >
              <div className={aboutStyles.memberImage} style={{
                backgroundImage: `url(https://source.unsplash.com/random/200x200/?chef${index})`,
                backgroundColor: '#ff0000'
              }}></div>
              <h3 className={aboutStyles.memberName}>{name}</h3>
              <p className={aboutStyles.memberRole}>Master of {['Fire', 'Spice', 'Chaos', 'Flavor'][index]}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${aboutStyles.missionSection}`}>
  <div className={aboutStyles.missionText}>
    <h2 className={aboutStyles.animatedText}>
      <span className={aboutStyles.strobe}>OUR MISSION:</span><br/>
      <span className={aboutStyles.rotate}>DISRUPT</span> THE CULINARY WORLD
    </h2>
    <p className={aboutStyles.hoverReveal}>Hover to reveal secret ingredient</p>
    <div className={aboutStyles.secretIngredient}>
      <span role="img" aria-label="fire">🔥</span>
      <span role="img" aria-label="explosion">💥</span>
      <span role="img" aria-label="rainbow">🌈</span>
    </div>
  </div>
</section>

      <footer className={styles.footer}>
          <div className={styles.footerBottom}>
            <div className={styles.footerLinks}>
              <p className={styles.footerText}>© 2024 Recipe star. All rights reserved.</p>
              <a href="#" className={styles.footerLink}>Privacy Policy</a>
              <a href="#" className={styles.footerLink}>Terms</a>
              <a href="#" className={styles.footerLink}>Security</a>
              <a href="#" className={styles.footerLink}>Do not sell my data</a>
            </div>
          </div>
      </footer>
    </div>
  );
};

export default AboutUs;