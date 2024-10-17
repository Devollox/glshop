import Head from 'next/head'

interface Props {
  status?: number
  children?: React.ReactNode
}

const Error: React.FC<Props> = ({
    status,
    children
}) => {
  return (
    <>
      <Head>
        <title>{status} — Devollox</title>
      </Head>

      <main>{children}</main>
    </>
  )
}

export default Error