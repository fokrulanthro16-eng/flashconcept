import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NexusMind & FlashConcept | Editorial SaaS & Cognitive Mesh",
  description:
    "High-end editorial SaaS platform and multimodal learning engine. Master complex systems, AI models, and zero-knowledge architectures in seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#E4E8DF] text-[#162821] min-h-screen antialiased selection:bg-[#E6F77B] selection:text-[#162821]">
        {children}
      </body>
    </html>
  );
}
