import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "NEON//CLICK — Cybernetic Clicker",
  description: "A high-voltage cyberpunk clicking game with achievements.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}
