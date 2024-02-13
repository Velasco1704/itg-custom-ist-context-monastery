import React from 'react';
import { Link } from 'vtex.render-runtime';
import { LinkProps } from './BulletSchema'
import { useCssHandles } from 'vtex.css-handles';
import './styles.css';

interface Props {
  src: string;
  titleBullet: string;
  link: LinkProps;
}
const Bullet = ({ src, titleBullet, link}: Props) => {
  const CSS_HANDLES = [
    'bullet__item',
    'bullet__item--title',
    'bullet__item--image',
    'bullet__item--link',
  ];
  const handles = useCssHandles(CSS_HANDLES)
  return (
    <div className={handles['bullet__item']}>
      <Link className={handles['bullet__item--link']} to={link.url}>
        <img
          className={handles['bullet__item--image']}
          src={src}
          alt={titleBullet}
        />
        <p className={handles['bullet__item--title']}>{titleBullet}</p>
      </Link>
    </div>
  )
}

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
