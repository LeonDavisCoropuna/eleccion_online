import Link from 'next/link';
import React, { useEffect, useState } from 'react';
export default function IndexPage() {

  return (
      <>
          <div className="mt-3">
            <Link href="/login">Iniciar sesion</Link>
          </div>
      </>
  );
}
