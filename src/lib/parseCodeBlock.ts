const codeblock = /```(?:(\S+)\n)?\s*([^]+?)\s*```/i;

export const parseCodeBlock = (value: string) => {
    if (/^[0-9]+$/.test(value)) return { code: value, lang: null };
    if (codeblock.test(value)) {
        const parsed = codeblock.exec(value);
        return {
            code: parsed![2],
            lang: parsed![1] ? parsed![1].toLowerCase() : null,
        };
    }

    return { code: value, lang: null };
};
