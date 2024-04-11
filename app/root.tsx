// root.tsx
import React, { useContext, useEffect } from "react";
import { withEmotionCache } from "@emotion/react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { MetaFunction, LinksFunction } from "@remix-run/node";

import { ServerStyleContext, ClientStyleContext } from "./context";
import logo from "./branding/creatorsgarten.svg";
import { AppLayout } from "../packlets/layout/app";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
    { viewport: "width=device-width,initial-scale=1" },
    { charset: "utf-8" },
  ];
};

export const links: LinksFunction = () => {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
    },
  ];
};

interface DocumentProps {
  children: React.ReactNode;
}

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on a client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang="en">
        <head>
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  },
);

export default function App() {
  return (
    <Document>
      <ChakraProvider>
        <AppLayout>
          <Outlet />
        </AppLayout>
      </ChakraProvider>
    </Document>
  );
}

// export function HydrateFallback() {
//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <img src={logo} style={{ width: 128 }} alt="Creatorsgarten (loading)" />
//     </div>
//   );
// }
