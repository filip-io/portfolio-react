import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import MagicWordModal from '../components/MagicWordModal';
import filipPic from '../assets/filip.jpg';

export const HomePage = () => {
  const [typedCharacters, setTypedCharacters] = useState('');
  const magicKeyword = 'neo';
  const [showModal, setShowModal] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState('');

  useEffect(() => {
    const handleMagicWord = (event) => {
      setTypedCharacters((prevTypedCharacters) => prevTypedCharacters + event.key.toLowerCase());
    };

    const checkMagicWord = () => {
      if (typedCharacters.toLowerCase() === magicKeyword) {
        setShowModal(true);
        setTypedCharacters('');
      } else if (!magicKeyword.startsWith(typedCharacters)) {
        setTypedCharacters('');
      }
    };

    document.addEventListener('keydown', handleMagicWord);

    checkMagicWord();

    return () => {
      document.removeEventListener('keydown', handleMagicWord);
    };
  }, [typedCharacters]);

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleBackground = () => {
    setBackgroundColor((prevColor) => (prevColor === '' ? 'black' : ''));
  };

  return (
    <main className="home-main-container" style={{ backgroundColor }}>
      <div className="home-main-title-container">
        <div className="home-main-container-left-box">
          <h1>Hi, I'm Filip Nilsson</h1>
          <h2>Full-stack .NET Developer</h2>
        </div>
        <div className="home-main-container-right-box">
          <img src={filipPic} alt="Picture of Filip" id="filip" className="filip-home-pic" onClick={toggleBackground} />
        </div>
      </div>

      {/* <article className="home-intro-container">
        <h3>Check out the new version of my portfolio <a href="https://filip-io.github.io/" target="_blank" rel="noopener noreferrer">here</a></h3>
      </article> */}

      <article className="home-intro-container">
        {/* <div>
          <h3>A Few Tidbits About Me:</h3>
        </div> */}
        <div className="home-intro-box">
          <div className="h4-container">
            <div>
              <a href="/Filip_Nilsson_CV.pdf" download="Filip_Nilsson_CV.pdf">
                <i className="fa-solid fa-file-lines fa-2xl"></i>
                <h4>CV</h4>
              </a>
            </div>
            <div>
              <NavLink to="/projects">
                <i className="fa-solid fa-code fa-2xl"></i>
                <h4>Projects</h4>
              </NavLink>
            </div>
            <div>
              <NavLink to="/experience">
                <i className="fa-sharp fa-solid fa-music fa-2xl"></i>
                <h4>Experiences</h4>
              </NavLink>
            </div>
          </div>
        </div>
      </article>
      <MagicWordModal isOpen={showModal} onClose={closeModal} />
    </main>
  );
};