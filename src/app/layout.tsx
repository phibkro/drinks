import { ThemeProvider } from "@/components/ui/ThemeProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Drinks",
  description: "My App is a...",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div id="root">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
