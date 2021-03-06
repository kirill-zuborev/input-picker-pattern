import { html } from '@polymer/polymer/lib/utils/html-tag.js';

export const style = html`
  <style>
    :host {
      display: inline-flex;
      box-sizing: content-box;
    }
    :host([hidden]),
    [hidden] {
      display: none !important;
    }
    :host([disabled]),
    [disabled] {
      pointer-events: none;
    }
    :host(:focus),
    :focus {
      outline: none;
    }

    /**
     * inner inputs
     */
    integer-input,
    number-input,
    text-input {
      --input-color: var(--inner-input-color, inherit);
      --input-background: var(--inner-input-background, transparent);
      --input-border-width: var(--inner-input-border-width, thin);
      --input-border-color: var(--inner-input-border-color, transparent);
      --input-border-style: var(--inner-input-border-style, dotted);
      --input-padding: var(--inner-input-padding, 0);
      --input-border-radius: var(--inner-input-border-radius, 0.1em);
      --input-focus-color: var(--inner-input-focus-color, inherit);
      --input-focus-background: var(--inner-input-focus-background, rgba(0,0,0,0.1));
      --input-focus-border-color: var(--inner-input-focus-border-color, rgba(0,0,0,0.15));
      --input-focus-border-style: var(--inner-input-focus-border-style, dotted);
      --input-invalid-color: var(--inner-input-invalid-color, inherit);
      --input-invalid-background: var(--inner-input-invalid-background, rgba(255,255,255,0.5));
      --input-invalid-border-style: var(--inner-input-invalid-border-style, dotted);
      --input-invalid-border-color: var(--inner-input-invalid-border-color, rgba(255,0,0,0.25));
    }

    /**
     * general input style
     */
     button,
     select {
       -moz-appearance: none;
       -webkit-appearance: none;
       appearance: none;
       color: inherit;
       background: transparent;
       border: var(--inner-input-border-width, thin) solid transparent;
       box-sizing: border-box;
     }

    input,
    #input {
      display: inline-flex;
      flex-direction: row;
      align-items: baseline;
      color: inherit;
      min-width: inherit;
      max-width: inherit;
      box-sizing: content-box;
      border-style: var(--input-border-style, dotted);
      border-width: var(--input-border-width, thin);
      border-color: var(--input-border-color, rgba(0,0,0,0.25));
    }

    button,
    input,
    select,
    #input {
      font-family: inherit;
      font-size: inherit;
      font-weight: inherit;
      font-style: inherit;
      outline: none;
      line-height: normal;
      cursor: var(--input-cursor, initial);
      text-align: var(--input-align, center);
      transition-duration: var(--input-transition-duration, 250ms);
      transition-timing-function: var(--input-transition-timing-function, cubic-bezier(0.6, 1, 0.2, 1));
      transition-property: var(--input-transition-property, background-color);
      padding: var(--input-padding, 0.25em);
      color: var(--input-color, inherit);
      background-color: var(--input-background, transparent);
      border-radius: var(--input-border-radius, 0.25em);
      @apply --input-style;
      -webkit-background-clip: padding-box;
      background-clip: padding-box;
      -webkit-backface-visibility: hidden;
      -webkit-transform: rotate(0);
      -moz-transform: rotate(0);
      transform: rotate(0);
      margin: 0;
      letter-spacing: inherit;
    }

    select {
      color: var(--inner-input-color, inherit);
      background-color: var(--inner-input-background, transparent);
      border-width: var(--inner-input-border-width, thin);
      border-color: var(--inner-input-border-color, transparent);
      border-style: var(--inner-input-border-style, dotted);
      border-radius: var(--inner-input-border-radius, 0.1em);
    }

    /**
     * focus & hover
     */
     :host(:focus) #input,
     :host(:hover) #input,
     #input:hover,
     #input:focus,
     input:focus,
     input:hover {
       color: var(--input-focus-color, inherit);
       background-color: var(--input-focus-background, rgba(0,0,0,0.1));
       border-style: var(--input-focus-border-style, dotted);
       border-color: var(--input-focus-border-color, rgba(0,0,0,0.5));
       border-width: var(--input-border-width, thin);
       outline: none;
       @apply --input-focus;
     }

     select:focus,
     select:hover,
     button:focus,
     button:hover {
       color: var(--inner-input-focus-color, inherit);
       background-color: var(--inner-input-focus-background, rgba(0,0,0,0.1));
       border-style: var(--inner-input-focus-border-style, dotted);
       border-color: var(--inner-input-focus-border-color, rgba(0,0,0,0.2));
       border-width: var(--inner-input-border-width, thin);
       outline: none;
       @apply --input-focus;
     }

    /**
     * invalid
     */
    :host([invalid]) #input,
    :host([invalid]:hover) #input,
    :host([invalid]:focus) #input,
    #input:invalid,
    #input:invalid:hover,
    #input:invalid:focus {
      color: var(--input-invalid-color, inherit);
      background-color: var(--input-invalid-background, rgba(255,0,0,0.25));
      border-width: var(--input-border-width, thin);
      border-style: var(--input-invalid-border-style, dotted);
      border-color: var(--input-invalid-border-color, rgba(255,0,0,0.25));
      @apply --input-invalid;
    }

    /**
     * disabled
     */
    :host([disabled]) #input {
      color: var(--input-disabled-color, inherit);
      background-color: var(--input-disabled-background, transparent);
      font-style: var(--input-disabled-font-style, oblique);
      opacity: var(--input-disabled-opacity, 0.75);
      @apply --input-disabled;
      --input-placeholder-opacity: 1;
      pointer-events: none;
    }

    /**
     * reset button
     */
     #input .reset {
       display: block;
       cursor: pointer;
       border-width: var(--inner-input-border-width, thin);
       border-style: var(--inner-input-border-style, dotted);
       border-color: var(--inner-input-border-color, transparent);
       box-sizing: content-box;
       opacity: 0;
       color: inherit;
       background-color: transparent;
       transition-property: background, opacity;
       height: 1em;
       width: 1em;
       border-radius: 50%;
       padding: 0.15em;
       margin: 0 2px;
       align-self: center;
     }
     #input .reset > svg {
       height: 100%;
       width: 100%;
       fill: currentColor;
     }
     #input .reset:focus,
     #input .reset:hover {
       border-style: var(--inner-input-focus-border-style, dotted);
       outline: none;
     }
     #input .reset:focus,
     #input:hover .reset {
       opacity: 0.5;
     }
     #input .reset:hover {
       opacity: 1;
       color: var(--inner-input-focus-color, inherit);
       background-color: var(--inner-input-focus-background, rgba(0,0,0,0.1));
     }
     #input .reset:focus {
       border-color: var(--inner-input-focus-border-color, var(--inner-input-focus-background, rgba(0,0,0,0.2)));
     }
     :host([hide-reset-button]) #input .reset {
       display: none;
     }
    /**
     * placeholder
     */
    ::-webkit-input-placeholder,
    ::-moz-placeholder,
    :-moz-placeholder,
    ::placeholder {
      color: currentColor;
      opacity: var(--input-placeholder-opacity, 0.5);
      text-align: var(--input-placeholder-align, center);
    }

    :-ms-input-placeholder {
      color: currentColor !important;
      opacity: var(--input-placeholder-opacity, 0.5) !important;
    }

    ::-ms-input-placeholder {
      color: currentColor !important;
      opacity: var(--input-placeholder-opacity, 0.5) !important;
    }

    ::placeholder {
      @apply --input-placeholder;
    }

    :host([invalid]) ::-webkit-input-placeholder,
    :host([invalid]) ::-moz-placeholder,
    :host([invalid]) :-moz-placeholder,
    :host([invalid]) ::placeholder {
      color: var(--input-invalid-color, currentColor);
    }

    :host([invalid]) :-ms-input-placeholder {
      color: var(--input-invalid-color, currentColor) !important;
    }

    /**
     * selection
     */
    ::-moz-selection {
      color: inherit;
      background-color: transparent;
    }
    :hover::-moz-selection {
      color: var(--input-selection-color, inherit);
      background-color: var(--input-selection-background, rgba(255,255,255,0.5));
    }
    ::selection {
      color: inherit;
      background-color: transparent;
    }
    :hover::selection {
      color: var(--input-selection-color, inherit);
      background-color: var(--input-selection-background, rgba(255,255,255,0.5));
    }

    /**
     * browser specific style fixes
     */
    ::-moz-focus-inner {
      border-width: 0;
      border-style: none;
      padding: 0;
    }
    ::-moz-focusring {
      border-width: 0;
      border-style: none;
      color: transparent !important;
      text-shadow: 0 0 0 var(--input-focus-color, #000);
    }

    select:focus::-ms-value {
      background: transparent;
    }

    ::-ms-clear,
    ::-ms-expand {
      display: none;
    }

    ::-webkit-input-edit-text,
    ::-webkit-search-cancel-button,
    ::-webkit-clear-button {
      color: currentColor;
      align-self: center;
      vertical-align: middle;
      cursor: pointer;
    }
    
    ::-webkit-inner-spin-button,
    ::-webkit-outer-spin-button {
      -webkit-appearance: none;
    }

    ::-webkit-search-cancel-button,
    ::-webkit-clear-button {
      -webkit-appearance: none;
      height: 1em;
      width: 1em;
      opacity: 0;
      transition-property: opacity;
      transition-duration: var(--input-transition-duration, 250ms);
      transition-timing-function: var(--input-transition-timing-function, cubic-bezier(0.6, 1, 0.2, 1));
      background-image: url("data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20style%3D%22height%3A100%25%3B%22%3E%3Cg%3E%3Cpath%20d%3D%22M19%206.41L17.59%205%2012%2010.59%206.41%205%205%206.41%2010.59%2012%205%2017.59%206.41%2019%2012%2013.41%2017.59%2019%2019%2017.59%2013.41%2012z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E");
    }

    input:hover ::-webkit-search-cancel-button,
    input:hover ::-webkit-clear-button {
      opacity: 0.5;
    }

    ::-webkit-search-cancel-button:hover,
    ::-webkit-clear-button:hover {
      opacity: 1;
    }

    :host([hide-reset-button]) ::-webkit-search-cancel-button,
    :host([hide-reset-button]) ::-webkit-clear-button {
      display: none;
    }

    [invisible] {
      visibility: hidden;
    }
  </style>`;
