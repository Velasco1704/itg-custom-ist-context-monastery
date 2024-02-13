import React, { PropsWithChildren } from 'react';
import { BulletSchema } from './BulletSchema';
import { useDevice } from 'vtex.device-detector';
import { useListContext } from 'vtex.list-context'
import { getBulletsAsTSXList } from './modules/BulletsAsList'

export interface BulletsGroupProps {
  bullets: BulletSchema
}

const BulletsGroup = ({bullets, children}: PropsWithChildren<BulletsGroupProps>) => {
  const { isMobile } = useDevice()
  const { list } = useListContext() || []

  console.log({ list, bullets });

  const bulletsGroup = getBulletsAsTSXList(bullets);

  if (false) {
    console.log({children, bullets});
  };

  return isMobile ? <div>Este el bullet group en mobile</div> : bulletsGroup;
}

export default BulletsGroup;
