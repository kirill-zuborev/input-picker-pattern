import '@polymer/polymer/lib/elements/dom-module.js';
/*
`dropdown-style`
styles for used for a tip of the dropdown
*/
const dropdownTipStyle = document.createElement('dom-module');

dropdownTipStyle.innerHTML =
  `<template>
    <style>
      :host {
        --computed-dropdown-tip-size: var(--dropdown-tip-size, 6px);
        --computed-dropdown-tip-gap: var(--dropdown-tip-gap, 12px);
        --computed-dropdown-background: var(--dropdown-background, var(--input-picker-background, transparent));
      }
      .dropdown:after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        border-width: var(--computed-dropdown-tip-size);
        border-style: solid;
        border-color: transparent transparent transparent transparent;
        left: auto;
        top: auto;
        bottom: auto;
        right: auto;
      }

      :host([dynamic-align]) .dropdown:after,
      :host([no-tip]) .dropdown:after {
        display: none !important;
      }

      :host([vertical-align]) .dropdown:after,
      :host([vertical-align="auto"]) .dropdown:after,
      :host([vertical-align="top"]) .dropdown:after,
      :host([horizontal-align]) .dropdown:after,
      :host([horizontal-align="auto"]) .dropdown:after,
      :host([horizontal-align="left"]) .dropdown:after {
        top: 0;
        left: var(--computed-dropdown-tip-gap);
        border-bottom-color: var(--computed-dropdown-background);
        transform: translateY(-100%);
      }

      :host([horizontal-align="right"][vertical-align]) .dropdown:after {
        left: auto;
        right: var(--computed-dropdown-tip-gap);
      }

      :host([horizontal-align="center"][vertical-align]) .dropdown:after {
        left: 50%; right: auto;
        transform: translate(-50%, -100%);
      }

      :host([horizontal-align][vertical-align="bottom"]) .dropdown:after {
        top: auto; bottom: 0;
        border-bottom-color: transparent;
        border-top-color: var(--computed-dropdown-background);
        transform: translateY(100%);
      }

      :host([horizontal-align][vertical-align="middle"]) .dropdown:after {
        top: auto; bottom: 50%; right: 0; left: auto;
        transform: translate(100%, 50%);
        border-top-color: transparent;
        border-bottom-color: transparent;
        border-right-color: transparent;
        border-left-color: var(--computed-dropdown-background);
      }

      :host([horizontal-align="left"][vertical-align="middle"]) .dropdown:after {
        right: auto; left: 0;
        transform: translate(-100%, 50%);
        border-left-color: transparent;
        border-right-color: var(--computed-dropdown-background);
      }

      :host([horizontal-align="center"][vertical-align="middle"]) .dropdown:after {
        border: none;
      }
    </style>
  </template>`;

dropdownTipStyle.register('dropdown-tip-style');