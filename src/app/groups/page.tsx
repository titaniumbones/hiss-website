import { H1, H2, Paragraph } from "@/components/Typography";
import {
  getPageContent,
  extractSection,
  parseContentItems,
} from "@/lib/markdown";
import "../../styles/pages/_groups.scss";

interface GroupsMetadata {
  title: string;
  description: string;
  pageTitle: string;
  headerSubtitle: string;
  introHeading: string;
  groupsHeading: string;
  joinHeading: string;
}

export async function generateMetadata() {
  const content = await getPageContent("groups");
  return {
    title: content?.metadata.title || "Working Groups - HISS Hub",
    description:
      content?.metadata.description ||
      "Cross-departmental working groups at the HISS Hub",
  };
}

export default async function GroupsPage() {
  const content = await getPageContent("groups");

  if (!content) {
    return (
      <div className="groups-page">
        <p>Content not available</p>
      </div>
    );
  }

  const metadata = content.metadata as unknown as GroupsMetadata;
  const groups = parseContentItems(content.htmlContent, "group-");

  return (
    <div className="groups-page">
      <section className="groups-page__header">
        <div className="groups-page__container">
          <H1>{metadata.pageTitle}</H1>
          <Paragraph lead>{metadata.headerSubtitle}</Paragraph>
        </div>
      </section>

      <section className="groups-page__content">
        <div className="groups-page__container">
          <div className="groups-page__intro">
            <H2>{metadata.introHeading}</H2>
            <div
              dangerouslySetInnerHTML={{
                __html: extractSection(content.htmlContent, "intro"),
              }}
            />
          </div>

          <div className="groups-page__groups">
            <H2>{metadata.groupsHeading}</H2>
            <div className="groups-page__grid">
              {groups.map((group) => (
                <div key={group.id} className="groups-page__group">
                  <h3>{group.heading}</h3>
                  <Paragraph>{group.content}</Paragraph>
                </div>
              ))}
            </div>
          </div>

          <div className="groups-page__join">
            <H2>{metadata.joinHeading}</H2>
            <div
              dangerouslySetInnerHTML={{
                __html: extractSection(content.htmlContent, "join"),
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
