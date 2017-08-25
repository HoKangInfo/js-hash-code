"use strict";

const crypto = require('crypto');
const crc = require('crc');

module.exports = function(algo) {
    switch (algo) {
        case 'md2':
        case 'md5':
        case 'mdc2':
        case 'rmd160':
        case 'sha':
        case 'sha1':
        case 'sha224':
        case 'sha256':
        case 'sha384':
        case 'sha512':
            return function(str) {
                return crypto.createHash(algo).update(str).digest("hex");
            }
            break;

        case 'crc1':
        case 'crc8':
        case 'crc16':
        case 'crc24':
        case 'crc32':
            return function(str) {
                return crc[algo](str).toString(16);
            }
            break;

        case 'djb2':
            return function(str) {
                let hash = 5381;
                for (let i = 0; i < str.length; i++) {
                    hash = ((hash << 5) + hash) + str.charCodeAt(i);
                }
                return hash.toString(16);
            }
            break;

        case 'sdbm':
            return function(str) {
                let hash = 0;
                for (let i = 0; i < str.length; i++) {
                    hash = str.charCodeAt(i) + (hash << 6) + (hash << 16) - hash;
                }
                return hash.toString(16);
            }
            break;

        case 'lose':
            return function(str) {
                let hash = 0;
                for (let i = 0; i < str.length; i++) {
                    hash += str.charCodeAt(i);
                }
                return hash.toString(16);
            }
            break;

        default:
            return function(str) {
                let hash = 0;
                for (let i = 0; i < str.length; i++) {
                    hash = ((hash << 5) - hash) + str.charCodeAt(i);
                    hash = hash & hash;
                }
                return hash.toString(16);
            }
            break;
    }
}