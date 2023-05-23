import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        return cloudinary.config({
            cloud_name: 'dnxe9l57i',
            api_key: '991189484643755',
            api_secret:
                'e6ZiAtks5BeldzKgTew3IqC8KHk',
        });
    },
};