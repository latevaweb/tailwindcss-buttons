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
`;

test('Create default button', () => {
    let output = `
        .button-default {
            ${buttonBase}
            background-color: #4299e1;
            color: #FFFFFF;
            text-decoration: none;
            padding: 0.75rem 2rem;
            border-radius: 0.25rem;
        }
        .button-default:hover {
            background-color: #2b6cb0;
            color: #FFFFFF;
        }`
    return generatePluginCss()
    .then(css => {
        expect(css).toMatchCss(output)
    })
});

test('Create custom button', () => {
    let output = `
        .button-custom {
            ${buttonBase}
            background-color: #000000;
            color: #FFFFFF;
            text-decoration: none;
            padding: 0.75rem 2rem;
            border-radius: 0.25rem;
        }
        .button-custom:hover {
            background-color: #000000;
            color: #FFFFFF;
        }`
    return generatePluginCss({
        theme: {
            buttons:{
                'custom': {
                    backgroundColor: '#000000',
                    backgroundColorHover:' #000000',
                    textColor: '#FFFFFF',
                    textColorHover: '#FFFFFF',
                    textDecoration: 'none',
                    padding: '0.75rem 2rem',
                    borderRadius: '0.25rem'
                }
            }
        }
    })
    .then(css => {
        expect(css).toMatchCss(output)
    })
});