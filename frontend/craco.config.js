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

            // Add Webpack rule for handling image files
            webpackConfig.module.rules.push({
                test: /\.(png|jpe?g|gif)$/i, // Match image file types
                type: 'asset/resource',     // Use Webpack's asset/resource type
                generator: {
                    filename: 'static/media/[name].[contenthash:8][ext]', // Define output path and name
                },
            });

            // Add Webpack rule for handling video files
            webpackConfig.module.rules.push({
                test: /\.(mp4|webm|ogg)$/i, // Match video file types
                type: 'asset/resource',     // Use Webpack's asset/resource type
                generator: {
                    filename: 'static/media/[name].[contenthash:8][ext]', // Define output path and name
                },
            });

            return webpackConfig;
        },
    },
};
