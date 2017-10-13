module.exports = {
  servers: {
    one: {
      "host": "54.191.111.240",
      "username": "ubuntu",
      "password":"password",
      "pem": "/Users/nickflorin/Desktop/coin.pem",
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
      ROOT_URL: "http://ec2-54-191-111-240.us-west-2.compute.amazonaws.com",
      MONGO_URL:"mongodb://54.191.111.240:27017/meteor",
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
