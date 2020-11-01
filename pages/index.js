import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center align-center">
      <Head>
        <title>prototype</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-1 flex-col justify-center align-center bg-black"></main>

      <footer className="w-full h-100 bg-black">Powered by passion</footer>
    </div>
  )
}
