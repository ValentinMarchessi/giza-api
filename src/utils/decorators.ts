import { SetMetadata } from '@nestjs/common';

// TODO: Move to env
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
