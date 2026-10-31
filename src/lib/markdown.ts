// Markdown utilities for fetching and parsing markdown content

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import gfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import type { MarkdownContent, ContentMetadata, ContentSection } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content", "pages");

/**
 * Fetch and parse markdown content from a file
 * @param slug - Slug of the content file (e.g., "home", "about")
 * @returns Parsed markdown content with metadata and HTML
 */
export async function getPageContent(
  slug: string
): Promise<MarkdownContent | null> {
  try {
    const filePath = path.join(CONTENT_DIR, `${slug}.md`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.warn(`Content file not found: ${filePath}`);
      return null;
    }

    // Read the file
    const fileContents = fs.readFileSync(filePath, "utf8");

    // Parse frontmatter and content
    const { data, content } = matter(fileContents);

    // Convert markdown to HTML with auto-generated heading IDs
    const processedContent = await remark()
      .use(gfm) // GitHub Flavored Markdown
      .use(remarkRehype) // Convert to HTML AST
      .use(rehypeSlug) // Auto-generate heading IDs
      .use(rehypeStringify) // Convert to HTML string
      .process(content);

    const htmlContent = processedContent.toString();

    return {
      slug,
      metadata: data as ContentMetadata,
      rawContent: content,
      htmlContent,
    };
  } catch (error) {
    console.error(`Error fetching page content for "${slug}":`, error);
    return null;
  }
}

/**
 * Extract a specific section from HTML content by its heading ID
 * @param htmlContent - HTML content to search
 * @param sectionId - ID of the section to extract (from ## section-id)
 * @returns HTML content of the section
 */
export function extractSection(htmlContent: string, sectionId: string): string {
  // Match section starting with <h2 id="sectionId">
  // and ending before the next <h2> or end of content
  const sectionRegex = new RegExp(
    `<h2[^>]*id="${sectionId}"[^>]*>.*?(?=<h2|$)`,
    "is"
  );

  const match = htmlContent.match(sectionRegex);
  if (!match) {
    console.warn(`Section "${sectionId}" not found in content`);
    return "";
  }

  // Remove the heading itself, leaving only the content
  let section = match[0];
  section = section.replace(/<h2[^>]*>.*?<\/h2>/i, "");

  return section.trim();
}

/**
 * Extract section text without HTML tags
 * @param htmlContent - HTML content to search
 * @param sectionId - ID of the section to extract
 * @returns Plain text content of the section
 */
export function extractSectionText(
  htmlContent: string,
  sectionId: string
): string {
  const sectionHtml = extractSection(htmlContent, sectionId);
  // Remove HTML tags
  return sectionHtml.replace(/<[^>]*>/g, "").trim();
}

/**
 * Parse content items from markdown with a specific prefix
 * Useful for extracting lists of items like mission statements
 * @param htmlContent - HTML content to parse
 * @param prefix - Prefix to match (e.g., "mission-")
 * @returns Array of content sections with id, heading, and content
 */
export function parseContentItems(
  htmlContent: string,
  prefix: string
): ContentSection[] {
  const items: ContentSection[] = [];

  // Match all h2/h3 headings with IDs that start with the prefix
  const headingRegex = new RegExp(
    `<h[23][^>]*id="${prefix}([^"]+)"[^>]*>(.*?)<\/h[23]>`,
    "gi"
  );

  let match;
  while ((match = headingRegex.exec(htmlContent)) !== null) {
    const id = `${prefix}${match[1]}`;
    const heading = stripHtml(match[2]);

    // Extract content after this heading until the next heading of the same
    // or higher level (an h2 item owns the h3 beneath it), or the end
    const contentStart = match.index + match[0].length;
    const nextHeadingRegex = match[0].startsWith("<h2")
      ? /<h[12][^>]*>/i
      : /<h[123][^>]*>/i;
    const remainingContent = htmlContent.slice(contentStart);
    const nextHeadingMatch = nextHeadingRegex.exec(remainingContent);

    let content: string;
    if (nextHeadingMatch) {
      content = remainingContent.slice(0, nextHeadingMatch.index).trim();
    } else {
      content = remainingContent.trim();
    }

    // Look for the next h3 under the same section
    const h3Regex = /<h3[^>]*>(.*?)<\/h3>/i;
    const h3Match = content.match(h3Regex);

    if (h3Match) {
      // If there's an h3, use that as the heading
      const h3Heading = stripHtml(h3Match[1]);
      // Remove the h3 from content
      const h3Content = content.replace(h3Regex, "").trim();

      items.push({
        id,
        heading: h3Heading,
        content: stripHtml(h3Content),
      });
    } else {
      // Use the h2 heading
      items.push({
        id,
        heading,
        content: stripHtml(content),
      });
    }
  }

  return items;
}

/**
 * Strip HTML tags from content, leaving only text
 * @param html - HTML content
 * @returns Plain text
 */
function stripHtml(html: string): string {
  return decodeEntities(html.replace(/<[^>]*>/g, "")).trim();
}

/**
 * Decode the HTML entities rehype emits, so plain-text fields rendered by
 * React show "&" rather than "&#x26;"
 * @param text - Text containing HTML entities
 * @returns Decoded text
 */
function decodeEntities(text: string): string {
  const named: Record<string, string> = {
    amp: "&",
    lt: "<",
    gt: ">",
    quot: '"',
    apos: "'",
    nbsp: "\u00a0",
  };
  return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (entity, code) => {
    if (code[0] === "#") {
      const n =
        code[1] === "x" || code[1] === "X"
          ? parseInt(code.slice(2), 16)
          : parseInt(code.slice(1), 10);
      return String.fromCodePoint(n);
    }
    return named[code.toLowerCase()] ?? entity;
  });
}

/**
 * Get all available content slugs
 * @returns Array of available content slugs
 */
export function getAllContentSlugs(): string[] {
  try {
    const files = fs.readdirSync(CONTENT_DIR);
    return files
      .filter((file) => file.endsWith(".md"))
      .map((file) => file.replace(/\.md$/, ""));
  } catch (error) {
    console.error("Error reading content directory:", error);
    return [];
  }
}
