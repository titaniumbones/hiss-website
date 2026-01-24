import { H1, H2, Paragraph } from "@/components/Typography";
import { FOUNDING_DEPARTMENTS, SITE_NAME } from "@/lib/constants";
import {
  getPageContent,
  extractSection,
  extractSectionText,
  parseContentItems,
} from "@/lib/markdown";
import "../styles/pages/_home.scss";

export default async function Home() {
  const content = await getPageContent("home");

  if (!content) {
    return (
      <div className="home">
        <p>Content not available</p>
      </div>
    );
  }

  const missionItems = parseContentItems(content.htmlContent, "mission-");

  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__hero-content">
          <H1 className="home__title">
            Humanities & Interpretive Social Sciences Hub
          </H1>
          <Paragraph className="home__subtitle" lead>
            {content.metadata.heroSubtitle as string}
          </Paragraph>
        </div>
      </section>

      <section className="home__intro">
        <div className="home__container">
          <H2>Welcome to {SITE_NAME}</H2>
          <div
            dangerouslySetInnerHTML={{
              __html: extractSection(content.htmlContent, "intro"),
            }}
          />
        </div>
      </section>

      <section className="home__departments">
        <div className="home__container">
          <H2>Founding Departments</H2>
          <Paragraph>
            {extractSectionText(content.htmlContent, "departments-intro")}
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
            {missionItems.map((item) => (
              <div key={item.id} className="home__mission-item">
                <h3>{item.heading}</h3>
                <Paragraph>{item.content}</Paragraph>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home__cta">
        <div className="home__container">
          <H2>Get Involved</H2>
          <Paragraph lead>
            {extractSectionText(content.htmlContent, "cta-intro")}
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

export async function generateMetadata() {
  const content = await getPageContent("home");
  return {
    title: content?.metadata.title || "HISS Hub",
    description: content?.metadata.description || "",
  };
}
