import yur1 from '@yur1freitas/eslint-config'

export default yur1(
    {
        presets: {
            json: true,
            react: true,
            regexp: true,
            javascript: true,
            typescript: true,
            stylistic: true,
            perfectionist: true,
            node: true
        }
    },
    {
        rules: {
            'ts/no-empty-object-type': 'off',
            'react-hooks/exhaustive-deps': 'off'
        }
    }
)
