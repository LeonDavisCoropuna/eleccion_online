import Link from 'next/link'
import React from 'react'
import Head from "next/head";

export default function IndexPage() {
  return (
    <>
    <Head>
      <title>Home</title>
    </Head>
    <div>Bienvenido</div>
    <div>
      <Link href='/login'>Iniciar sesion</Link>
      <Link href='/new'>Registrarse</Link>
    </div>
    </>
  )
}
