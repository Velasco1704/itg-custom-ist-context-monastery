import React, { PropsWithChildren } from 'react';
import { BulletSchema } from './BulletSchema';
import { useDevice } from 'vtex.device-detector';
import { useListContext, ListContextProvider } from 'vtex.list-context';
import { getBulletsAsTSXList } from './modules/BulletsAsList';
import { useCssHandles } from 'vtex.css-handles';
import './styles.css';

export interface BulletsGroupProps {
  bullets: BulletSchema
}

const BulletsGroup = ({ bullets, children }: PropsWithChildren<BulletsGroupProps>) => {
  const { isMobile } = useDevice();
  const { list } = useListContext() || [];
  const bulletsGroup = getBulletsAsTSXList(bullets);
  const newListContextValue = list.concat(bulletsGroup);
  const CSS_HANDLES = ["bullet__container"];
  const handles = useCssHandles(CSS_HANDLES);

  return (
    <ListContextProvider list={newListContextValue}>
      {isMobile ? (
        <div className={handles['bullet__container']}>{bulletsGroup}</div>
      ) : (
        children
      )}
    </ListContextProvider>
  );
};

export default BulletsGroup;
