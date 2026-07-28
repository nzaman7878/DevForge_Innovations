import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, type = 'website', url, image }) {
  const siteName = 'DevForge Innovations';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = 'DevForge Innovations builds premium, scalable, and modern software solutions and web applications for forward-thinking businesses.';
  const defaultImage = 'https://devforge-innovations.com/og-image.jpg'; // Placeholder for the actual OG image
  const defaultUrl = 'https://devforge-innovations.com';

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <link rel="canonical" href={url || window.location.href} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
}
