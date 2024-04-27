import React from "react"
import { ChakraProvider } from "@chakra-ui/react"
import { LinksFunction, MetaFunction } from "@remix-run/node"
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import "nprogress/nprogress.css"
import { DevSupport } from "@react-buddy/ide-toolbox"
import "@fontsource-variable/noto-sans-thai"

import logo from "~/branding/creatorsgarten.svg"
import { AppLayout } from "~/packlets/layout/app"
import { chakraTheme } from "~/packlets/layout/chakraTheme"
import "~/index.css"

import { ComponentPreviews, useInitial } from "../dev"

export const meta: MetaFunction = () => {
  return [
    { title: "Creatorsgarten Inventory" },
    { name: "description", content: "Inventory tracking system" },
    { viewport: "width=device-width,initial-scale=1" },
    { charset: "utf-8" },
  ]
}

export const links: LinksFunction = () => {
  return [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap",
    },
  ]
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script src="https://cdn.jsdelivr.net/npm/iconify-icon@1.0.8/dist/iconify-icon.min.js"></script>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <ChakraProvider theme={chakraTheme}>
      <DevSupport
        ComponentPreviews={ComponentPreviews}
        useInitialHook={useInitial}
      >
        <AppLayout>
          <Outlet />
        </AppLayout>
      </DevSupport>
    </ChakraProvider>
  )
}

export function HydrateFallback() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animation: "1s loading-init ease-out",
        willChange: "opacity",
      }}
    >
      <img src={logo} style={{ width: 128 }} alt="Creatorsgarten (loading)" />
    </div>
  )
}
