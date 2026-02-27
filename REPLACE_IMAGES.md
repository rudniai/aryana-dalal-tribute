# How to Replace Images with Actual Aryana Photos

This site currently uses placeholder images. Follow these steps to add real photos of Aryana:

## Step 1: Download Images from Instagram

1. Go to https://www.instagram.com/aryanadalal/
2. Browse her posts and save the best photos
3. Use a tool like:
   - [Insta-Download](https://insta-download.com/)
   - [DownloadGram](https://downloadgram.org/)
   - Or screenshot and crop

## Step 2: Save Images to Project

Create an `images` folder in the `public` directory:

```bash
mkdir -p public/images
```

Save your downloaded photos with descriptive names:
- `public/images/aryana-mumbai.jpg`
- `public/images/aryana-hst-show.jpg`
- `public/images/aryana-taste-test.jpg`
- etc.

## Step 3: Update Component Files

### FloatingImages.tsx

Replace the placeholder URLs in `/src/components/FloatingImages.tsx`:

```javascript
const images = [
  {
    src: "/images/aryana-1.jpg",  // Replace this
    alt: "Aryana in Mumbai",
    // ... rest of config
  },
  // ... more images
];
```

### Hero.tsx

Update the background image in `/src/components/Hero.tsx`:

```javascript
<div className="absolute inset-0 bg-[url('/images/aryana-hero.jpg')] bg-cover bg-center opacity-10" />
```

### PhotoGallery.tsx

Update the photo array in `/src/components/PhotoGallery.tsx`:

```javascript
const photos = [
  {
    url: "/images/aryana-photo-1.jpg",  // Replace this
    caption: "Slaying in Mumbai 💜",
    likes: "12.5K",
  },
  // ... more photos
];
```

## Step 4: Optimize Images (Optional)

For better performance, optimize images before uploading:

```bash
# Install sharp
npm install -g sharp-cli

# Optimize images
sharp -i public/images/*.jpg -o public/images/ --webp
```

## Step 5: Deploy

After replacing images:

```bash
git add .
git commit -m "Add actual Aryana photos"
git push
npx vercel --prod
```

## Image Recommendations

- **Dimensions**: Use high-quality images (at least 1000px width)
- **Format**: JPG or WebP for photos
- **File size**: Keep under 500KB per image
- **Variety**: Mix of:
  - Portrait shots
  - Action/candid moments
  - HST Show behind-the-scenes
  - Food/taste test moments
  - Fashion looks

## Current Placeholder Locations

1. **Floating Images** (6 images): `/src/components/FloatingImages.tsx`
2. **Hero Background** (1 image): `/src/components/Hero.tsx`
3. **Photo Gallery** (9 images): `/src/components/PhotoGallery.tsx`

**Total**: 16 images to replace
