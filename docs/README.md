# List Context bullets groups

Este componente se encarga de crear un layout personalizado de bullets.

## Instalación

### 1. Clonar repositorio

Copia el [repositorio](https://github.com/Velasco1704/itg-custom-ist-context-monastery) del proyecto y clonarlo en tu terminal.

```bash
git clone https://github.com/Velasco1704/itg-custom-ist-context-monastery
```

### 2. Acceder a la Carpeta del Proyecto

Después de clonar el repositorio, entra a la carpeta del proyecto utilizando el siguiente comando:

```bash
cd itg-custom-ist-context-monastery
```

### 3. Instalar dependencias de la carpeta react

Entra a la carpeta de react y instala las dependencias.

```bash
cd react && yarn
```

> [!NOTE]
> No uses npm y yarn al mismo tiempo esto va a causar conflictos

### 4. Iniciar Sesión en VTEX

Para poder trabajar con VTEX, necesitas iniciar sesión con tu cuenta. Utiliza el siguiente comando y reemplaza {account} con tu nombre de cuenta de VTEX:

```bash
vtex login { account }
```

### 5. Seleccionar el Espacio de Trabajo

Una vez que hayas iniciado sesión, selecciona el espacio de trabajo en el que deseas trabajar utilizando el siguiente comando. Reemplaza {workspace} con el nombre de tu espacio de trabajo:

```bash
vtex use { workspace }
```

### 6. Enlazar el Proyecto al Espacio de Trabajo

Finalmente, enlaza el proyecto a tu espacio de trabajo para visualizarlo ejecutando el siguiente comando:

```bash
vtex link
```

### 7. Agrega el componente

Agrega el componente en el `manifest.json` de tu **store theme**

```JSON
"dependencies": {
   "{accountName}.{appName}": "{appVersion}",
    "vtex.store": "2.x",
    "vtex.store-header": "2.x"
}
```

## Descripción general del proyecto y su uso

Dentro de la carpeta react tenemos todo el codigo del componente, en el archivo `BulletsGroup.tsx` y la carpeta components. Este código es un conjunto de componentes que se utilizan para crear una lista de "bullets" o elementos de lista, cada uno con una imagen, un título y un enlace opcional. Los componentes están diseñados para ser reutilizables, en la version mobile renderiza el custom layout y la version desktop se renderiza un slider layout nativo de VTEX IO.


### Componentes

El código consta de tres componentes principales: `BulletsGroup`, `Bullet` y `getBulletsAsTSXList`.

#### BulletsGroup

Este componente toma una lista de "bullets" y los agrega a un contexto de lista existente. Utiliza el hook `useDevice` para determinar si el dispositivo es móvil y, en caso afirmativo, envuelve los "bullets" en un div con un estilo específico. Si no es un dispositivo móvil, simplemente renderiza los hijos del componente.

```jsx
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
```

#### Bullet

Este componente representa un solo "bullet". Toma una imagen, un título y un objeto de enlace como props y los renderiza dentro de un componente `Link` de `vtex.render-runtime`. El componente `Link` se utiliza para hacer que el "bullet" sea un enlace clickeable.

```jsx
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

```
#### getBulletsAsTSXList

Esta es una función que toma una lista de "bullets" y los convierte en una lista de componentes `Bullet`. Si un "bullet" no tiene un enlace, se le asigna un enlace predeterminado.

```jsx
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
```

### Props

El código también define dos interfaces de TypeScript: `BulletSchema` y `LinkProps`. Estos interfaces definen la forma de los objetos que se pasan como props a los componentes. `BulletSchema` es un array de objetos, cada uno de los cuales tiene una imagen, un título y un enlace opcional. `LinkProps` es un objeto que define las propiedades de un enlace.

```ts
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

```
