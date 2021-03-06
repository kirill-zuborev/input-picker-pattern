import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import { addListener, setTouchAction, removeListener } from '@polymer/polymer/lib/utils/gestures.js';
import { html, htmlLiteral } from '@polymer/polymer/lib/utils/html-tag.js';

import { style as inputPickerStyle } from './input-picker-shared-style.js';
import { style as dropdownTipStyle } from  './dropdown-tip-style.js';
import { FormElementMixin } from './form-element-mixin.js';
/**
 * mixin to extend an element with a test for an expected input type and implement a polyfill, when wanted or needed
 *
 * @appliesMixin Polymer.GestureEventListeners
 * @appliesMixin FormElementMixin
 *
 * @mixinFunction
 * @polymer
 */
export const InputPickerPattern = dedupingMixin( superClass => {

  return class extends GestureEventListeners(FormElementMixin(superClass)) {

    constructor() {
      super();
      this._onPickerTransitionEnd = this._onPickerTransitionEnd.bind(this);
      this._checkKeycode = this._checkKeycode.bind(this);
      this._stopPropagation = this._stopPropagation.bind(this);
      this.confirm = this.confirm.bind(this);
      this.cancel = this.cancel.bind(this);
      this.open = this.open.bind(this);
      this.close = this.close.bind(this);
      this.toggle = this.toggle.bind(this);
    }

    /**
     * the expected input type, that should be polyfilled, if not available
     * @type {string}
     */
    static get expectedNativeInputType() {
      return htmlLiteral`text`;
    }

    /**
     * test `expectedNativeInputType`, if that native input is supported
     * @type {string}
     */
    static get hasNative() {
      const testInput = document.createElement('input');
      testInput.setAttribute('type', `${this.expectedNativeInputType}`);
      return this._hasNative = (testInput.type == `${this.expectedNativeInputType}`);
    }

    static get template() {
      return html`
        ${this.styleTemplate}
        ${this.hasNative ? this.nativeTemplate : this.polyfillTemplate}
      `
    }

    /**
     * custom style content
     * @type {string}
     */
    static get styleTemplate() {
      return html`
        ${inputPickerStyle}
        ${dropdownTipStyle}
        ${super.styleTemplate || html``}
        <style>
          :host {
            display: inline-flex;
            position: relative;
          }
          #picker #buttons {
            display: inline-flex;
            position: relative;
            align-self: stretch;
            align-items: flex-end;
            justify-content: flex-end;
            padding-top: 0;
          }
        </style>
      `;
    }

    /**
     * template for native input is supported including the polyfill
     * @type {string}
     */
    static get nativeTemplate() {
      return html`
        ${this.nativeInputTemplate}
        ${this.polyfillTemplate}
      `
    }

    /**
     * template for native input element
     * @type {string}
     */
    static get nativeInputTemplate() {
      return html`
        <template is="dom-if" if="[[_computeShouldNative(native)]]" restamp>
          <input class="native" type="${this.expectedNativeInputType}" disabled$="[[disabled]]" readonly="[[disabled]]" required="[[required]]" value="{{confirmedValue::input}}">
        </template>
      `;
    }

    /**
     * template for polyfilled input and picker
     * @type {string}
     */
    static get polyfillTemplate() {
      return html`
        <div id="input" on-tap="open" hidden$="[[_computeShouldNative(native)]]">
          ${this.inputTemplate || html``}
        </div>
        ${this.pickerTemplate}
      `;
    }

    /**
     * template for the picker
     * @type {string}
     */
    static get pickerTemplate() {
      return html`
        <div id="picker" class="dropdown" tabindex="-1" hidden$="[[_computeShouldNative(native)]]">
          ${super.pickerTemplate || html``}
          <div id="buttons">
            ${this.buttonTemplate}
          <div>
        </div>`;
    }

    /**
     * template for control buttons
     * @type {string}
     */
    static get buttonTemplate() {
      return html`
        ${super.buttonTemplate || html``}
        <button id="confirm" class="icon" hidden$="[[disabled]]" on-tap="confirm" on-keydown="_stopPropagation">${this._iconConfirmTemplate}</button>
        <button id="cancel" class="icon" on-tap="cancel" on-keydown="_stopPropagation" hidden$="[[autoConfirm]]">${this._iconCloseTemplate}</button>
      `;
    }

    static get _iconCloseTemplate() {
      return html`<svg viewBox="0 0 24 24"><g><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></g></svg>`;
    }

    static get _iconConfirmTemplate() {
      return html`<svg viewBox="0 0 24 24"><g><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></g></svg>`;
    }

    static get properties() {
      return {
        /**
         * Set to `true` to use the native input, if it available
         */
        native: {
          type: Boolean,
          value: false
        },

        /**
         * Set to `true` to use the native input automatically on mobile devices, if it available
         */
        nativeOnMobile: {
          type: Boolean,
          observer: '_nativeOnMobileChanged'
        },

        /**
         * When `nativeOnMobile` is set to `true` this string is used to test the userAgent for a mobile device
         */
        mobileUserAgentTestString: {
          type: String,
          value: 'mM]obi|[tT]ablet|[aA]ndroid',
          observer: '_nativeOnMobileChanged'
        },

        /**
         * if `true` the picker is opened
         */
        opened: {
          type: Boolean,
          reflectToAttribute: true,
          value: false,
          notify: true
        },

        /**
         * The orientation against which to align the element horizontally
         * relative to the related input element. Possible values are "left", "right", "center", "auto". (comparable to `iron-fit-behavior` and its `no-overlap`-attribute)
         */
        horizontalAlign: {
          type: String,
          reflectToAttribute: true,
          value: 'auto'
        },

        /**
         * The orientation against which to align the element vertically
         * relative to the related input element. Possible values are "top", "bottom", "middle", "auto". (comparable to `iron-fit-behavior` and its `no-overlap`-attribute)
         */
        verticalAlign: {
          type: String,
          reflectToAttribute: true,
          value: 'auto'
        },

        /**
         * Set to `true` to make the input auto-confirming
         */
        autoConfirm: {
          type: Boolean,
          observer: '_autoConfirmChanged'
        },

        /**
         * Set to `true` to disable canceling the overlay with the ESC key.
         */
        noCancelOnEscKey: {
          type: Boolean,
          value: false
        },

        /**
         * Set to `true` to disable canceling the dropdown by clicking outside the picker.
         */
        noCancelOnOutsideClick: {
          type: Boolean,
          value: false
        },

        /**
         * Set to `true` to disable closing the dropdown when opening another picker.
         */
        noCloseOnPickerOpened: {
          type: Boolean,
          value: false
        },

        /**
         * Set to `true` to disable the tip of the picker
         */
        noTip: {
          type: Boolean,
          reflectToAttribute: true
        },

        /**
         * The confirmed value. When `auto-confirm` is not set, the value will only change, when you confirm.
         */
        confirmedValue: {
          type: Object,
          notify: true
        }

        /**
        * @event input-picker-opened
        * Fired when a picker has been opened.
        */

        /**
        * @event input-picker-closed
        * Fired after a picker has been closed.
        */
      }
    }

    static get observers() {
      return [
        '_confirmedValueChanged(confirmedValue)',
        '_openedChanged(opened)'
      ];
    }

    connectedCallback() {
      super.connectedCallback();
      this._addPickerTransitionEndListener();
      this._addKeyListener();
      if (this._isSet(this.value)) {
        this._setConfirmedValue();
      }
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this._removePickerTransitionEndListener();
      this._removeKeyListener();
    }

    _computeShouldNative(native) {
      return this._hasNative && native;
    }

    _addPickerTransitionEndListener() {
      if (!this.opened) {
        // enshure display style for the picker, so that the tabindex of the inner elements will be ignored
        this.$.picker.style.visibility = 'hidden';
        this.$.picker.style.display = 'none';
      }
      this.$.picker.addEventListener('transitionend', this._onPickerTransitionEnd, false);
    }

    _removePickerTransitionEndListener() {
      this.$.picker.removeEventListener('transitionend', this._onPickerTransitionEnd, false);
    }

    _onPickerTransitionEnd(e) {
      if (!this.opened) {
        const node = (e.path && e.path[0]) || e.target;
        if (node === this.$.picker) {
          // only end visibility if source event was emitted from the picker
          this.$.picker.style.visibility = 'hidden';
          this.$.picker.style.display = 'none';
        }
      }
    }

    _addCancelOnClickListener() {
      addListener(document, 'tap', this.cancel, false);
      setTouchAction(this, 'auto');
      // prevent when clicking on the picker that it is closes
      addListener(this, 'tap', this._stopPropagation, false);
    }

    _removeCancelOnClickListener() {
      removeListener(document, 'tap', this.cancel, false);
      removeListener(this, 'tap', this._stopPropagation, false);
    }

    _addCloseOnPickerOpenedListener() {
      document.addEventListener('input-picker-opened', this.close, false);
    }

    _removeCloseOnPickerOpenedListener() {
      document.removeEventListener('input-picker-opened', this.close, false);
    }

    _stopPropagation(e) {
      e && e.stopPropagation && e.stopPropagation();
      e && e.detail && e.detail.sourceEvent && e.detail.sourceEvent.stopPropagation && e.detail.sourceEvent.stopPropagation();
    }

    _addKeyListener() {
      this.addEventListener('keydown', this._checkKeycode, false);
    }

    _removeKeyListener() {
      this.removeEventListener('keydown', this._checkKeycode, false);
    }

    _nativeOnMobileChanged() {
      if (this.nativeOnMobile === undefined) {
        return;
      }
      const ua = window.navigator.userAgent,
        isMobile = new RegExp(this.mobileUserAgentTestString, 'i').test(ua);
      if (isMobile === true) {
        if (this.nativeOnMobile === true) {
          this.native = true;
        } else if (!this.native && this.nativeOnMobile === false) {
          this.native = false;
        }
      }
    }

    /**
     * key press event handler
     * @param  {[type]} e Event
     */
    _checkKeycode(e) {
      if (!e) {
        return;
      }
      if (e.keyCode === 27 && !this.noCancelOnEscKey) { // esc
        this.cancel();
        return;
      }
      if (e.keyCode === 13 || e.keyCode === 32) { // space || enter
        if (this.opened) {
          this.confirm();
        } else {
          this.open();
        }
        return;
      }
    }

    _openedChanged(opened) {
      if (!(this._computeShouldNative(this.native))) {
        if (opened) {
          this.$.picker.style.display = '';
          this.$.picker.style.visibility = '';
          // dispatch `input-picker-opened`-Event
          this.dispatchEvent(new (CustomEvent || Event)('input-picker-opened', { bubbles: true, detail: this }));
          // add outside click listener if needed
          if (!this.noCancelOnOutsideClick) {
            this._addCancelOnClickListener();
          }
          // add document listener for other picker opening if needed
          if (!this.noCloseOnPickerOpened) {
            this._addCloseOnPickerOpenedListener();
          }
          // this.$.picker.focus();
        } else {
          // dispatch `input-picker-closed`-Event
          this.dispatchEvent(new (CustomEvent || Event)('input-picker-closed', { bubbles: true, detail: this }));
          // remove outside click listener if needed
          this._removeCancelOnClickListener();
          this._removeCloseOnPickerOpenedListener();
        }
      }
    }

    validate() {
      if (this.valueIsSet) {
        this._setConfirmedValue();
      } else if (this._isSet(this.confirmedValue)) {
        this._resetValue();
      }
      return super.validate();
    }

    /**
     * open the picker
     */
    open(e) {
      this._stopPropagation(e);
      this.opened = true;
    }

    /**
     * close the picker
     */
    close() {
      this.opened = false;
    }

    /**
     * toggle the picker
     */
    toggle() {
      this.opened = !this.opened;
    }

    /**
     * confirms the input
     */
    confirm(e) {
      this._stopPropagation(e);
      if (!this.disabled) {
        this._setConfirmedValue();
      }
      this.close();
    }

    /**
     * cancels the input
     * @param  {[type]} e Event
     */
    cancel() {
      if (!this.disabled) {
        if (this.autoConfirm) {
          this.confirm();
        } else {
          this._resetValue();
        }
      }
      this.close();
    }

    _valueChanged(value) {
      super._valueChanged(value);
      if (this.autoConfirm) {
        this._setConfirmedValue();
      }
    }

    _confirmedValueChanged(confirmedValue) {
      if (this._isSet(confirmedValue) === false) {
        this.reset(confirmedValue);
      } else {
        this.value = confirmedValue;
      }
    }

    /**
     * reset confirmedValue and value
     * @param {Number} value value to set
     */
    reset(value) {
      this.setProperties({
        value: this.default || value,
        confirmedValue: this.default || value
      })
    }

    _setConfirmedValue() {
      this.confirmedValue = this.value;
    }

    _resetValue() {
      this.value = this.confirmedValue;
    }

    _autoConfirmChanged(autoConfirm) {
      if (autoConfirm && this._isSet(this.value)) {
        this._setConfirmedValue();
      }
    }

    _defaultChanged(def) {
      super._defaultChanged(def);
      if (this._isSet(this.value)) {
        this._setConfirmedValue();
      }
    }
  };
});
