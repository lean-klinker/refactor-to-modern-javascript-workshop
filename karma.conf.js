// Karma configuration
// Generated on Tue May 05 2020 13:48:54 GMT-0500 (Central Daylight Time)

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'src/change-maker.js',
            'src/coin-factory.js',
            'src/vending-machine.js',
            'src/**/*.spec.js'
        ],
        exclude: [],
        preprocessors: {},
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: false,
        concurrency: Infinity
    })
}
