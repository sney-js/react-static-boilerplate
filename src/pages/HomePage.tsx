import React, { FunctionComponent, useEffect, useState } from 'react';
import Card from 'components/Card';
import Grid from 'components/Grid';
import Container from 'components/Container';
import Layout from 'containers/Layout';
import { PageProps } from "./PageType";

const HomePage: FunctionComponent<PageProps> = (props) => {
  const [timeout, setTime] = useState(false);
  useEffect(() => {
    setTimeout(() => setTime(true), 1000);
  }, []);
  return (
    <Layout>
      {timeout && <Container layout={'maxWidth'} pad={'All'}>
        <Grid template='repeat(auto-fill, minmax(300px, 1fr))'>
          {timeout ? (
            <Card
              title={'Card Example'}
              subTitle={'Subtitle'}
              image={<img src={'/assets/images/example.jpg'} />}
              link={{ to: '/project/example', title: 'See More' }}
              description={
                'Me non paenitet nullum festiviorem excogitasse ad hoc. Quisque ut dolor gravida, placerat libero vel, euismod. Hi omnes lingua, institutis, legibus inter se differunt.'
              }
            />
          ) : null}
        </Grid>
      </Container>}
    </Layout>
  );
};

export default HomePage;
