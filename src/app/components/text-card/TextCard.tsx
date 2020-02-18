import * as React from "react";
import "./text-card.scss";
import { ReactNode } from "react";
import Container from "../../components/container/Container";
import Card, { CardFold } from "../../components/container/Card";
import Title from "../../elements/title/Title";
import { generateClassList } from "../../utils/helpers";
import { connect } from "react-redux";
import { Hero } from "../hero-component/hero";

type TextCardProps = {
    caption?: string;
    header?: ReactNode;
    headerAlignment?: "left" | "right" | "center";
    content?: ReactNode;
    doNotApplyCardStyles?: boolean;
    padded?: boolean;
    splitColumns?: "desktop";
    forLoggedIn?: boolean;
    isLoggedIn?: boolean;
};


const mapStateToProps = ({ isLoggedIn }) => {
    return {
        isLoggedIn,
    };
};

export class TextCard extends React.Component<TextCardProps> {
    static defaultProps = {
        padded: true,
    };

    constructor(params?) {
        super(params);
    }

    getCardContent() {
        return (
            <div className={"text-card-content"}>
                {(this.props.caption || this.props.header) && (
                    <Title
                        caption={this.props.caption}
                        content={this.props.header}
                        alignment={this.props.headerAlignment}
                    />
                )}

                {this.props.content && (
                    <React.Fragment>
                        <div className={"text-card-main-content"}>
                            <div className={"text-card-header-divider"} />
                            {this.props.content}
                        </div>
                    </React.Fragment>
                )}
            </div>
        );
    }

    render() {
        if (this.props.forLoggedIn && !this.props.isLoggedIn) return null;
        if (this.props.forLoggedIn === false && this.props.isLoggedIn) return null;
        return (
            <Container
                padded={this.props.padded}
                half_padded_y
                className={generateClassList([
                    "text-card",
                    this.props.splitColumns == "desktop" && "text-card-columns-desktop",
                ])}
                animateIn
            >
                {!this.props.doNotApplyCardStyles && (
                    <Card maxWidth padded fold={CardFold.BOTTOM_RIGHT}>
                        {this.getCardContent()}
                    </Card>
                )}
                {this.props.doNotApplyCardStyles && (
                    <Container maxWidth padded_x>
                        {this.getCardContent()}
                    </Container>
                )}
            </Container>
        );
    }
}

const TextCardConnected = connect(mapStateToProps)(TextCard);

export default TextCardConnected;
