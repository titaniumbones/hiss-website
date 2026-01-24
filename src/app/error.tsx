"use client";

import { useEffect } from "react";
import { H1, Paragraph } from "@/components/Typography";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console with proper details
    console.error("Application error:", {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });
  }, [error]);

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <H1>Something went wrong!</H1>
      <Paragraph>
        We encountered an error while loading this page. Please try again.
      </Paragraph>
      {error.message && (
        <div
          style={{
            marginTop: "1rem",
            padding: "1rem",
            backgroundColor: "#fee",
            borderRadius: "4px",
          }}
        >
          <strong>Error:</strong> {error.message}
        </div>
      )}
      <button
        onClick={reset}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#1e3765",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Try again
      </button>
    </div>
  );
}
