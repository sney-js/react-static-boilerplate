import React, { FunctionComponent } from "react";
import Container from "components/Container";
import Layout from "../containers/Layout";
import Link from "../elements/Link";
import { PageProps } from "./PageType";

const ProjectPage: FunctionComponent<PageProps> = (props) => {
  const { projectId } = props.match.params;
  if (!projectId) {
    return (
      <Layout>
        <Container pad={'All'} layout={'maxWidthNarrow'}>
          <Link to={'/project/example'}>Example Project</Link>
        </Container>
      </Layout>
    );
  }
  return (
    <Layout>
      <Container pad={'All'} layout={'maxWidthNarrow'}>
        <h1>Quam temeres</h1>
        <h4>{projectId}</h4>
        <p>
          Cum ceteris in veneratione tui montes, nascetur mus. Quo usque tandem
          abutere, Catilina, patientia nostra? Nihilne te nocturnum praesidium
          Palati, nihil urbis vigiliae. Excepteur sint obcaecat cupiditat non
          proident culpa.
        </p>
        <p>
          Pellentesque habitant morbi tristique senectus et netus. Curabitur
          blandit tempus ardua ridiculus sed magna. Nihil hic munitissimus
          habendi senatus locus, nihil horum? Etiam habebis sem dicantur magna
          mollis euismod. At nos hinc posthac, sitientis piros Afros.
        </p>
        <p>
          Ambitioni dedisse scripsisse iudicaretur. Hi omnes lingua, institutis,
          legibus inter se differunt. Morbi fringilla convallis sapien, id
          pulvinar odio volutpat. Contra legem facit qui id facit quod lex
          prohibet. Quis aute iure reprehenderit in voluptate velit esse. Quam
          diu etiam furor iste tuus nos eludet?
        </p>
      </Container>
    </Layout>
  );
};

export default ProjectPage;
