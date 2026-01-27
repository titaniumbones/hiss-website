import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils";
import { H1, H2, Paragraph } from "./Typography";

describe("Typography Components", () => {
  describe("H1", () => {
    it("renders children correctly", () => {
      render(<H1>Test Heading</H1>);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Test Heading"
      );
    });

    it("applies custom className", () => {
      render(<H1 className="custom-class">Heading</H1>);
      expect(screen.getByRole("heading", { level: 1 })).toHaveClass(
        "custom-class"
      );
    });
  });

  describe("H2", () => {
    it("renders children correctly", () => {
      render(<H2>Section Heading</H2>);
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
        "Section Heading"
      );
    });
  });

  describe("Paragraph", () => {
    it("renders children correctly", () => {
      render(<Paragraph>Test paragraph content</Paragraph>);
      expect(screen.getByText("Test paragraph content")).toBeInTheDocument();
    });

    it("applies lead class when lead prop is true", () => {
      render(<Paragraph lead>Lead paragraph</Paragraph>);
      const paragraph = screen.getByText("Lead paragraph");
      expect(paragraph).toHaveClass("text-lead");
    });

    it("does not apply lead class by default", () => {
      render(<Paragraph>Normal paragraph</Paragraph>);
      const paragraph = screen.getByText("Normal paragraph");
      expect(paragraph).not.toHaveClass("text-lead");
    });
  });
});
