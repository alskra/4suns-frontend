import '@babel/polyfill';
import 'mdn-polyfills/CustomEvent';
import 'classlist-polyfill';
import 'ninelines-ua-parser';
import 'focus-visible';
import svg4everybody from 'svg4everybody';
import cssVars from 'css-vars-ponyfill';
import $ from 'jquery';
import '@stimulus/polyfills';

svg4everybody();
// cssVars();

window.$ = $;
window.jQuery = $;
