import React, { useEffect, useRef } from 'react';


// Composant principal du portfolio
const App = () => {
  // Références pour les sections pour les animations au scroll
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    // Navigation fluide
    const links = document.querySelectorAll('nav a');
    links.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });

    // Nettoyage
    return () => {
      observer.disconnect();
      links.forEach((link) => link.removeEventListener('click', () => {}));
    };
  }, []);

  return (
    <>
      <style>{`
        /* Reset & Polices */
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

        :root {
          /* Palette */
          --deep-purple: #391B49;
          --purple: #795690;
          --light-purple: #9670C7;
          --lavender: #C29CE5;
          --pink-purple: #CE9BCE;
          --white: #FFFFFF;
          --light-gray: #F5F5F5;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }

        body {
          background-color: var(--light-gray);
          color: var(--deep-purple);
          line-height: 1.6;
        }

        /* Navigation */
        header {
          background-color: var(--deep-purple);
          position: fixed;
          width: 100%;
          z-index: 1000;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        nav ul {
          display: flex;
          justify-content: center;
          list-style: none;
          padding: 1rem;
        }

        nav li {
          margin: 0 1.5rem;
        }

        nav a {
          color: var(--white);
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s;
          padding: 0.5rem 0;
          position: relative;
        }

        nav a:hover {
          color: var(--lavender);
        }

        nav a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background-color: var(--lavender);
          transition: width 0.3s;
        }

        nav a:hover::after {
          width: 100%;
        }

        #language-switcher {
          background: var(--purple);
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          cursor: pointer;
          transition: background 0.3s;
          font-family: 'Poppins', sans-serif;
        }

        #language-switcher:hover {
          background: var(--light-purple);
        }

        /* Hero Section */
        .hero {
          background: linear-gradient(135deg, var(--deep-purple), var(--purple));
          color: var(--white);
          text-align: center;
          padding: 180px 20px 100px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .hero h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          animation: fadeIn 1s ease-out;
        }

        .hero h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          color: var(--lavender);
          animation: fadeIn 1.2s ease-out;
        }

        .hero p {
          font-size: 1.2rem;
          max-width: 600px;
          margin-bottom: 2rem;
          animation: fadeIn 1.4s ease-out;
        }

        .cta-button {
          background: var(--pink-purple);
          color: var(--deep-purple);
          padding: 0.8rem 2rem;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 600;
          transition: transform 0.3s, background 0.3s;
          animation: fadeIn 1.6s ease-out;
        }

        .cta-button:hover {
          background: var(--lavender);
          transform: translateY(-3px);
        }

        /* Projets */
        #projects {
          padding: 5rem 2rem;
          background: var(--white);
        }

        #projects h3 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .project-card {
          background: var(--light-gray);
          border-radius: 10px;
          padding: 2rem;
          transition: transform 0.3s, box-shadow 0.3s;
          text-align: center;
        }

        .project-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 20px rgba(57, 27, 73, 0.1);
        }

        .project-card h4 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--deep-purple);
        }

        .project-card p {
          margin-bottom: 1rem;
          color: var(--purple);
        }

        .demo-link {
          color: var(--purple);
          text-decoration: none;
          font-weight: 600;
        }

        .demo-link:hover {
          color: var(--lavender);
        }

        .video-demo {
          width: 100%;
          height: 200px;
          border-radius: 5px;
          margin-top: 1rem;
        }

        .github-link {
          display: inline-block;
          margin-top: 1rem;
          background: var(--purple);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          text-decoration: none;
          transition: background 0.3s;
        }

        .github-link:hover {
          background: var(--light-purple);
        }

        /* À Propos */
        #about {
          padding: 5rem 2rem;
          background: var(--light-gray);
          text-align: center;
        }

        #about h3 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }

        .bio {
          max-width: 800px;
          margin: 0 auto;
          font-size: 1.1rem;
        }

        .timeline {
          margin-top: 3rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .timeline-item {
          background: var(--white);
          padding: 1rem;
          border-radius: 5px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }

        /* Contact (Vitrine : juste email) */
        #contact {
          background: var(--deep-purple);
          color: var(--white);
          padding: 5rem 2rem;
          text-align: center;
        }

        #contact h3 {
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }

        .contact-info {
          font-size: 1.2rem;
        }

        .contact-link {
          color: var(--lavender);
          text-decoration: none;
          font-weight: 600;
        }

        .contact-link:hover {
          color: var(--pink-purple);
        }

        /* Animations */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        section {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s, transform 0.6s;
        }

        section.visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero h1 { font-size: 2.5rem; }
          .hero h2 { font-size: 1.5rem; }
          nav ul { flex-wrap: wrap; justify-content: center; }
          nav li { margin: 0.5rem; }
        }
      `}</style>

      {/* Header avec navigation multilingue */}
      <header>
        <nav>
          <ul>
            <li><a href="#home">Accueil</a></li>
            <li><a href="#projects">Projets</a></li>
            <li><a href="#about">À Propos</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><button id="language-switcher">FR/EN</button></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section (Animée) */}
      <section id="home" className="hero" ref={(el) => (sectionsRef.current[0] = el)}>
        <h1>Nesrine Riahi</h1>
        <h2>Développeur Fullstack</h2>
        <p>Je transforme des idées en solutions digitales performantes.</p>
        <a href="#projects" className="cta-button">Voir mes projets →</a>
      </section>

      {/* Projets (Grid Interactive) avec deux démos vidéos */}
      <section id="projects" ref={(el) => (sectionsRef.current[1] = el)}>
        <h3>Mes Projets</h3>
        <div className="project-grid">
         
         {/* Projet 2 : CampusConnect avec vidéo démo locale */}
