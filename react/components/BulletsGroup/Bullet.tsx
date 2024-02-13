import React from 'react';
import { Link } from 'vtex.render-runtime';
import { LinkProps } from './BulletSchema'
// import { useCssHandles } from 'vtex.css-handles'

interface Props {
  src: string;
  titleBullet: string;
  link: LinkProps;
}
const Bullet = ({ src, titleBullet, link}: Props) =>
  <Link to={link.url}>
    <p>My Image{src}</p>
    <p>{titleBullet}</p>
  </Link>;

Bullet.schema = {
  title: "Bullet",
  type: "object",
  properties: {
    src: {
      title: "Image del Bullet",
      type: "string",
      widget: {
        "ui:widget": "image-uploader"
      }
    }
  }
}

export default Bullet;
