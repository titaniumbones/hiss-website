import React from "react";

// Heading Components
interface HeadingProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function H1({ children, className = "", id }: HeadingProps) {
  return (
    <h1 className={className} id={id}>
      {children}
    </h1>
  );
}

export function H2({ children, className = "", id }: HeadingProps) {
  return (
    <h2 className={className} id={id}>
      {children}
    </h2>
  );
}

export function H3({ children, className = "", id }: HeadingProps) {
  return (
    <h3 className={className} id={id}>
      {children}
    </h3>
  );
}

export function H4({ children, className = "", id }: HeadingProps) {
  return (
    <h4 className={className} id={id}>
      {children}
    </h4>
  );
}

// Paragraph Component
interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
  lead?: boolean;
}

export function Paragraph({
  children,
  className = "",
  lead = false,
}: ParagraphProps) {
  const classes = `${lead ? "text-lead" : ""} ${className}`.trim();
  return <p className={classes}>{children}</p>;
}

// Blockquote Component
interface BlockquoteProps {
  children: React.ReactNode;
  cite?: string;
  author?: string;
  className?: string;
}

export function Blockquote({
  children,
  cite,
  author,
  className = "",
}: BlockquoteProps) {
  return (
    <blockquote className={className} cite={cite}>
      {children}
      {author && (
        <footer>
          <cite>{author}</cite>
        </footer>
      )}
    </blockquote>
  );
}

// Link Component (styled according to UofT guidelines)
interface LinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

export function TextLink({
  href,
  children,
  external = false,
  className = "",
}: LinkProps) {
  const externalProps = external
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <a href={href} className={className} {...externalProps}>
      {children}
      {external && (
        <span className="visually-hidden"> (opens in new window)</span>
      )}
    </a>
  );
}

// List Components
interface ListProps {
  children: React.ReactNode;
  className?: string;
}

export function UnorderedList({ children, className = "" }: ListProps) {
  return <ul className={className}>{children}</ul>;
}

export function OrderedList({ children, className = "" }: ListProps) {
  return <ol className={className}>{children}</ol>;
}

export function ListItem({ children, className = "" }: ListProps) {
  return <li className={className}>{children}</li>;
}
