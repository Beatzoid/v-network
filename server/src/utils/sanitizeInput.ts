export const sanitizeInput = (input: Record<string, string>) => {
    Object.values(input).forEach((value: string) => {
        if (value.replace("[{}]", "").includes("$"))
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            input[Object.keys(input).find((key) => input[key] === value)] = (
                value as string
            ).replace("$", "");
    });
};
