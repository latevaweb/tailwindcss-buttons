const _ = require('lodash');

module.exports = function(options = {}) { 
    return function ({ addComponents, theme, e }) {
        const defaultOptions = {
            sizes: false,
        };
        options = _.defaults({}, options, defaultOptions);

        const defaultButtonsTheme = {
            'default': {
                backgroundColor: theme('colors.blue.500'),
                backgroundColorHover: theme('colors.blue.700'),
                textColor: '#FFFFFF',
                textColorHover: '#FFFFFF',
                textDecoration: 'none',
                padding: '0.75rem 2rem',
                borderRadius: '0.25rem'
            }
        };
        const defaultButtonSizesTheme = {};
        const buttonsTheme = theme('buttons', defaultButtonsTheme);
        const buttonSizesTheme = theme('buttonSizes', defaultButtonSizesTheme);

        const buttons = _.map(buttonsTheme, (buttonOption, button) => {
            let parameters = {
                display: 'inline-block',
                outline: 'none',
                backgroundColor: buttonOption.backgroundColor,
                fontSize: buttonOption.fontSize,
                fontFamily: buttonOption.fontFamily,
                fontWeight: buttonOption.fontWeight,
                color: buttonOption.textColor,
                textDecoration: buttonOption.textDecoration,
                textTransform: buttonOption.textTransform,
                letterSpacing: buttonOption.letterSpacing,
                padding: buttonOption.padding,
                borderWidth: buttonOption.borderWidth,
                borderStyle: buttonOption.borderStyle,
                borderColor: buttonOption.borderColor,
                borderRadius: buttonOption.borderRadius,
                lineHeight: buttonOption.lineHeight
            };

            if(buttonOption.backgroundColorHover !== undefined || buttonOption.textColorHover !== undefined || buttonOption.borderColorHover !== undefined) {
                parameters['&:hover'] = {
                    backgroundColor: buttonOption.backgroundColorHover,
                    color: buttonOption.textColorHover,
                    borderColor: buttonOption.borderColorHover
                };
            }

            return { [`.button-${e(button)}`]: parameters }
        });

        const buttonSizes = _.map(buttonSizesTheme, (sizeOption, size) => {
            return {
                [`.button-${e(size)}`]: {
                    fontSize: sizeOption.fontSize,
                    padding: sizeOption.padding
                },
            }
        });

        addComponents(buttons);

        if(options.sizes){
            addComponents(buttonSizes);
        }
    }
}