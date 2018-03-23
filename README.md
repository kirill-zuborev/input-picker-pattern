[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/fooloomanzoo/input-picker-pattern)
[![API](https://img.shields.io/badge/API-available-green.svg)](https://www.webcomponents.org/element/fooloomanzoo/input-picker-pattern/mixins/InputPickerPattern)

The repository includes various helper components and standard styles used in elements like [number-input](https://github.com/fooloomanzoo/number-input), [text-input](https://github.com/fooloomanzoo/text-input), [color-input](https://github.com/fooloomanzoo/color-input), [datetime-input](https://github.com/fooloomanzoo/datetime-input), [datetime-picker](https://github.com/fooloomanzoo/datetime-picker) and [color-picker](https://github.com/fooloomanzoo/color-picker).

It includes the following component-pattern:
  - input-pattern
  - input-picker-pattern

and component-mixins:
  - overlay-picker-mixin
  - form-element-mixin
  - switch-container-mixin

and style-mixins:
  - dropdown-style
  - dropdown-tip-style
  - input-shared-style
  - input-picker-shared-style

and components:
  - overlay-element
    - A simple element, that creates an overlay using `iron-overlay-behavior`. Have a look at iron-overlay-behavior's [repository](https://github.com/PolymerElements/iron-overlay-behavior) to find out more about its style-properties.

### default style-properties and -mixins

#### input-shared-style
Custom property                     | Description                                   | Default
------------------------------------|-----------------------------------------------|--------------------
`--input-color`                     | text-color of the input                       | inherit
`--input-background`                | background of the input                       | transparent
`--input-border-width`              | border-width of the input                     | thin
`--input-border-style`              | border-style of the input                     | dotted
`--input-border-color`              | border-color of the input                     | rgba(0, 0, 0, 0.25)
`--input-padding`                   | padding of the input                          | 0.2em
`--input-border-radius`             | border-radius of the input                    | 0.25em
`--input-transition-duration`       | transition-duration of the input              | 250ms
`--input-transition-property`       | transition-property of the input              | background
`--input-transition-timing-function`| transition-timing-function of the input       | cubic-bezier(0.6, 1, 0.2, 1)
`--input-align`                     | text-align of the input input                 | center
`--input-cursor`                    | cursor of the input input                     | initial
`--input-focus-color`               | text-color of the focused and hovered input   | inherit
`--input-focus-background`          | background of the focused and hovered input   | rgba(0, 0, 0, 0.1)
`--input-focus-border-style`        | border-style of the focused and hovered input | dotted
`--input-focus-border-color`        | border-color of the focused and hovered input | currentColor
`--input-invalid-color`             | text-color of the invalid input               | inherit
`--input-invalid-background`        | background of the invalid input               | rgba(255, 0, 0, 0.1)
`--input-invalid-border-style`      | border-style of the invalid input             | dotted
`--input-invalid-border-color`      | border-color of the invalid input             | rgba(255, 0, 0, 0.5)
`--input-disabled-color`            | text-color of the disabled input              | inherit
`--input-disabled-background`       | background of the disabled input              | transparent
`--input-disabled-font-style`       | font-style of the disabled elements           | oblique
`--input-disabled-opacity`          | opacity of the disabled input                 | 0.9
`--input-placeholder-color`         | text-color of the placeholder                 | inherit
`--input-placeholder-opacity`       | opacity of the placeholder                    | 0.75
`--input-placeholder-align`         | text-align of the placeholder                 | center
`--input-selection-color`           | text-color of the selected text               | inherit
`--input-selection-background`      | background of the selected text               | rgba(255, 255, 255, 0.5)
`--input-style`                     | mixin applied to the input                    | {}
`--input-focus`                     | mixin applied to the focused and hovered input| {}
`--input-invalid`                   | mixin applied to the invalid input            | {}
`--input-disabled`                  | mixin applied to the disabled input           | {}
`--input-placeholder`               | mixin applied to the placeholder              | {}

#### input-picker-shared-style
Custom property                   | Description                                  | Default
----------------------------------|----------------------------------------------|--------------------
`--input-picker-color`            | text-color of the picker                     | #d5d5d5
`--input-picker-background`       | background of the picker                     | #252525
`--input-picker-padding`          | padding of the picker                        | 0.25em
`--input-picker-border-radius`    | border-radius                                | 0.5em
`--input-picker-box-shadow`       | box-shadow                                   | 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12), 0 3px 3px -2px rgba(0, 0, 0, 0.4)
`--input-icon-border-radius`      | border-radius of the icons                   | 0.3em
`--input-icon-padding`            | padding of the icons and buttons             | 0.5em
`--input-icon-height`             | height of the icons and buttons              | 1em
`--input-icon-width`              | width of the icons and buttons               | 1em
`--input-icon-background`         | background of the icons and buttons          | transparent
`--input-icon`                    | mixin applied to the icons and buttons       | {}
`--input-picker`                  | mixin applied to the picker                  | {}

The icons will apply all `--input-focus-*`-properties when hovered or focused. The native inputs, select-boxes and buttons apply the related style properties. Some `--input-`properties are set by default:

Custom property                   | Description                                  | Default
----------------------------------|----------------------------------------------|--------------------
`--input-padding`                 | padding of the inputs                        | 0.3em
`--input-border-radius`           | border-radius of the inputs                  | 0.3em
`--input-transition`              | transition of the inputs                     | background 250ms cubic-bezier(0.6, 1, 0.2, 1), color 50ms linear;
`--input-cursor`                  | cursor of the input input                    | pointer
`--input-focus-color`             | text-color of the focused and hovered inputs | #f1f1f1


#### drop-down-tip-style
Custom property                   | Description                                  | Default
----------------------------------|----------------------------------------------|--------------------
--dropdown-tip-size               | dimensions of the tip of the dropdown        | 6px
--dropdown-tip-background         | background of the tip of the dropdown        | --input-picker-background  
