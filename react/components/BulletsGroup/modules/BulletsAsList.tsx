import React from 'react';
import { BulletSchema, LinkProps } from '../BulletSchema';
import Bullet from '../Bullet';

interface Bullet {
  image: string;
  titleBullet: string;
  link?: LinkProps;
}

export const getBulletsAsTSXList = (bullets: BulletSchema) =>
  bullets.map((bullet: Bullet, index) => (
    <Bullet
      key={index}
      src={bullet.image}
      titleBullet={bullet.titleBullet}
      link={
        bullet.link
          ? bullet.link
          : {
              url: "",
              attributesNoFollow: false,
              attributesTitle: "",
              openNewTab: false,
              newTab: false,
            }
      }
    />
  ));
