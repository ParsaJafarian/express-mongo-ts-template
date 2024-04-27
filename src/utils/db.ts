import mongoose from 'mongoose';

function connectDB(): void {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((e) => {
      console.log(e);
      console.error('Could not connect');
      process.exit();
    });
}

function closeDB(): void {
  mongoose.connection.close();
  console.log('Database connection has been closed');
}

export { connectDB, closeDB };
