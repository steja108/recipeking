import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Public.module.css';
import recipe_star_logo from '../img/recipe_star_logo.png';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Public = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const navigateToHome = () => {
        navigate('/');
    };
    
    // Close mobile menu when a link is clicked
    const handleNavClick = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
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
        <div className={styles.pageContainer}>
            <header className={styles.header}>
                <div className={styles.headerContainer}>
                    <div className={styles.headerLeft}>
                        <div className={styles.mobileMenu}>
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className={styles.menuButton}
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? <FaTimes /> : <FaBars />}
                            </button>
                        </div>
                        <div className={styles.logo}>
                            <img src={recipe_star_logo} alt="Recipe star" className={styles.logoImg} />
                        </div>
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
                
                {isMenuOpen && (
                    <div className={styles.mobileNav}>
                        <Link to="/login" className={styles.navLink} onClick={handleNavClick}>Recipes</Link>
                        <Link to="/aboutUs" className={styles.navLink} onClick={handleNavClick}>About Us</Link>
                        <div className={styles.mobileButtons}>
                            <Link to="/login" onClick={handleNavClick}><button className={styles.button}>Login</button></Link>
                            <Link to="/signup" onClick={handleNavClick}><button className={styles.button}>Signup</button></Link>
                        </div>
                    </div>
                )}
            </header>
            
            <section className={`${styles.section} ${styles.firstSection}`} id={styles.section1}>
                <div className={styles.sectionContent}>
                    <h1 className={styles.sectionTitle}>Discover New Recipes</h1>
                    <p className={styles.sectionSubtitle}>Get inspired and connect with other home cooks like you.</p>
                    <button className={styles.button}>Explore</button>
                </div>
            </section>

            <section className={styles.section} id={styles.section2}>
                <div className={styles.sectionContent}>
                    <h1 className={styles.sectionTitle}>Connect with the cooking community</h1>
                    <p className={styles.sectionSubtitle}>Find new recipes to try and share your favorites.</p>
                    <Link to="/login"><button className={styles.button}>Login</button></Link>
                </div>
            </section>

            <section className={styles.section} id={styles.section3}>
                <div className={styles.sectionContent}>
                    <h1 className={styles.sectionTitle}>Join Our Community</h1>
                    <p className={styles.sectionSubtitle}>Share your culinary creations and get feedback from others</p>
                    <Link to='/signup'><button className={styles.button}>Sign Up</button></Link>
                </div>
            </section>

            <footer className={styles.footer}>
                <div className={styles.footerBottom}>
                    <div className={styles.footerLinks}>
                        <p className={styles.footerText}>© 2024 Recipe star. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Public;