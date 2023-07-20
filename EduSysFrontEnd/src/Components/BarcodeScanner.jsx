import { BrowserMultiFormatReader, DecodeHintType, Result } from '@zxing/library';
import { useEffect, useMemo, useRef } from 'react';

const BarcodeScanner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reader = useRef(new BrowserMultiFormatReader());

  useEffect(() => {
    if (!videoRef.current) return;
    reader.current.decodeFromConstraints(
      {
        audio: false,
        video: {
          facingMode: 'environment',
        },
      },
      videoRef.current,
      (result, error) => {
        if (result) console.log(result);
        if (error) console.log(error);
      }
    );
    return () => {
      reader.current.reset();
    }
  }, [videoRef]);

  return <video ref={videoRef} />;
};