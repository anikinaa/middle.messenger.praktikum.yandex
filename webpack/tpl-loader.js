module.exports = function (source) {
    let key = null;
    const regExp = /\{\{\{(.*?)\}\}\}/gi;

    while ((key = regExp.exec(source))) {
        if (key[1]) {
            const contextKey = key[1].trim();
            const templateEl = getTemplate(contextKey)
            source = source.replace(new RegExp(key[0], "gi"), templateEl);
        }
    }

    return "const template = `"+source+"`;\n\r"+"export default template;";
}

function getTemplate(contextKey) {
    return `<template data-context="${contextKey}"></template>`
}