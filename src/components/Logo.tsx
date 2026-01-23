import Image from "next/image";

interface LogoProps {
  variant?: "default" | "white";
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function Logo({
  variant = "default",
  width = 200,
  height = 60,
  className = "",
  priority = false,
}: LogoProps) {
  const logoSrc =
    variant === "white"
      ? "/images/logos/utsc-logo-white.svg"
      : "/images/logos/utsc-logo.svg";

  return (
    <Image
      src={logoSrc}
      alt="University of Toronto Scarborough"
      width={width}
      height={height}
      className={className}
      priority={priority}
      style={{ maxWidth: "100%", height: "auto" }}
    />
  );
}
