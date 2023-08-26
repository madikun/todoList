import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
  configSevice: ConfigService,
): Promise<MongooseModuleOptions> => {
  const MONGO_USER = configSevice.get('MONGO_USER');
  const MONGO_PASSWORD = configSevice.get('MONGO_PASSWORD');
  const MONGO_HOST = configSevice.get('MONGO_HOST');
  const MONGO_PORT = configSevice.get('MONGO_PORT');
  const MONGO_DB_NAME = configSevice.get('MONGO_DB_NAME');

  return {
    uri: getMongoUri(MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DB_NAME),
    ...getMongoOptions(),
  };
};

const getMongoUri = (
  user: string,
  password: string,
  host?: string,
  port?: string,
  dbName?: string,
) => {
  const hostString = host || '127.0.0.1';
  const portString = port || '27017';
  const dbNameString = dbName || 'mongo';
  return `mongodb://${user}:${password}@${hostString}:${portString}/${dbNameString}`;
};

const getMongoOptions = () => {
  return {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
};
