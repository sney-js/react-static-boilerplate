import { InfotileProps } from './Infotile';

export const extractInfoTileProps = (
  props: InfotileProps & any
): InfotileProps => {
  const { title, titleSecondary, subTitle, description, link, linkSecondary } =
    props;
  return { title, titleSecondary, subTitle, description, link, linkSecondary };
};

export const withoutInfoTileProps = (props: InfotileProps & any): any => {
  const {
    title,
    titleSecondary,
    subTitle,
    description,
    link,
    linkSecondary,
    ...rest
  } = props;
  return rest;
};

const generateProps = () => ({
  subTitle: 'Sub Title',
  title: 'Main Title',
  titleSecondary: 'Secondary Title',
  description: 'Nihil hic munitissimus habendi senatus locus, nihil horum?',
  link: { title: 'View More' },
  linkSecondary: { title: 'Got It' }
});
export const INFO_TILE_PROPS = generateProps();

export const randomiseInfoTilePropsValue = (props: InfotileProps & any) => {
  const freshProps = generateProps();
  for (const key in props) {
    // eslint-disable-next-line no-prototype-builtins
    if (props.hasOwnProperty(key) && freshProps[key]) {
      props[key] = freshProps[key];
    }
  }
  return props;
};
