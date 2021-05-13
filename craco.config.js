const path = require('path');

module.exports = {
    webpack: {
        alias: {
            '@actions': path.resolve(__dirname, 'src/store/actions'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@data': path.resolve(__dirname, 'src/data'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@utils': path.resolve(__dirname, 'src/utils'),
        }
    },
    jest: {
        configure: {
            moduleNameMapper: {
                '^@actions(.*)$': '<rootDir>/src$1',
                '^@components(.*)$': '<rootDir>/src$1',
                '^@data(.*)$': '<rootDir>/src$1',
                '^@pages(.*)$': '<rootDir>/src$1',
                '^@utils(.*)$': '<rootDir>/src$1',
            }
        }
    }
}