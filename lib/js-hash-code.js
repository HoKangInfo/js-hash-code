"use strict";

const util = require('util');
const hashAlgo = require('./hash-algo');

var isObject = function(value) {
    if (value == null) {
        return false;
    }

    if (Array.isArray(value)) {
        return true;
    }

    if (typeof value !== 'object') {
        return false;
    }

    if (value.toString() !== '[object Object]') {
        return false;
    }

    return true;
}

var valueToString = function(value, set) {
    return (Object.prototype.toString.call(value)) +
        ((value == null) ? util.inspect(value) : value.toString());
}

var objectToString = function(obj, set) {
    let ary = [];
    for (let key in obj) {
        ary.push(((set && +key >= 0) ? '' : key) + toString(obj[key], set));
    }

    return (set ? '' : Object.prototype.toString.call(obj)) + ary.sort();
}

var toString = function(obj, set) {
    return isObject(obj) ? '@' + objectToString(obj, set) : valueToString(obj, set);
}

var mask = function(str){
    let hash = '';
    for (let i = 0; i < str.length; i++) {
        hash += str.charCodeAt(i).toString(16);
    }
    return hash;
}

var hash = function(obj, algo, set) {
    let custom = (typeof algo == 'function');
    algo = (algo == null || typeof algo == 'string') ? hashAlgo(algo) : algo;
    if (typeof algo != 'function') {
        set = algo;
        algo = hashAlgo();
    }

    if (typeof set != 'boolean') {
        set = false;
    }

    let str = toString(obj, set);
    return algo(custom? mask(str): str);
}

module.exports = hash;