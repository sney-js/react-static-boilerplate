import React from 'react';
import Container from '../../components/container';
import {
  IArticleFields,
  IListFields,
  IPageFields
} from '../../../contentful/@types/contentful';
import { getContentType, resolve } from '../../utils/Resolver';
import RichText from '../../elements/rich-text/RichText';
import { RespImage } from '../../utils/RespImage';
import Card from '../../components/Card';
import Grid from '../../components/Grid';

type ListTypes = {
  customList?: Array<any>;
  item?: IListFields;
};

export default function ListContainer(props: ListTypes) {
  if (props.item) {
    return <CardList title={props.item.name} list={props.item.consys} />;
  } else if (props.customList) {
    return null;
  }
}

export const CardList = ({ list, title }) => {
  return (
    <Container animateIn pad='All' layout='maxWidth'>
      <h2>{title}</h2>
      <Grid
        template='1fr 1fr 1fr'
        templateTablet='1fr 1fr'
        templateMobile='1fr'
      >
        {list.map((page, index) => {
          const type = getContentType(page);
          switch (type) {
            case 'article': {
              const fields = page.fields as IArticleFields;
              return (
                <Card
                  key={`article${index}`}
                  title={fields.title}
                  image={<RespImage image={fields.image} />}
                  cardLink={{ path: resolve(page) }}
                  description={<RichText document={fields.description} />}
                  subTitle={fields.category.fields.title}
                />
              );
            }
            case 'page': {
              const fields = page.fields as IPageFields;
              return (
                <Card
                  key={`page${index}`}
                  title={fields.title}
                  image={<RespImage image={fields.image} />}
                  cardLink={{ path: resolve(page) }}
                />
              );
            }
            default:
              return null;
          }
        })}
      </Grid>
    </Container>
  );
};
