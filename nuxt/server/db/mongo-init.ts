import mongoose from 'mongoose';

export default async () => {
  try {
    // await mongoose.connect(process?.env?.MONGODB_URI || '');
    const runtimeConfig = useRuntimeConfig();
    await mongoose.connect(runtimeConfig.mongodbUri || '');
    console.log('mongo connection established');
  } catch (err) {
    console.error('mongo connection failed', err);
  }
};
