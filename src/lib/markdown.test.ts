import { describe, it, expect } from "vitest";
import { parseContentItems } from "./markdown";

// HTML as remark + rehype-slug renders "## activity-x\n\n### Heading\n\nBody"
const html = [
  '<h2 id="activity-research-seminars">activity-research-seminars</h2>',
  '<h3 id="research-seminars">Research Seminars</h3>',
  "<p>Regular seminars.</p>",
  '<h2 id="activity-guest-speakers">activity-guest-speakers</h2>',
  '<h3 id="guest-speakers">Guest Speakers</h3>',
  "<p>Distinguished <em>scholars</em>.</p>",
  '<h2 id="other">other</h2>',
  "<p>Not an item.</p>",
].join("\n");

describe("parseContentItems", () => {
  it("uses the h3 under each prefixed h2 as heading and its text as content", () => {
    expect(parseContentItems(html, "activity-")).toEqual([
      {
        id: "activity-research-seminars",
        heading: "Research Seminars",
        content: "Regular seminars.",
      },
      {
        id: "activity-guest-speakers",
        heading: "Guest Speakers",
        content: "Distinguished scholars.",
      },
    ]);
  });

  it("falls back to the h2 text when there is no h3", () => {
    const flat = '<h2 id="item-a">Item A</h2>\n<p>Body A</p>';
    expect(parseContentItems(flat, "item-")).toEqual([
      { id: "item-a", heading: "Item A", content: "Body A" },
    ]);
  });

  it("decodes HTML entities in headings and content", () => {
    const amp =
      '<h2 id="item-a">item-a</h2>\n<h3 id="a">Workshops &#x26; Training</h3>\n<p>Q&#x26;A &amp; more</p>';
    expect(parseContentItems(amp, "item-")).toEqual([
      { id: "item-a", heading: "Workshops & Training", content: "Q&A & more" },
    ]);
  });
});
