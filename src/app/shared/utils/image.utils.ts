import { Observable } from 'rxjs';

export interface ImgFile {
  file: File;
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

    img.onerror = (err) => {
      subscriber.error(err);
      if (img.src) URL.revokeObjectURL(img.src);
    };

    // Asing the URL after de onload method is defined to ensure the posterior URL deletion
    img.src = URL.createObjectURL(file);
  });
}
