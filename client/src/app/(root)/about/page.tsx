import { Page, PageContainer, Title } from 'components'

/* ========================================================================

======================================================================== */

const About = async () => {
  return (
    <Page>
      <PageContainer>
        <Title
          as='h2'
          style={{
            marginBottom: 50,
            textAlign: 'center'
          }}
        >
          About
        </Title>

        <article className='bg-background-light mx-auto mb-6 min-h-[200px] max-w-[800px] rounded-xl border p-4 leading-[2] shadow'>
          <p className='mb-4'>
            This app was built with Next.js for the client. However, it
            currently does not use any of the server-side features. Instead, it
            connects to an Express server through a proxy that is set up in{' '}
            <code className='text-pink-500'>next.config.ts</code>:
          </p>

          <pre className='bg-background text-primary mx-auto mb-6 max-w-9/10 rounded-lg border text-sm'>
            <code>{`
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: \`${'${EXPRESS_URL}'}/api/:path*\`
      }
    ]
  }
            `}</code>
          </pre>

          <p className='mb-4'>
            Consequently, it's very important that you have a{' '}
            <code className='text-pink-500'>.env</code> that implements{' '}
            <code className='text-pink-500'>
              EXPRESS_URL=http://localhost:5000
            </code>
            . This is the URL that the Express server is set up to listen on.
            Most of the app-specific logic for this project can be found in{' '}
            <code className='text-pink-500'>src/redux-store</code>,{' '}
            <code className='text-pink-500'>src/app/(root)/(home)</code> and{' '}
            <code className='text-pink-500'>src/types</code>.
          </p>

          <p>
            All of the general UI is found in{' '}
            <code className='text-pink-500'>src/components</code> and uses
            enhanced versions of ShadCN, Radix UI, etc.
          </p>
        </article>
      </PageContainer>
    </Page>
  )
}

export default About
