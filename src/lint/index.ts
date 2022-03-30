import { ESLint } from "eslint";


export const lint = async (code: string) => {
    try {
        // 1. Create an instance with the `fix` option.
        const eslint = new ESLint({ fix: true });

        /*
        // 2. Lint files. This doesn't modify target files.
        const results = await eslint.lintFiles([path]);

        // 3. Modify the files with the fixed code.
        await ESLint.outputFixes(results);

        // 4. Format the results.
        const formatter = await eslint.loadFormatter("stylish");
        // 5. Output it.
        const resultText = formatter.format(results);
         */

        const results = await eslint.lintText(code);

        // 3. Modify the files with the fixed code.
        await ESLint.outputFixes(results);
        // 4. Format the results.
        const formatter = await eslint.loadFormatter("stylish");
        // 5. Output it.

        const resultText = formatter.format(results);
        console.log(resultText);

    } catch(error) {
        process.exitCode = 1;
        console.error(error);
    }
};
