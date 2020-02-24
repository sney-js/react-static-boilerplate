import * as React from "react";
import "./image.scss";
import { RespImage } from "../../utils/RespImage";
import { generateClassList } from "../../utils/helpers";

export type ImageProps = {
    content?: any;
    className?: string;
};

class ImageElement extends React.Component<ImageProps> {
    constructor(params?) {
        super(params);
    }

    render() {
        if (!this.props.content && !this.props.children) return null;
        return (
            <figure className={generateClassList(["d-image", this.props.className])}>
                {this.props.children || RespImage({ image: this.props.content })}
            </figure>
        );
    }
}

export default ImageElement;
