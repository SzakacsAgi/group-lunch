import './globals.css'
import GraphQlProvider from '../lib/GraphQlProvider'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import Header from './components/header/Header'
import Footer from './components/Footer'
import RecoilContextProvider from '../lib/RecoilContextProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='h-full'>
      <head>
        <title>Group lunch</title>
      </head>
      <body>
        <GraphQlProvider>
          <UserProvider>
            <RecoilContextProvider>
              <section className='grid grid-rows-[auto_1fr_auto]'>
                <Header />
                {children}
                <Footer />
              </section>
            </RecoilContextProvider>
          </UserProvider>
        </GraphQlProvider>
      </body>
    </html>
  )
}
