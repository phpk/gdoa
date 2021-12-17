/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import router from 'next/router'
import { useEffect } from 'react'
import * as gtag from 'utils/gtag'

function handleRouteChange(url: URL) {
  gtag.pageview(url)
}

export default function useGtag() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])
}
