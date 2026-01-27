import { H1, H2, Paragraph } from "@/components/Typography";
import { getDepartments, getSiteName } from "@/lib/content";
import {
  getPageContent,
  extractSection,
  extractSectionText,
  parseContentItems,
} from "@/lib/markdown";
import "../styles/pages/_home.scss";

// Define the expected frontmatter structure
interface HomeMetadata {
  title: string;
  description: string;
  heroTitle: string;
  heroSubtitle: string;
  welcomeHeading: string;
  departmentsHeading: string;
  missionHeading: string;
  ctaHeading: string;
  buttons: {
    viewEvents: { label: string; href: string };
    learnMore: { label: string; href: string };
  };
}

export default async function Home() {
  const content = await getPageContent("home");
  const departments = getDepartments();
  const siteName = getSiteName();

  if (!content) {
    return (
      <div className="home">
        <p>Content not available</p>
      </div>
    );
  }

  const metadata = content.metadata as unknown as HomeMetadata;
  const missionItems = parseContentItems(content.htmlContent, "mission-");

  return (
    <div className="home">
      <section className="home__hero">
        <div className="home__hero-content">
          <H1 className="home__title">{metadata.heroTitle}</H1>
          <Paragraph className="home__subtitle" lead>
            {metadata.heroSubtitle}
          </Paragraph>
        </div>
      </section>

      <section className="home__intro">
        <div className="home__container">
          <H2>{metadata.welcomeHeading || `Welcome to ${siteName}`}</H2>
          <div
            dangerouslySetInnerHTML={{
              __html: extractSection(content.htmlContent, "intro"),
            }}
          />
        </div>
      </section>

      <section className="home__departments">
        <div className="home__container">
          <H2>{metadata.departmentsHeading}</H2>
          <Paragraph>
            {extractSectionText(content.htmlContent, "departments-intro")}
          </Paragraph>
          <div className="home__departments-grid">
            {departments.map((dept) => (
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
          <H2>{metadata.missionHeading}</H2>
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
          <H2>{metadata.ctaHeading}</H2>
          <Paragraph lead>
            {extractSectionText(content.htmlContent, "cta-intro")}
          </Paragraph>
          <div className="home__cta-buttons">
            <a
              href={metadata.buttons.viewEvents.href}
              className="button button--primary"
            >
              {metadata.buttons.viewEvents.label}
            </a>
            <a
              href={metadata.buttons.learnMore.href}
              className="button button--secondary"
            >
              {metadata.buttons.learnMore.label}
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
