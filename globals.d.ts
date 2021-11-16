declare module '*.tpl';
declare module '*.svg';

interface Array<T> {
    last: () => T | undefined;
}