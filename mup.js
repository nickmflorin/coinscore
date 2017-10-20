module.exports = {
  servers: {
    one: {
      "host": "52.26.33.248",
      "username": "ubuntu",
      "password":"password",
      "pem": "/Users/nickflorin/Desktop/CoinScore.pem",
    }
  },
  meteor: {
    name: 'CoinScore',
    path: '.',
    servers: {
      one: {},
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      PORT: 80,
      ROOT_URL: "http://ec2-52-26-33-248.us-west-2.compute.amazonaws.com",
      MONGO_URL:"mongodb://52.26.33.248:27017/meteor",
    },
    docker: {
      image: 'abernix/meteord:base',
    },
    // This is the maximum time in seconds it will wait for your app to start
    // Add 30 seconds if the server has 512mb of ram. And 30 more if you have binary npm dependencies.
    deployCheckWaitTime: 30,
    // Show progress bar while uploading bundle to server.  You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

 mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  }
};
