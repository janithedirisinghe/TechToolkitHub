'use client';

import Image, { ImageProps } from 'next/image';
import { useState } from 'react';

type SafeImageProps = Omit<ImageProps, 'alt'> & {
  alt?: string;
  hideOnError?: boolean;
};

export default function SafeImage({ hideOnError = true, alt = '', ...rest }: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError && hideOnError) return null;

  return (
    <Image
      alt={alt}
      {...rest}
      onError={() => setHasError(true)}
    />
  );
}
