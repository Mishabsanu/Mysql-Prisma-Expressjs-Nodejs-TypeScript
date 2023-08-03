import dotenv from "dotenv";
dotenv.config();

const getConfigs = () => {
  return {
    morgan: {
      logStyle: "dev",
    },
    cors: {
      origin: ["*"],
      credentials: true,
    },
    server: {
      name: "USER",
      port: process.env.PORT || 2000,
      baseURl: "/",
      serverId: "1",
      appBaseUrl: "/auth",
    },
    SQL: {
      url: process.env.DATABASE_URL,
      reconnectInterval: 10000,
      autoReconnect: true,
      options: {
        autoIndex: false,
        useNewUrlParser: true,
        keepAlive: true,
        connectTimeoutMS: 1000,
      },
    },
  };
};

export default getConfigs;
