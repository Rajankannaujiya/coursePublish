import {z} from 'zod';

const profileIdSchema = z.string().uuid().nonempty("Profile id cannot be empty");

export {profileIdSchema}