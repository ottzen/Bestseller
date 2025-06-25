export interface PromotionalSpot {
  link: string;
  position: number;
  type: string;
  image: PromoImage;
  imageAltText: string;
  _alias: string;
}

export interface PromoImage {
  aspectRatio: string;
  imageUrl: string;
  focalPoint: {
    x: number;
    y: number;
  };
  maxWidth: string;
  alt: string;
}