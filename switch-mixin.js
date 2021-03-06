import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { addListener, removeListener } from '@polymer/polymer/lib/utils/gestures.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/**
 * Mixin to extend an element for binding switch button to increment properties. Button-switches should be of class `switch` and have the attributes `prop` and `step` that define the property to increment in the given step.
 * The element is required to be extended with `Polymer.GestureEventListeners`.
 *
 * @mixinFunction
 * @polymer
 *
 * @param {Object} superClass class to extend
 * @return {Object} extended class
 */
export const SwitchMixin = dedupingMixin( superClass => {

  return class extends superClass {

    constructor() {
      super();
      this.__increm = this.__increm.bind(this);
      this.__incremProp = this.__incremProp.bind(this);
      this._stopActiveIncremJob = this._stopActiveIncremJob.bind(this);
      this._checkKeycodeSwitch = this._checkKeycodeSwitch.bind(this);
    }

    static get properties() {
      return {
        /**
         * dwell time of incrementing inputs by the buttons in milliseconds. It is minimal 15 milliseconds.
         *
         * @type {number}
         */
        dwellTime: {
          type: Number,
          value: 50,
          observer: '_dwellTimeChanged'
        },
        /**
         * delay when incrementing inputs by the buttons in milliseconds. It is minimal 15 milliseconds.
         *
         * @type {number}
         */
        dwellDelay: {
          type: Number,
          value: 500,
          observer: '_dwellTimeChanged'
        },

        /**
         * class property of switches
         */
        _switchClassSelector: {
          type: String,
          value: 'switch'
        }
      }
    }

    static get _iconStepUpTemplate() {
      return html`<svg viewBox="0 0 24 24"><g><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></g></svg>`;
    }

    static get _iconStepDownTemplate() {
      return html`<svg viewBox="0 0 24 24"><g><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></g></svg>`;
    }

    static get _iconStepLeftTemplate() {
      return html`<svg viewBox="0 0 24 24"><g><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></g></svg>`;
    }

    static get _iconStepRightTemplate() {
      return html`<svg viewBox="0 0 24 24"><g><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></g></svg>`;
    }

    connectedCallback() {
      super.connectedCallback();
      this.addEventListener('blur', this._stopActiveIncremJob, {passive: true});
      this.addEventListener('contextmenu', this._stopActiveIncremJob, {passive: true});
      this._addSwitchListener();
    }

    disconnectedCallback() {
      super.disconnectedCallback();
      this.removeEventListener('blur', this._stopActiveIncremJob, {passive: true});
      this.removeEventListener('contextmenu', this._stopActiveIncremJob, {passive: true});
      this._removeSwitchListener();
    }

    _addSwitchListener() {
      // remove first all existing listeners
      this._removeSwitchListener();
      // wait a tick to consider asynchronous build up
      setTimeout(() => {
        const switchs = this.root.querySelectorAll('.switch');
        if (switchs) {
          Array.prototype.forEach.call(switchs, s => {
            addListener(s, 'down', this.__increm, false);
            addListener(s, 'up', this._stopActiveIncremJob, false);
            s.addEventListener('keydown', this._checkKeycodeSwitch, {passive: true});
            s.addEventListener('keyup', this._stopActiveIncremJob, {passive: true});
          })
        }
      }, 0)
    }

    _removeSwitchListener() {
      const switchs = this.root.querySelectorAll('.switch');
      if (switchs) {
        Array.prototype.forEach( s => {
          removeListener(s, 'down', this.__increm, false);
          removeListener(s, 'up', this._stopActiveIncremJob, false);
          s.removeEventListener('keydown', this._checkKeycodeSwitch, {passive: true});
          s.removeEventListener('keyup', this._stopActiveIncremJob, {passive: true});
        });
      }
    }

    _checkKeycodeSwitch(e) {
      if (e && (e.keyCode === 13 || e.keyCode === 32)) { // space or enter
        // call icrement once, because keyPressEvents are fired itself repeatedly while the key is pressed
        this.__increm(e, true);
        e.stopPropagation();
      } else {
        this._stopActiveIncremJob();
      }
    }

    __getEventTarget(e, classSelector) {
      if (e === undefined) {
        return;
      }
      if (e.path) {
        for (let i = 0; i < e.path.length; i++) {
          if (e.path[i].classList.contains(classSelector)) {
            return e.path[i];
            break;
          }
        }
      } else if (e.target && e.target.classList.contains(classSelector)) {
        return e.target;
      }
    }

    /**
     * increment property by being called by an Event on an `switch`-Node
     * @param  {Event} e      Event it was called on
     * @param  {Boolean} once if true, it doesn't setup an intervall to continue incrementing (e.g. keyPressEvents are fired itself repeatedly while the key is pressed)
     */
    __increm(e, once) {
      this._stopActiveIncremJob();
      const s = this.__getEventTarget(e, this._switchClassSelector);
      if (s === undefined ) {
        return;
      }

      const prop = s.getAttribute('prop');
      const sign = s.hasAttribute('invert') ? -1 : 1;
      const step = (+s.getAttribute('step') || 1) * sign;
      s.setAttribute('active', '');
      this._activeSwitch = s;
      if (isNaN(this[prop])) {
        this[prop] = this._getDefaultForProp(prop);
      } else if (this[prop] === 0 && step/this[prop] < 0) {
        // switch with negative zero
        const kindOfZero = this[prop];
        this[prop] = undefined;
        this[prop] = -kindOfZero;
      } else {
        this.__incremProp(prop, step);
      }
      if (!once) {
        this._activeDelayJob = setTimeout(function() {
          this._activeIncremJob = setInterval(this.__incremProp.bind(this, prop, step), +this.dwellTime || 15);
        }.bind(this), this.dwellDelay);
      }
    }

    __incremProp(prop, step) {
      this[prop] += step;
    }

    _getDefaultForProp(prop) {
      return 0;
    }

    _stopActiveIncremJob() {
      if (this._activeDelayJob) {
        clearTimeout(this._activeDelayJob);
        this._activeDelayJob = null;
      }
      if (this._activeIncremJob) {
        clearInterval(this._activeIncremJob);
        this._activeIncremJob = null;
      }
      if (this._activeSwitch) {
        this._activeSwitch.removeAttribute('active');
        this._activeSwitch = null;
      }
    }

    _dwellTimeChanged(dwellTime) {
      if (isNaN(dwellTime)) {
        this.dwellTime = 50;
      } else if (dwellTime < 15) {
        this.dwellTime = 15;
      }
    }

    _dwellDelayChanged(dwellDelay) {
      if (isNaN(dwellDelay)) {
        this.dwellTime = 500;
      } else if (dwellDelay < 15) {
        this.dwellTime = 15;
      }
    }
  };
});
