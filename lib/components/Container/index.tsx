import { cva } from "class-variance-authority";

const containerStyles = cva(["h-10"]);

export function Container({
  className = "",
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return <div className={`${containerStyles()} ${className}`} {...props} />;
}
