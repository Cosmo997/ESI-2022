"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleCaseWord = void 0;
function titleCaseWord(word) {
    if (!word)
        return word;
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
}
exports.titleCaseWord = titleCaseWord;
