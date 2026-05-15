import './globals.css'

import { EventProvider } from '../context/EventContext'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de">
      <body>
        <EventProvider>
          {children}
        </EventProvider>
      </body>
    </html>
  )
}