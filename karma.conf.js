module.exports = function (config) {
    config.set({
        basePath: './src',
        frameworks: ['jasmine'],
        files: [
            'https://code.jquery.com/jquery-3.5.1.min.js',
            'https://cdnjs.cloudflare.com/ajax/libs/dustjs-linkedin/2.7.5/dust-full.min.js',
            'test-setup.js',
            'renderer.js',
            {pattern: '**/*.dust', included: false, served: true },
            '**/*.spec.js'
        ],
        exclude: [],
        preprocessors: {
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['ChromeHeadless'],
        singleRun: false,
        concurrency: Infinity,
        mime: {
            'application/html': ['dust']
        },
        proxies: {
            '/templates/': '/base/templates/'
        }
    })
}
