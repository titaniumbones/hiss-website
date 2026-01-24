import { H1, H2, Paragraph, Blockquote } from "@/components/Typography";
import { FOUNDING_DEPARTMENTS } from "@/lib/constants";
import "../../styles/pages/_about.scss";

export const metadata = {
  title: "About - HISS Hub",
  description:
    "Learn about the Humanities and Interpretive Social Sciences Research Hub at UTSC",
};

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-page__header">
        <div className="about-page__container">
          <H1>About HISS Hub</H1>
          <Paragraph lead>
            Building bridges across disciplines to advance humanities and social
            sciences research at UTSC.
          </Paragraph>
        </div>
      </section>

      <section className="about-page__content">
        <div className="about-page__container">
          <div className="about-page__mission">
            <H2>Our Mission</H2>
            <Paragraph>
              The Humanities and Interpretive Social Sciences Research Hub
              (HISS) fosters cross-disciplinary community and collaborative
              research among faculty at the University of Toronto Scarborough.
              We bring together scholars from diverse fields to explore complex
              questions about human experience, culture, and society.
            </Paragraph>
            <Paragraph>
              Through innovative research, interdisciplinary dialogue, and
              community building, we advance understanding of the humanities and
              social sciences while addressing contemporary challenges facing
              our world.
            </Paragraph>
          </div>

          <div className="about-page__vision">
            <Blockquote>
              We envision a vibrant intellectual community where scholars from
              diverse disciplines collaborate to generate new knowledge,
              challenge conventional thinking, and contribute to positive social
              change.
            </Blockquote>
          </div>

          <div className="about-page__founding">
            <H2>Founding Departments</H2>
            <Paragraph>
              HISS was established through the collaboration of six departments
              at UTSC, each bringing unique perspectives and methodologies to
              our interdisciplinary community:
            </Paragraph>
            <div className="about-page__departments-list">
              {FOUNDING_DEPARTMENTS.map((dept) => (
                <div key={dept.name} className="about-page__department">
                  <h3>
                    <a
                      href={dept.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {dept.name}
                    </a>
                  </h3>
                </div>
              ))}
            </div>
          </div>

          <div className="about-page__activities">
            <H2>Our Activities</H2>
            <div className="about-page__activities-grid">
              <div className="about-page__activity">
                <h3>Research Seminars</h3>
                <Paragraph>
                  Regular seminars featuring faculty research across humanities
                  and social sciences disciplines.
                </Paragraph>
              </div>
              <div className="about-page__activity">
                <h3>Workshops & Training</h3>
                <Paragraph>
                  Skill-building workshops on research methods, grant writing,
                  and collaborative practices.
                </Paragraph>
              </div>
              <div className="about-page__activity">
                <h3>Collaborative Projects</h3>
                <Paragraph>
                  Support for interdisciplinary research initiatives and funding
                  applications.
                </Paragraph>
              </div>
              <div className="about-page__activity">
                <h3>Guest Speakers</h3>
                <Paragraph>
                  Distinguished scholars sharing cutting-edge research and
                  perspectives.
                </Paragraph>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
