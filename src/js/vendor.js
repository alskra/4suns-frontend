import '@babel/polyfill';
import 'mdn-polyfills/CustomEvent';
import 'classlist-polyfill';
import '@stimulus/polyfills';
import 'ninelines-ua-parser';
import 'focus-visible';
import svg4everybody from 'svg4everybody';
import objectFitImages from 'object-fit-images';
import $ from 'jquery';

svg4everybody();
objectFitImages(null, {watchMQ: true});

window.$ = $;
window.jQuery = $;
