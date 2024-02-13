export type BulletSchema = [{
  image: string;
  titleBullet: string;
  link?: LinkProps;
}]

export interface LinkProps{
  url: string;
  attributesNoFollow?: boolean;
  attributesTitle?: string;
  openNewTab?: boolean;
  newTab?: boolean;
}
