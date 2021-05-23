import * as React from "react";
import "./image.scss";
import { RespImage } from "../../utils/RespImage";
import { makeClass } from "../../utils/helpers";

export type ImageProps = {
    content?: any;
    className?: string;
} & React.HTMLAttributes<HTMLElement>;

const ImageElement = (props: ImageProps) => {
    if (!props.content && !props.children) return null;
    return (
        <figure className={makeClass(["d-image", props.className])}>
            {props.children || RespImage({ image: props.content })}
        </figure>
    );
};

export default ImageElement;
