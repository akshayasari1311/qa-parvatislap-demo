import React from 'react';

interface TrekSchemaProps {
  name: string;
  description: string;
  image: string;
  duration?: string;
  destination?: string;
}

const TrekSchema = ({ name, description, image, duration, destination }: TrekSchemaProps) => {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": name,
    "description": description,
    "image": image,
    "publicAccess": true,
    "isAccessibleForFree": true,
    "provider": {
      "@type": "Hostel",
      "name": "Parvati's Lap",
      "url": "https://parvatislap.com",
      "telephone": "+919082229363",
      "email": "parvatislap@gmail.com",
      "sameAs": [
        "https://www.instagram.com/parvatis_lap",
        "https://www.facebook.com/profile.php?id=61551650361876",
        "https://youtube.com/shorts/F8MC3NGpUw0"
      ]
    },
    "location": {
      "@type": "Place",
      "name": destination || "Parvati Valley",
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Himachal Pradesh",
        "addressCountry": "IN"
      }
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default TrekSchema;