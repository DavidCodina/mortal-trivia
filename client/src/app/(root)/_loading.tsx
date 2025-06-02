import { PageSpinner } from '@/components/PageSpinner'

/* ========================================================================
                               Loading
======================================================================== */
// loading.tsx is a server component. Ultimately, using a loading.tsx is a
// lazy approach. It's always better to instead implement <Suspense> in
// the page you're navigating to.

export default function Loading() {
  return <PageSpinner />
}
