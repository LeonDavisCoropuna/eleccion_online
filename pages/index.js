import Link from 'next/link'
import React from 'react'

export default function IndexPage() {
  return (
    <>

    <div>Bienvenido</div>
    <div>
      <Link href='/login'>Iniciar sesion</Link>
      <Link href='/new'>Registrarse</Link>

    </div>
    </>
  )
}
