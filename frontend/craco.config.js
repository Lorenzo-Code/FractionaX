const path = require('path');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.output = {
                ...webpackConfig.output,
                path: path.resolve(__dirname, 'build'), // Output in frontend/build
                publicPath: '/static/', // Match Django's STATIC_URL
                filename: 'static/js/[name].[contenthash:8].js', // JavaScript files
                chunkFilename: 'static/js/[name].[contenthash:8].chunk.js', // Chunk files
            };

            // Place CSS and media files inside static/
            webpackConfig.module.rules.forEach((rule) => {
                if (rule.oneOf) {
                    rule.oneOf.forEach((one) => {
                        if (one.test && one.test.toString().includes('css')) {
                            if (one.use) {
                                one.use.forEach((loader) => {
                                    if (loader.loader && loader.loader.includes('file-loader')) {
                                        loader.options.name = 'static/css/[name].[contenthash:8].[ext]';
                                    }
                                });
                            }
                        }

                        if (one.test && one.test.toString().includes('image')) {
                            if (one.use) {
                                one.use.forEach((loader) => {
                                    if (loader.loader && loader.loader.includes('file-loader')) {
                                        loader.options.name = 'static/media/[name].[contenthash:8].[ext]';
                                    }
                                });
                            }
                        }
                    });
                }
            });

            return webpackConfig;
        },
    },
};
