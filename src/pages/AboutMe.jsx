import filipAboutPic from '../assets/filip-about.jpg';
import techStack from '../assets/tech.json';
import { NavLink } from 'react-router-dom';

const techs = Object.keys(techStack);

export default function AboutMe() {
    return (
        <main>
            <article className="about-me-container">
                <div className="about-me-container-box">
                    <div className="about-me-container-left-box">
                        <img src={filipAboutPic} alt="Picture of Filip" className="filip-about-pic" />
                    </div>

                    <div className="about-me-container-right-box">
                        <h2>A Glimpse into Myself</h2>
                        <p>Hello there! My name is Filip and I am a full-stack .NET developer, passionate about technology
                            and design. Every day I am eagerly gaining new knowledge and insights
                            in this fast and versatile world of software development.</p>
                        <p>I am advancing from a successful career in Supply Chain Management, most recently at Siemens.</p>
                        <p>Now I am looking forward to channel my creativity through crafting functional, beautiful and high performance
                            software for engaging experiences.</p>
                        <p>When I manage to escape my computer's grasp, I enjoy working out, HIFI, photography, and
                            exploring nature.</p>
                    </div>
                </div>

                <article>
                    <h1 className="tech-intro">Technologies I have worked with</h1>
                    {techs.map(tech => (
                        <div key={tech} className="tech-category-container">
                            <h2>{tech}</h2>
                            <div className="tech-container">
                                {techStack[tech].map((item) => (
                                    <div key={item.id} className="tech-item-container">
                                        <div className="tech-icon-container">
                                            <i className={item.icon} aria-label={item.alt}></i>
                                            <span className="tech-label">{item.label}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </article>
            </article>
            <NavLink to="/projects">
                <button className="btn projects-btn">Check out <br /> my projects</button>
            </NavLink>
        </main>
    );
}