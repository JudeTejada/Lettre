interface SeoProps {
  title?: string;
}

export const Seo = ({ title }: SeoProps) => {
  const meta = {
    title: title || 'Lettre',
    description: 'Send a letter to a special person using with a QR Code.',
    image: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/hero.png`,
    type: 'Website'
  };

  console.log(meta.image);
  return (
    <>
      <title>{meta.title}</title>
      <meta
        name='description'
        content='Send a letter to a special person using with a QR Code '
      />
      <meta property='og:title' content='Lettre' />
      <meta
        property='og:description'
        content='Send a letter to a special person using with a QR Code'
      />
      <meta
        property='og:url'
        content={`${process.env.NEXT_PUBLIC_WEBSITE_URL}`}
      />
      <meta property='og:type' content='website' />
      <link
        rel='apple-touch-icon'
        sizes='57x57'
        href='/favicon/apple-icon-57x57.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='60x60'
        href='/favicon/apple-icon-60x60.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='72x72'
        href='/favicon/apple-icon-72x72.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='76x76'
        href='/favicon/apple-icon-76x76.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='114x114'
        href='/favicon/apple-icon-114x114.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='120x120'
        href='/favicon/apple-icon-120x120.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='144x144'
        href='/favicon/apple-icon-144x144.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='152x152'
        href='/favicon/apple-icon-152x152.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/favicon/apple-icon-180x180.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='192x192'
        href='/favicon/android-icon-192x192.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='96x96'
        href='/favicon/favicon-96x96.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon/favicon-16x16.png'
      />
      <link rel='manifest' href='/favicon/manifest.json' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta
        name='msapplication-TileImage'
        content='/favicon/ms-icon-144x144.png'
      />
      <meta name='theme-color' content='#ffffff' />

      <meta name='robots' content='follow, index' />
      <meta charSet='UTF-8' />

      {/*  OPEN GRAPH / facebook*/}
      <meta property='og:type' content={meta.type} />
      <meta property='og:site_name' content='Jude Tejada' />
      <meta property='og:description' content={meta.description} />
      <meta property='og:title' content={meta.title} />
      <meta property='og:image' content={meta.image} />

      {/*  twitter*/}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@JudeTejada2' />
      <meta name='twitter:title' content={meta.title} />
      <meta name='twitter:description' content={meta.description} />
      <meta name='twitter:image' content={meta.image} />
    </>
  );
};
