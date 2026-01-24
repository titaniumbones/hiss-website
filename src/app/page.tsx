import { H1, H2, Paragraph } from "@/components/Typography";
import { FOUNDING_DEPARTMENTS, SITE_NAME } from "@/lib/constants";
import "../styles/pages/_home.scss";

export default function Home() {
  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__hero-content">
          <H1 className="home__title">
            Humanities & Interpretive Social Sciences Hub
          </H1>
          <Paragraph className="home__subtitle" lead>
            Fostering cross-disciplinary community and collaborative research at
            the University of Toronto Scarborough.
          </Paragraph>
        </div>
      </section>

      <section className="home__intro">
        <div className="home__container">
          <H2>Welcome to {SITE_NAME}</H2>
          <Paragraph lead>
            The Humanities and Interpretive Social Sciences Research Hub (HISS)
            is a vibrant intellectual community bringing together faculty from
            diverse disciplines to explore complex questions about human
            experience, culture, and society.
          </Paragraph>
          <Paragraph>
            Through collaborative research, interdisciplinary dialogue, and
            innovative scholarship, we advance understanding of the humanities
            and social sciences while addressing contemporary challenges facing
            our world.
          </Paragraph>
        </div>
      </section>

      <section className="home__departments">
        <div className="home__container">
          <H2>Founding Departments</H2>
          <Paragraph>
            HISS unites faculty from six departments at UTSC, creating a rich
            environment for cross-disciplinary exchange:
          </Paragraph>
          <div className="home__departments-grid">
            {FOUNDING_DEPARTMENTS.map((dept) => (
              <div key={dept.name} className="home__department-card">
                <h3 className="home__department-name">
                  <a href={dept.url} target="_blank" rel="noopener noreferrer">
                    {dept.name}
                  </a>
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home__mission">
        <div className="home__container">
          <H2>Our Mission</H2>
          <div className="home__mission-grid">
            <div className="home__mission-item">
              <h3>Collaborative Research</h3>
              <Paragraph>
                We facilitate interdisciplinary research projects that draw on
                diverse methodologies and theoretical frameworks.
              </Paragraph>
            </div>
            <div className="home__mission-item">
              <h3>Community Building</h3>
              <Paragraph>
                We create spaces for faculty to connect, share ideas, and
                develop new collaborations across departmental boundaries.
              </Paragraph>
            </div>
            <div className="home__mission-item">
              <h3>Intellectual Exchange</h3>
              <Paragraph>
                We host events, workshops, and seminars that bring together
                scholars to explore pressing questions in the humanities and
                social sciences.
              </Paragraph>
            </div>
            <div className="home__mission-item">
              <h3>Innovative Scholarship</h3>
              <Paragraph>
                We support cutting-edge research that pushes the boundaries of
                traditional disciplines and methods.
              </Paragraph>
            </div>
          </div>
        </div>
      </section>

      <section className="home__cta">
        <div className="home__container">
          <H2>Get Involved</H2>
          <Paragraph lead>
            Join our community of scholars exploring the humanities and
            interpretive social sciences.
          </Paragraph>
          <div className="home__cta-buttons">
            <a href="/calendar" className="button button--primary">
              View Events
            </a>
            <a href="/about" className="button button--secondary">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
