import React from 'react';
import { Helmet } from 'react-helmet';
import { SITE_TITLE, DESCRIPTION } from '../../constants/seo';

type SeoProps = {
  title?: string;
  metaDescription?: string;
  meta?: React.DetailedHTMLProps<
    React.MetaHTMLAttributes<HTMLMetaElement>,
    HTMLMetaElement
  >[];
};

const Seo: React.FC<SeoProps> = ({ title, metaDescription, meta = [] }) => {
  const seoDescription = metaDescription || DESCRIPTION;
  return (
    <Helmet
      title={title}
      titleTemplate={`%s | ${SITE_TITLE}`}
      meta={[
        {
          name: `description`,
          content: seoDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: seoDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: seoDescription,
        },
      ]}
    />
  );
};

export default Seo;
