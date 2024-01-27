import '@mantine/core/styles.css';
import type { Metadata } from "next";
import { MantineProvider, createTheme } from '@mantine/core';
import TanstackProvider from "../provider/TanstackProvider";

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
      <body>
        <TanstackProvider>
          <MantineProvider theme={theme}>
            {children}
          </MantineProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
