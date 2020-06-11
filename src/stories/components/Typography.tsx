import React from 'react';
import Container from 'components/Container';

const DummyText: React.FunctionComponent = () => {
  return (
    <div className='story-typography'>
      <h1>Heading 1</h1>
      <p>
        Tityre, tu patulae recubans sub tegmine fagi dolor.&nbsp;Cras mattis
        iudicium purus sit amet fermentum.&nbsp;Magna pars studiorum, prodita
        quaerimus.&nbsp;Ullamco laboris nisi ut aliquid ex ea commodi consequat.
      </p>
      <p>
        Qui ipsorum lingua Celtae, nostra Galli appellantur.&nbsp;Quisque ut
        dolor gravida, placerat libero vel, euismod.&nbsp;Gallia est omnis
        divisa in partes tres, quarum.
      </p>
      <h2>Heading 2</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa<strong>strong</strong>. Donec pede
        justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,
        rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu
        pede&nbsp;
        <a
          className='external ext'
          href='http://localhost:9001/iframe.html?id=1-welcome--typography&amp;viewMode=docs#'
        >
          link
        </a>{' '}
        mollis pretium.
      </p>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h3>Heading 3</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa.&nbsp;
      </p>
      <h4>Heading 4</h4>
      <p>
        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
        ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium
        quis, sem.
      </p>
      <h4>Heading 4</h4>
      <ul>
        <li>Lorem ipsum dolor sit amet consectetuer.</li>
        <li>Aenean commodo ligula eget dolor.</li>
        <li>Aenean massa cum sociis natoque penatibus.</li>
      </ul>
      <h5>Heading 5</h5>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa.
      </p>
      <ol>
        <li>Lorem ipsum dolor sit amet consectetuer.</li>
        <li>Aenean commodo ligula eget dolor.</li>
        <li>Aenean massa cum sociis natoque penatibus.</li>
      </ol>
      <table className='data'>
        <tbody>
          <tr>
            <th>Entry Header 1</th>
            <th>Entry Header 2</th>
            <th>Entry Header 3</th>
            <th>Entry Header 4</th>
          </tr>
          <tr>
            <td>Entry First Line 1</td>
            <td>Entry First Line 2</td>
            <td>Entry First Line 3</td>
            <td>Entry First Line 4</td>
          </tr>
          <tr>
            <td>Entry Line 1</td>
            <td>Entry Line 2</td>
            <td>Entry Line 3</td>
            <td>Entry Line 4</td>
          </tr>
          <tr>
            <td>Entry Last Line 1</td>
            <td>Entry Last Line 2</td>
            <td>Entry Last Line 3</td>
            <td>Entry Last Line 4</td>
          </tr>
        </tbody>
      </table>
      <p>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes
      </p>
    </div>
  );
};

const Typography = () => {
  return (
    <Container pad='All'>
      <DummyText />
    </Container>
  );
};

export default Typography;
