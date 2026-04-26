import { catchError, forkJoin, map, Observable, of } from 'rxjs';

export interface ImgFile {
  file: File;
  url: string;
  width: number;
  height: number;
}

export interface Img {
  url: string;
  width: number;
  height: number;
}

export function getImageDimensions$(file: File): Observable<{ width: number; height: number }> {
  return new Observable((subscriber) => {
    const img = new Image();

    img.onload = () => {
      subscriber.next({ width: img.width, height: img.height });
      subscriber.complete();

      if (img.src) URL.revokeObjectURL(img.src);
    };

    img.onerror = (error) => {
      subscriber.error(error);
      if (img.src) URL.revokeObjectURL(img.src);
    };

    // Asing the URL after de onload method is defined to ensure the posterior URL deletion
    img.src = URL.createObjectURL(file);
  });
}

export function getImageDimensionsViaURL$(
  url: string,
): Observable<{ width: number; height: number }> {
  return new Observable((subscriber) => {
    const img = new Image();

    img.onload = () => {
      subscriber.next({
        // Use naturalWidth/Height to obtain the image real dimensions,
        // avoiding CSS rules to alter those dimensions
        width: img.naturalWidth,
        height: img.naturalHeight,
      });
      subscriber.complete();
    };

    img.onerror = (error) => subscriber.error(error);

    img.src = url;
  });
}

export function processImageArray$(urls: string[]): Observable<Img[]> {
  const imgs = urls;

  if (imgs.length === 0) {
    return of([]);
  }

  const processedImgs = imgs.map((url) =>
    getImageDimensionsViaURL$(url).pipe(
      map((dimensions) => ({ url, ...dimensions })),
      catchError(() => of({ url, width: 1200, height: 800 })),
    ),
  );

  return forkJoin(processedImgs);
}