<div className="project-card">
  <h4>CampusConnect</h4>
  <p>Plateforme étudiante (Fullstack).</p>
  {/* Vidéo locale : Place ton fichier dans public/videos/ */}
<video
  className="video-demo"
  controls
  preload="metadata"
  playsInline
  style={{ maxWidth: '100%', height: 'auto' }}
>
  <source 
    src={`${process.env.PUBLIC_URL}/videos/demonstration-video-pfa.mp4`} 
    type="video/mp4" 
  />
  Votre navigateur ne supporte pas la balise vidéo.
</video>
  <a
    href="https://github.com/Nesrine-RIAHI/Portail-des-tudiants"
    className="github-link"
    target="_blank"
    rel="noopener noreferrer"
  >
    Voir sur GitHub
  </a>
</div>

          {/* Projet 3 : Gardé sans vidéo pour l'instant */}
          <div className="project-card">
            <h4>Gestionnaire de livres</h4>
            <p>Application CRUD</p>
            <a href="https://github.com/Nesrine-RIAHI/-Books-Manager-Application-CRUD-avec-Node.js-SQLite" className="github-link">Voir sur GitHub</a>
          </div>
 {/* Projet 4: Resume Screener */}
<div className="project-card">
  <h4>Resume Screener</h4>
  <p>Projet ML de screening de CV : extraction NLP de compétences et expériences via spaCy/Regex, classification en 43 métiers avec Random Forest sur dataset Kaggle, matching d'emplois par TF-IDF et similarité cosinus, suivi d'un scoring/ranking par régression pour optimiser les recrutements RH.</p>
  {/* Vidéo locale : Place ton fichier dans public/videos/ */}
<video
  className="video-demo"
  controls
  preload="metadata"
  playsInline
  style={{ maxWidth: '100%', height: 'auto' }}
>
  <source 
    src={`${process.env.PUBLIC_URL}/videos/Demonstration Resume Screener.mp4`} 
    type="video/mp4" 
  />
  Votre navigateur ne supporte pas la balise vidéo.
</video>
  <a
    href="https://github.com/Nesrine-RIAHI/Resume-Screener-"
    className="github-link"
    target="_blank"
    rel="noopener noreferrer"
  >
    Voir sur GitHub
  </a>
</div>
        </div>
       
      </section>

      {/* À Propos + Timeline (Exemple basique) */}
      <section id="about" ref={(el) => (sectionsRef.current[2] = el)}>
        <h3>À Propos</h3>
        <div className="bio">
          <p>Passionnée par le développement web, je crée des applications innovantes et user-friendly. Avec une expertise en fullstack, j'aime combiner créativité et code pour des résultats impactants.</p>
        </div>
        <div className="timeline">
          <div className="timeline-item">
            <h4>2023 -2026 étudiante en génie logiciel et systéme d'information à faculté des sciences de Monastir</h4>
            <p>En tant qu'étudiante en Licence de Génie Logiciel et Systèmes d'Information, je me suis immergée dans l'univers du développement fullstack, maîtrisant Java pour des architectures robustes et JavaScript avec Node.js, Express.js et React pour des interfaces dynamiques et réactives. Passionnée par les données, j'explore les bases SQL et NoSQL pour modéliser des écosystèmes informationnels scalables, tout en m'aventurant dans l'intelligence artificielle et le machine learning pour anticiper les innovations de demain. Ce parcours me prépare à transformer des idées en solutions impactantes, alliant code élégant et intelligence augmentée.</p>
          </div>
          
        </div>
        
      </section>

      {/* Contact (Vitrine : sans formulaire, juste infos) */}
      <section id="contact" ref={(el) => (sectionsRef.current[3] = el)}>
        <h3>Contact</h3>
        <div className="contact-info">
          <p>Envie de collaborer ? Écrivez-moi !</p>
          <a href="mailto:nesrine.riahi.2002@gmail.com" className="contact-link">nesrine.riahi.2002@gmail.com</a>
        </div>
      </section>
    </>
  );
};

export default App;
