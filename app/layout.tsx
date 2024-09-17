import './globals.css'
import GraphQlProvider from '../lib/provider'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import Header from './components/header/Header'
import Footer from './components/Footer'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='h-full'>
      <head>
        <script async src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_PLACES_KEY}&libraries=places`}></script>
      </head>
      <body className='h-full'>
        <GraphQlProvider>
          <UserProvider>
            <section className='h-full grid grid-rows-[auto_1fr_auto]'>
              <Header />
              {children}
              <Footer />
            </section>
          </UserProvider>
        </GraphQlProvider>
      </body>
    </html>
  )
}
