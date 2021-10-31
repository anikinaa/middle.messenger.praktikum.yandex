import { Template } from '../Template'

export enum EVENTS {
    INIT = 'init',
    FLOW_CDM = 'flow:component-did-mount',
    FLOW_CDU = 'flow:component-did-update',
    FLOW_RENDER = 'flow:render',
}

type PartialRecord<K extends keyof any, T> = {
    [P in K]?: T;
};

/* eslint-disable-next-line no-undef */
type IEvents = PartialRecord<keyof HTMLElementEventMap, EventListener>;

type IAttributes = Record<string, string>;

export type IBlock<T extends object> = {
    props?: T;
    tagName?: string;
    attributes?: IAttributes;
    events?: IEvents;
    template?: Template<T>;
};
