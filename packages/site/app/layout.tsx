import type { Metadata } from "next";
import "@/styles/globals.css";
import { Providers } from "./providers";
import { Toaster } from "sonner";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Wagmi State University Student Portal"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
         <Script
      src="https://cdn.zama.ai/relayer-sdk-js/0.2.0/relayer-sdk-js.umd.cjs"
      type="text/javascript"
      strategy="beforeInteractive"
    />
        <link rel="icon" type="image/svgxml" href="/zama-image.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=MaterialSymbolsOutlined:FILL@0..1&display=block"
          rel="stylesheet"
        />
 


      

      </head>
      <body className={`text-foreground antialiased`}>
            <Providers>{children}</Providers>
        <Toaster position="bottom-center" toastOptions={{ className: "toast" }} />
      </body>
    </html>
  );
}
