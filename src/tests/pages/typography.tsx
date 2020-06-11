import React from "react";
import Container from "components/container/Container";

export default () => {
    return (
        <Container>
            <div className="content">
                <h1>Heading 1</h1>
                <h2>Heading 2</h2>
                <h3>Heading 3</h3>
                <h4>Heading 4</h4>
                <h5>Heading 5</h5>
                <h6>Heading 6</h6>
                <b>Bold</b>
                <i>Italic</i>
                <b>
                    <i>bold italic</i>
                </b>
                <p className="roman">
                    Paragraph Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab earum
                    excepturi laborum, quos repellendus rerum. Autem cum, dolorum error magni
                    nesciunt nisi quasi? A architecto aut earum optio, quos reiciendis.
                </p>
                <p className="italic">
                    Paragraph Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab earum
                    excepturi laborum, quos repellendus rerum. Autem cum, dolorum error magni
                    nesciunt nisi quasi? A architecto aut earum optio, quos reiciendis.
                </p>
                <p className="bold">
                    Paragraph Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab earum
                    excepturi laborum, quos repellendus rerum. Autem cum, dolorum error magni
                    nesciunt nisi quasi? A architecto aut earum optio, quos reiciendis.
                </p>
                <p className="black">
                    Paragraph Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab earum
                    excepturi laborum, quos repellendus rerum. Autem cum, dolorum error magni
                    nesciunt nisi quasi? A architecto aut earum optio, quos reiciendis.
                </p>
                <p className="ultra-black">
                    Paragraph Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab earum
                    excepturi laborum, quos repellendus rerum. Autem cum, dolorum error magni
                    nesciunt nisi quasi? A architecto aut earum optio, quos reiciendis.
                </p>
            </div>
        </Container>
    );
};
