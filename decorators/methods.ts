import "reflect-metadata";
import {createMethodDecorator} from "./utils/create-method-decorator";

export const Post = createMethodDecorator("POST");
export const Get = createMethodDecorator("GET");
export const Patch = createMethodDecorator("PATCH");
export const Put = createMethodDecorator("PUT");
export const Delete = createMethodDecorator("DELETE");