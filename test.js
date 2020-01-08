const _ = require('lodash');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const plugin = require('./index.js');

const generatePluginCss = (config, pluginOptions = {}) => {
    return postcss(
        tailwindcss(
            _.merge({
                corePlugins: false,
                plugins: [plugin(pluginOptions)]
            }, config)
        )
    )
    .process('@tailwind components;', {
      from: undefined
    })
    .then(result => result.css)
}

expect.extend({
    toMatchCss: cssMatcher,
})

const buttonBase = `
    display: inline-block;
    outline: none;
    text-decoration: none;
    text-align: center;
    vertical-align: middle;
`;

test('background-color', () => {
    let output = `
        .button-primary {
            background-color: #000000;
            ${buttonBase}
        }`
    return generatePluginCss({
        theme: {
            buttons: {
                'primary': {
                    backgroundColor: '#000000'
                }
            }
        }
    })
    .then(css => {
        expect(css).toMatchCss(output)
    })
});
