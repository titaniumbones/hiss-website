import { H1, H2, Paragraph } from "@/components/Typography";
import { getDepartments } from "@/lib/content";
import {
  getPageContent,
  extractSection,
  extractSectionText,
  parseContentItems,
} from "@/lib/markdown";
import "../../styles/pages/_about.scss";

// Define the expected frontmatter structure
interface AboutMetadata {
  title: string;
  description: string;
  pageTitle: string;
  headerSubtitle: string;
  missionHeading: string;
  departmentsHeading: string;
  activitiesHeading: string;
}

export async function generateMetadata() {
  const content = await getPageContent("about");
  return {
    title: content?.metadata.title || "About - HISS Hub",
    description:
      content?.metadata.description ||
      "Learn about the Humanities and Interpretive Social Sciences Research Hub at UTSC",
  };
}

export default async function AboutPage() {
  const content = await getPageContent("about");
  const departments = getDepartments();

  if (!content) {
    return (
      <div className="about-page">
        <p>Content not available</p>
      </div>
    );
  }

  const metadata = content.metadata as unknown as AboutMetadata;
  const activityItems = parseContentItems(content.htmlContent, "activity-");

  return (
    <div className="about-page">
      <section className="about-page__header">
        <div className="about-page__container">
          <H1>{metadata.pageTitle}</H1>
          <Paragraph lead>{metadata.headerSubtitle}</Paragraph>
        </div>
      </section>

      <section className="about-page__content">
        <div className="about-page__container">
          <div className="about-page__mission">
            <H2>{metadata.missionHeading}</H2>
            <div
              dangerouslySetInnerHTML={{
                __html: extractSection(content.htmlContent, "mission"),
              }}
            />
          </div>

          <div className="about-page__vision">
            <div
              dangerouslySetInnerHTML={{
                __html: extractSection(content.htmlContent, "vision"),
              }}
            />
          </div>

          <div className="about-page__founding">
            <H2>{metadata.departmentsHeading}</H2>
            <Paragraph>
              {extractSectionText(content.htmlContent, "founding-intro")}
            </Paragraph>
            <div className="about-page__departments-list">
              {departments.map((dept) => (
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
            <H2>{metadata.activitiesHeading}</H2>
            <div className="about-page__activities-grid">
              {activityItems.map((item) => (
                <div key={item.id} className="about-page__activity">
                  <h3>{item.heading}</h3>
                  <Paragraph>{item.content}</Paragraph>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
