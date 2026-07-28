export type ReviewUploadFile = Pick<File, 'name' | 'size' | 'type'>;

export type ProductReviewFormErrors = {
  rating?: string;
  orderNumber?: string;
  text?: string;
  media?: string;
};

const MAX_MEDIA_FILES = 5;
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const MAX_VIDEO_SIZE = 50 * 1024 * 1024;
const IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']);
const VIDEO_EXTENSIONS = new Set(['mp4', 'webm', 'mov', 'm4v', 'ogv']);
const IMAGE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
]);
const VIDEO_MIME_TYPES = new Set([
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-m4v',
  'video/ogg',
]);

const getExtension = (name: string) => name.split('.').pop()?.toLowerCase() ?? '';

export function validateReviewMediaFiles(files: ReviewUploadFile[]): string | undefined {
  if (files.length > MAX_MEDIA_FILES) return 'mediaCount';

  for (const file of files) {
    const extension = getExtension(file.name);
    const isImage = IMAGE_EXTENSIONS.has(extension) || IMAGE_MIME_TYPES.has(file.type);
    const isVideo = VIDEO_EXTENSIONS.has(extension) || VIDEO_MIME_TYPES.has(file.type);

    if (!isImage && !isVideo) return 'mediaType';
    if (isImage && file.size > MAX_IMAGE_SIZE) return 'imageSize';
    if (isVideo && file.size > MAX_VIDEO_SIZE) return 'videoSize';
  }

  return undefined;
}

export function validateProductReviewForm(values: {
  rating: number;
  orderNumber: string;
  text: string;
  media?: ReviewUploadFile[];
}): ProductReviewFormErrors {
  return {
    rating: values.rating < 1 || values.rating > 5 ? 'rating' : undefined,
    orderNumber: values.orderNumber.trim() ? undefined : 'orderNumber',
    text: values.text.trim() ? undefined : 'text',
    media: validateReviewMediaFiles(values.media ?? []),
  };
}

export function hasProductReviewFormErrors(errors: ProductReviewFormErrors): boolean {
  return Boolean(errors.rating || errors.orderNumber || errors.text || errors.media);
}
