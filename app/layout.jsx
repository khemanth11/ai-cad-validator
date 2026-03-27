import "./globals.css";

export const metadata = {
  title: "CAD Validator AI",
  description: "AI-Driven Design Intelligence for Early-Stage CAD Validation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
