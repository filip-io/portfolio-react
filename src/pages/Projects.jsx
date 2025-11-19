    import { useState } from 'react'
    import projectsData from '../assets/projects.json'
    import umbracoLogo from '../assets/umbraco.webp'
    import productSyncLogo from '../assets/productsync.png'
    import reliableReservationsLogo from '../assets/apisystem_logo.jpg'
    import fantasyChassLogo from '../assets/fantasychass.jpg'
    import portfolioReact from '../assets/fnlogobig.jpg'
    import audialAtlasLogo from '../assets/audial_atlas_logo.jpg'
    import apiLogo from '../assets/api.jpg'
    import bankLogo from '../assets/bank.jfif'
    import siemensLogo from '../assets/siemens.jpg'
    import gitHubLogo from '../assets/git.jpg'
    import Modal from '../components/ProjectModal'
    import ScrollToTopButton from '../components/ScrollToTopButton';

    const imageMap = {
        umbracoLogo,
        productSyncLogo,
        reliableReservationsLogo,
        fantasyChassLogo,
        portfolioReact,
        audialAtlasLogo,
        apiLogo,
        bankLogo,
        siemensLogo,
        gitHubLogo
    };

    export default function Projects() {
        const [loading, setLoading] = useState(false);
        const [repositories, setRepositories] = useState([]);
        const [errorMessage, setErrorMessage] = useState('');
        const [openModal, setOpenModal] = useState(null);

        const fetchRepositories = async () => {
            setLoading(true);

            setTimeout(async () => {
                try {
                    const response = await fetch('https://api.github.com/users/filip-io/repos');
                    if (!response.ok) {
                        throw new Error('Failed to fetch repositories');
                    }
                    const data = await response.json();
                    setRepositories(data);
                    setErrorMessage('');
                } catch (error) {
                    console.error('Error fetching repositories:', error);
                    setErrorMessage('Failed to load repositories. Please try again later.');
                }
                setLoading(false);
            }, 2000);
        };

        const excludedRepoNames = ['filip-io.github.io', 'Reliable-Reservations', 'FantasyChas-Backend', 'AudialAtlasService', 'Mini_project-API', 'BankNyBank', 'Portfolio-react', 'git-test', 'git'];
        const filteredRepositories = repositories.filter(repo => !excludedRepoNames.includes(repo.name));
        const sortedRepositories = filteredRepositories.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        const openProjectModal = (id) => {
            setOpenModal(id);
        };

        const closeProjectModal = () => {
            setOpenModal(null);
        };

        const renderProjectImage = (imgSrc) => {
            return imageMap[imgSrc] ? <img src={imageMap[imgSrc]} alt={`${imgSrc} logo`} /> : null;
        };

        return (
            <main>
                <header>
                    <div className="projects-title">
                        <h2 className="section-title">Projects</h2>
                    </div>
                </header>
                <article className="projects-container">
                    {projectsData.Projects.slice().reverse().map((proj, index) => (
                        <div className={`project-container-${index % 2 === 0 ? 'left' : 'right'}`} key={proj.id}>
                            <div className="projects-img-wrapper">
                                {renderProjectImage(proj.imgSrc)}
                            </div>
                            <div className="project-description">
                                <h2>{proj.title}</h2>
                                <p>{proj.description}</p>
                                <button className="btn" onClick={() => openProjectModal(proj.id)}>More info</button>
                                <Modal
                                    isOpen={openModal === proj.id}
                                    onClose={closeProjectModal}
                                    title={proj["modal-title"]}
                                    content={proj["modal-description"]}
                                    url={proj.url}
                                    urlText={proj.urlText}
                                    componentUrl={proj.componentUrl}
                                />
                            </div>
                        </div>
                    ))}
                </article>
                <article className="projects-container">
                    {!loading && repositories.length === 0 && !errorMessage && (
                        <button className="btn" onClick={fetchRepositories}>Load GitHub Repositories</button>
                    )}
                    {loading && <div className="spinner"></div>}
                    {errorMessage && <p>{errorMessage}</p>}
                </article>
                <article className="projects-container">
                    {sortedRepositories.map((repo, index) => (
                        <div className={`project-container-${index % 2 === 0 ? 'left' : 'right'}`} key={repo.id}>
                            <div className="projects-img-wrapper">
                                <img src={gitHubLogo} alt="GitHub logo" />
                            </div>
                            <div className="project-description">
                                <h2>{repo.name}</h2>
                                <p>{repo.description}</p>
                                <a className="btn" href={repo.html_url} target="_blank" rel="noopener noreferrer">View on GitHub</a>
                            </div>
                        </div>
                    ))}
                    <ScrollToTopButton className="btn" />
                </article>
            </main>
        );
    }