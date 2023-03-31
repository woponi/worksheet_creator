import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { initGA } from '../../utils/analytics';
import React, {useState, useEffect, useRef} from 'react';


export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    initGA();
  }, []);

  return <Component {...pageProps} />
}
