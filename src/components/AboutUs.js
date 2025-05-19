import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Public.module.css';
import aboutStyles from './About.module.css';
import recipe_star_logo from '../img/recipe_star_logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUtensils, 
  faUsers, 
  faAward, 
  faEnvelope, 
  faMapMarkerAlt, 
  faPhone,
  faHeart,
  faLeaf,
  faBookOpen,
  faLightbulb
} from '@fortawesome/free-solid-svg-icons';
import { 
  faTwitter, 
  faLinkedinIn, 
  faInstagram 
} from '@fortawesome/free-brands-svg-icons';

const AboutUs = () => {
  return (
    <div className={aboutStyles.aboutContainer}>
      <header className={styles.header}>
        <div className={styles.headerContainer}>
          <Link to='/'>
            <div className={styles.logo}>
              <img src={recipe_star_logo} alt="RecipeStar" className={styles.logoImg} />
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

      {/* Hero Section */}
      <section className={aboutStyles.heroSection}>
        <div className={aboutStyles.heroContent}>
          <h1 className={aboutStyles.heroTitle}>Passionate About Food, Dedicated to Your Kitchen</h1>
          <p className={aboutStyles.heroSubtitle}>
            At RecipeStar, we believe that cooking is more than just making meals—it's about creating moments, 
            sharing traditions, and exploring world cultures through the universal language of food.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className={aboutStyles.missionSection}>
        <h2 className={aboutStyles.sectionTitle}>Our Mission</h2>
        
        <div className={aboutStyles.missionGrid}>
          <div className={aboutStyles.missionCard}>
            <div className={aboutStyles.cardContent}>
              <FontAwesomeIcon icon={faUtensils} className={aboutStyles.cardIcon} />
              <h3 className={aboutStyles.cardTitle}>Inspire Home Cooking</h3>
              <p className={aboutStyles.cardText}>
                We aim to inspire confidence in the kitchen by offering reliable, tested recipes that make 
                cooking accessible and enjoyable for everyone, from beginners to seasoned chefs.
              </p>
            </div>
          </div>
          
          <div className={aboutStyles.missionCard}>
            <div className={aboutStyles.cardContent}>
              <FontAwesomeIcon icon={faUsers} className={aboutStyles.cardIcon} />
              <h3 className={aboutStyles.cardTitle}>Build Community</h3>
              <p className={aboutStyles.cardText}>
                Our platform fosters a vibrant community where food enthusiasts can connect, share tips, 
                and celebrate the joy of cooking together through recipes and stories.
              </p>
            </div>
          </div>
          
          <div className={aboutStyles.missionCard}>
            <div className={aboutStyles.cardContent}>
              <FontAwesomeIcon icon={faAward} className={aboutStyles.cardIcon} />
              <h3 className={aboutStyles.cardTitle}>Excellence in Culinary Content</h3>
              <p className={aboutStyles.cardText}>
                We're committed to providing top-quality recipes with clear instructions, beautiful photography, 
                and practical tips that ensure your success in the kitchen every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className={aboutStyles.storySection}>
        <h2 className={aboutStyles.sectionTitle}>Our Story</h2>
        
        <div className={aboutStyles.storyContent}>
          <p>
            RecipeStar began in 2020 as a small passion project by a group of friends who shared a love for cooking 
            and technology. What started as a simple digital recipe box quickly grew into something much bigger as 
            more food enthusiasts discovered our platform and began contributing their favorite recipes.
          </p>
          
          <p>
            The team had a vision: to create a space where culinary traditions could be preserved and shared, where 
            cooking techniques could be learned, and where food could bring people together across distances. We 
            wanted to combine the warmth of traditional family recipes with the convenience and connectivity of 
            modern technology.
          </p>
          
          <p>
            Today, RecipeStar is a thriving community of home cooks, professional chefs, and food enthusiasts from 
            around the world. Our recipe collection has grown to include everything from quick weeknight dinners to 
            elaborate holiday feasts, representing diverse cuisines and dietary preferences.
          </p>
          
          <p>
            As we continue to grow, we remain dedicated to our core values of authenticity, quality, and community. 
            Every recipe shared on our platform represents a story, a tradition, and a moment of joy that we're 
            honored to help preserve and spread.
          </p>
        </div>
      </section>

      {/* Our Team Section */}
      <section className={aboutStyles.teamSection}>
        <h2 className={aboutStyles.sectionTitle}>Meet Our Team</h2>
        
        <div className={aboutStyles.teamGrid}>
          <div className={aboutStyles.teamMember}>
            <img 
              src="https://images.unsplash.com/photo-1607990283143-e81e7a2c9349?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Emily Chen"
              className={aboutStyles.memberImage}
            />
            <div className={aboutStyles.memberInfo}>
              <h3 className={aboutStyles.memberName}>Emily Chen</h3>
              <p className={aboutStyles.memberTitle}>Founder & Head Chef</p>
              <p className={aboutStyles.memberBio}>
                Former restaurant chef with a passion for making gourmet cooking accessible to everyone.
              </p>
              <div className={aboutStyles.memberSocial}>
                <a href="#" className={aboutStyles.socialIcon}><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#" className={aboutStyles.socialIcon}><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="#" className={aboutStyles.socialIcon}><FontAwesomeIcon icon={faLinkedinIn} /></a>
              </div>
            </div>
          </div>
          
          <div className={aboutStyles.teamMember}>
            <img 
              src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Daniel Martinez"
              className={aboutStyles.memberImage}
            />
            <div className={aboutStyles.memberInfo}>
              <h3 className={aboutStyles.memberName}>Daniel Martinez</h3>
              <p className={aboutStyles.memberTitle}>CTO & Recipe Developer</p>
              <p className={aboutStyles.memberBio}>
                Tech enthusiast and home cook who loves combining his passions to create intuitive cooking experiences.
              </p>
              <div className={aboutStyles.memberSocial}>
                <a href="#" className={aboutStyles.socialIcon}><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#" className={aboutStyles.socialIcon}><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="#" className={aboutStyles.socialIcon}><FontAwesomeIcon icon={faLinkedinIn} /></a>
              </div>
            </div>
          </div>
          
          <div className={aboutStyles.teamMember}>
            <img 
              src="https://images.unsplash.com/photo-1521119989659-a83eee488004?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Sara Johnson"
              className={aboutStyles.memberImage}
            />
            <div className={aboutStyles.memberInfo}>
              <h3 className={aboutStyles.memberName}>Sara Johnson</h3>
              <p className={aboutStyles.memberTitle}>Content Director</p>
              <p className={aboutStyles.memberBio}>
                Food writer and photographer who ensures every recipe tells a story through words and images.
              </p>
              <div className={aboutStyles.memberSocial}>
                <a href="#" className={aboutStyles.socialIcon}><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#" className={aboutStyles.socialIcon}><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="#" className={aboutStyles.socialIcon}><FontAwesomeIcon icon={faLinkedinIn} /></a>
              </div>
            </div>
          </div>
          
          <div className={aboutStyles.teamMember}>
            <img 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Michael Williams"
              className={aboutStyles.memberImage}
            />
            <div className={aboutStyles.memberInfo}>
              <h3 className={aboutStyles.memberName}>Michael Williams</h3>
              <p className={aboutStyles.memberTitle}>Community Manager</p>
              <p className={aboutStyles.memberBio}>
                Culinary school graduate who loves bringing people together through shared food experiences.
              </p>
              <div className={aboutStyles.memberSocial}>
                <a href="#" className={aboutStyles.socialIcon}><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#" className={aboutStyles.socialIcon}><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="#" className={aboutStyles.socialIcon}><FontAwesomeIcon icon={faLinkedinIn} /></a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className={aboutStyles.missionSection}>
        <h2 className={aboutStyles.sectionTitle}>Our Values</h2>
        
        <div className={aboutStyles.missionGrid}>
          <div className={aboutStyles.missionCard}>
            <div className={aboutStyles.cardContent}>
              <FontAwesomeIcon icon={faHeart} className={aboutStyles.cardIcon} />
              <h3 className={aboutStyles.cardTitle}>Passion</h3>
              <p className={aboutStyles.cardText}>
                We're driven by our love for food and cooking. This passion inspires us to continually improve 
                and share the joy of culinary creation with our community.
              </p>
            </div>
          </div>
          
          <div className={aboutStyles.missionCard}>
            <div className={aboutStyles.cardContent}>
              <FontAwesomeIcon icon={faLeaf} className={aboutStyles.cardIcon} />
              <h3 className={aboutStyles.cardTitle}>Sustainability</h3>
              <p className={aboutStyles.cardText}>
                We promote cooking practices that are respectful of our planet, including seasonal eating, 
                reducing food waste, and supporting local food producers.
              </p>
            </div>
          </div>
          
          <div className={aboutStyles.missionCard}>
            <div className={aboutStyles.cardContent}>
              <FontAwesomeIcon icon={faBookOpen} className={aboutStyles.cardIcon} />
              <h3 className={aboutStyles.cardTitle}>Inclusivity</h3>
              <p className={aboutStyles.cardText}>
                We celebrate diverse culinary traditions and make sure our platform offers recipes for various 
                dietary needs, skill levels, and cultural backgrounds.
              </p>
            </div>
          </div>
          
          <div className={aboutStyles.missionCard}>
            <div className={aboutStyles.cardContent}>
              <FontAwesomeIcon icon={faLightbulb} className={aboutStyles.cardIcon} />
              <h3 className={aboutStyles.cardTitle}>Innovation</h3>
              <p className={aboutStyles.cardText}>
                We continuously seek new ways to enhance the cooking experience through technology while 
                honoring traditional cooking methods and recipes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={aboutStyles.contactSection}>
        <h2 className={`${aboutStyles.sectionTitle} ${aboutStyles.contactTitle}`}>Get in Touch</h2>
        
        <div className={aboutStyles.contactGrid}>
          <div className={aboutStyles.contactCard}>
            <FontAwesomeIcon icon={faEnvelope} className={aboutStyles.contactIcon} />
            <h3 className={aboutStyles.contactLabel}>Email Us</h3>
            <p className={aboutStyles.contactText}>
              <a href="mailto:hello@recipestar.com" className={aboutStyles.contactLink}>hello@recipestar.com</a>
            </p>
          </div>
          
          <div className={aboutStyles.contactCard}>
            <FontAwesomeIcon icon={faMapMarkerAlt} className={aboutStyles.contactIcon} />
            <h3 className={aboutStyles.contactLabel}>Visit Us</h3>
            <p className={aboutStyles.contactText}>
              123 Culinary Avenue<br />
              San Francisco, CA 94110
            </p>
          </div>
          
          <div className={aboutStyles.contactCard}>
            <FontAwesomeIcon icon={faPhone} className={aboutStyles.contactIcon} />
            <h3 className={aboutStyles.contactLabel}>Call Us</h3>
            <p className={aboutStyles.contactText}>
              <a href="tel:+15551234567" className={aboutStyles.contactLink}>(555) 123-4567</a>
            </p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footerBottom}>
          <div className={styles.footerLinks}>
            <p className={styles.footerText}>© {new Date().getFullYear()} RecipeStar. All rights reserved.</p>
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