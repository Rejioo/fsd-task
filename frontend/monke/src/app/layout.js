// app/layout.js
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
