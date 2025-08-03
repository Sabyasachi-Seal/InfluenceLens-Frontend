export const metadata = {
  title: "Influencer Content Review",
  description:
    "Review content submissions against brand briefs for marketing campaigns",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
