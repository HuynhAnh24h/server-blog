import { v2 as cloudinary } from 'cloudinary'
import { configDotenv } from 'dotenv'
configDotenv()
// Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_DINARY_NAME, 
        api_key: process.env.CLOUD_DINARY_API_KEY, 
        api_secret: process.env.CLOUD_DINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    export default cloudinary
