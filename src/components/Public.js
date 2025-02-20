import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Public.module.css';
import recipe_star_logo from '../img/recipe_star_logo.png';
import { Link } from 'react-router-dom';

const Public = () => {
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    };
    useEffect(() => {
        const sections = document.querySelectorAll(`.${styles.section}`);
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add(styles.sectionVisible);
            } else {
              entry.target.classList.remove(styles.sectionVisible);
            }
          });
        }, { threshold: 0.1 });
    
        sections.forEach(section => observer.observe(section));
        return () => sections.forEach(section => observer.unobserve(section));
      }, []);

    return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <div className={styles.logo}>
            <img src={recipe_star_logo} alt="Recipe star" className={styles.logoImg} />
          </div>
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
      <section className={styles.section} id={styles.section1}>
        <div className={styles.sectionContent}>
          <h1 className={styles.sectionTitle}>Discover New Recipes</h1>
          <p className={styles.sectionSubtitle}>Get inspired and connect with other home cooks like you.</p>
          <button  className={styles.button}>Explore</button>
        </div>
      </section>

      <section className={styles.section} id={styles.section2}>
        <div className={styles.sectionContent}>
          <h1 className={styles.sectionTitle}>Connect with the cooking community </h1>
          <p className={styles.sectionSubtitle}>Find new recipes to try and share your favorites.</p>
          <Link to="/login"><button className={styles.button}>Login</button></Link>
        </div>
      </section>

      <section className={styles.section} id={styles.section3}>
        <div className={styles.sectionContent}>
          <h1 className={styles.sectionTitle}>Join Our Community</h1>
          <p className={styles.sectionSubtitle}>Share your culinary creations and get feedback from others</p>
          <Link to='/signup'><button  className={styles.button}>Sign Up</button></Link>
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
    )
}
export default Public