const _ = require('lodash');

module.exports = function(options = {}) { 
    return function ({ addComponents, theme, e }) {
        const defaultOptions = {
            sizes: true,
        };
        options = _.defaults({}, options, defaultOptions);

        const defaultButtonsTheme = {};
        const defaultButtonSizesTheme = {};
        const buttonsTheme = theme('buttons', defaultButtonsTheme);
        const buttonSizesTheme = theme('buttonSizes', defaultButtonSizesTheme);

        const buttons = _.map(buttonsTheme, (buttonOption, button) => {
            let parameters = {
                backgroundColor: buttonOption.backgroundColor,
                borderWidth: buttonOption.borderWidth,
                borderStyle: buttonOption.borderStyle,
                borderColor: buttonOption.borderColor,
                borderRadius: buttonOption.borderRadius,
                color: buttonOption.textColor,
                display: 'inline-block',
                fontSize: buttonOption.fontSize,
                lineHeight: buttonOption.lineHeight,
                outline: 'none',
                padding: buttonOption.padding,
                textDecoration: 'none',
                textAlign: 'center',
                verticalAlign: 'middle'
            };

            if(buttonOption.backgroundColorHover !== undefined || buttonOption.textColorHover !== undefined) {
                parameters['&:hover'] = {
                    backgroundColor: buttonOption.backgroundColorHover,
                    color: buttonOption.textColorHover,
                };
            }

            return {
                [`.button-${e(button)}`]: parameters
            }
        });

        const buttonSizes = _.map(buttonSizesTheme, (sizeOption, size) => {
            return {
                [`.button-${e(size)}`]: {
                    fontSize: sizeOption.fontSize,
                    padding: sizeOption.padding,
                }
            }
        });

        addComponents(buttons);
        
        if(options.sizes){
            addComponents(buttonSizes);
        }
    }
}