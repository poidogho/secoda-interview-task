import '@mantine/core/styles.css';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MantineProvider, createTheme } from '@mantine/core';
import TanstackProvider from "../provider/TanstackProvider";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  /** Put your mantine theme override here */
});

export const metadata: Metadata = {
  title: "Secoda CryptoCurrency Challenge",
  description: "Secoda take home task for SE role",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TanstackProvider>
          <MantineProvider theme={theme}>
            {children}
          </MantineProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
