import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(`mongodb://localhost:27017/`);
        console.log(`MongoDb connected : ${conn.connection.host}`)
    }
    catch (error) {
        console.log(`errro while connection with database ${error.message}`)
        process.exit(1);
    }
}
export default connectDB