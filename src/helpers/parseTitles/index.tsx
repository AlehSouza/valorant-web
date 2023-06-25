function removeTitle(phrase: string) {
    if (phrase === null || phrase === undefined) return
    if (phrase.startsWith("Título ")) {
        phrase = phrase.slice(7).trim();
    }
    return phrase;
}

export default removeTitle
