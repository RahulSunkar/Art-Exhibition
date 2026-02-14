# Content Management Guide

This website uses a **centralized data store** system that makes it easy to add, edit, and manage all content in one place. Content automatically appears in the correct pages with proper styling and structure.

## 📁 File Structure

```
/data/store.ts          ← Main content database (edit here!)
/types/content.ts       ← Type definitions (don't modify unless adding new fields)
/utils/getIcon.tsx      ← Icon helper (no need to edit)
```

## 🎯 Quick Start: How to Add Content

### 1. **Adding Artworks** (Gallery Page)

Open `/data/store.ts` and find the `artworks` array:

```typescript
export const artworks: Artwork[] = [
  {
    id: 10,  // Use next available ID
    title: 'Your Artwork Title',
    artist: 'Artist Name',
    year: '2026',
    medium: 'Photography',
    city: 'Mumbai',  // Chennai, Mumbai, or Goa
    theme: 'Memory',  // Memory, Identity, Place, Space, or Labor
    image: 'https://your-image-url.jpg',
    description: 'Short description of the artwork.',
    process: 'Detailed explanation of how it was created.'
  },
  // Add more artworks here...
];
```

**Result:** Artwork automatically appears in:
- Home page gallery preview
- Gallery page with filters
- Expandable detail modals

---

### 2. **Adding Films** (Films Page)

```typescript
export const films: Film[] = [
  {
    id: 3,
    title: 'Your Film Title',
    subtitle: 'A Tagline',
    description: 'Short description for previews',
    image: 'https://thumbnail.jpg',
    poster: 'https://large-poster.jpg',
    videoUrl: 'https://your-video-url.mp4',  // Optional
    duration: '45 min',
    year: '2026',
    director: 'Director Name',
    synopsis: 'Full film synopsis paragraph...',
    stills: [
      'https://still1.jpg',
      'https://still2.jpg',
      'https://still3.jpg',
    ],
    screenings: [
      { venue: 'Venue Name', city: 'City', date: 'Date' },
    ],
    themes: ['Memory', 'Displacement'],
    languages: ['Hindi', 'English'],
    credits: [
      { role: 'Direction', name: 'Name' },
      { role: 'Cinematography', name: 'Name' },
    ],
  },
];
```

**Result:** Film appears in:
- Home page films section
- Films page with full details
- Stills gallery
- Screening information

---

### 3. **Adding Products** (Products Page)

```typescript
export const products: Product[] = [
  {
    id: 7,
    name: 'Product Name',
    description: 'Short tagline',
    image: 'https://product-image.jpg',
    price: '₹1,500',  // Optional
    category: 'Books',  // Books, Merchandise, Prints, or Other
    details: 'Full product description...',
    dimensions: '10" × 12"',  // Optional
    materials: 'Paper, ink',  // Optional
  },
];
```

**Result:** Product appears in:
- Home page artifacts section
- Products page with full details
- Organized by category

---

### 4. **Adding People** (People Page)

```typescript
export const people: Person[] = [
  {
    id: 7,
    name: 'Person Name',
    role: 'Their Role',
    image: 'https://portrait.jpg',
    bio: 'Full biography paragraph...',
    location: 'City',  // Optional
    contribution: 'What they contributed',  // Optional
  },
];
```

---

### 5. **Adding Locations** (Voyage Page)

```typescript
export const locations: Location[] = [
  {
    id: 4,
    city: 'Kolkata',
    country: 'India',
    chapter: 'Chapter Four',
    status: 'Upcoming',  // Completed, Current, or Upcoming
    date: 'November - December 2026',
    description: 'Description of this exhibition chapter...',
    venues: ['Venue 1', 'Venue 2'],
    artworks: 180,  // Or 'TBA'
    images: [
      'https://location-image1.jpg',
      'https://location-image2.jpg',
    ],
  },
];
```

---

### 6. **Adding Events** (Ticker & Events)

```typescript
export const events: Event[] = [
  {
    id: 6,
    title: 'Event Name',
    location: 'Venue or Description',
    date: 'Date',
    type: 'Exhibition',  // Exhibition, Talk, Screening, Workshop, or Opening
  },
];
```

**Result:** Event appears in:
- Scrolling ticker at top of homepage
- Events listings

---

### 7. **Updating Videos**

```typescript
export const videos = {
  promoVideo: 'https://your-promo-video.mp4',  // Intro video on homepage
  heroVideo: 'https://your-hero-video.mp4',    // Background video on homepage
  aboutVideo: 'https://your-about-video.mp4',  // About page video
};
```

---

## 🎨 Customizing Process Steps

### Photography Process (Gallery Page)

```typescript
export const photographyProcess: ProcessStep[] = [
  {
    id: 1,
    icon: 'Camera',  // Any lucide-react icon name
    title: 'Step Title',
    description: 'Step description...',
    image: 'https://step-image.jpg',
  },
];
```

### Product Creation Process (Products Page)

```typescript
export const productProcess: ProcessStep[] = [
  // Same structure as photographyProcess
];
```

**Available Icons:** Camera, Users, Lightbulb, Film, Package, Palette, BookOpen, Scissors, etc. 
(See [Lucide Icons](https://lucide.dev/icons/) for full list)

---

## 📝 About Page Content

```typescript
export const aboutSections: AboutSection[] = [
  {
    id: 1,
    title: 'Section Title',
    content: [
      'Paragraph 1...',
      'Paragraph 2...',
      'Paragraph 3...',
    ],
    image: 'https://section-image.jpg',  // Optional
    order: 1,  // Display order
  },
];
```

---

## ✅ Best Practices

1. **IDs:** Always use the next sequential number
2. **Images:** Use high-quality images (min 800px width)
3. **Image URLs:** Use Unsplash or upload to your hosting
4. **Required Fields:** Fill all non-optional fields
5. **Quotes:** Use `\'` for apostrophes inside strings
6. **Testing:** After adding content, check the relevant page

---

## 🔧 Advanced: Adding New Content Types

If you need to add entirely new sections:

1. Add type definition in `/types/content.ts`
2. Create data array in `/data/store.ts`
3. Import in relevant page component
4. Map over data in JSX

Example:
```typescript
// In page component
import { myNewContent } from '../data/store';

// In JSX
{myNewContent.map(item => (
  <div key={item.id}>{item.title}</div>
))}
```

---

## 📦 Data Flow

```
/data/store.ts (you edit here)
      ↓
  Type-checked by TypeScript
      ↓
  Imported by page components
      ↓
  Automatically rendered with animations
```

---

## 🎯 Example: Adding Your First Artwork

1. Open `/data/store.ts`
2. Scroll to `export const artworks: Artwork[] = [`
3. Add after the last artwork:

```typescript
{
  id: 10,
  title: 'Coastal Memories',
  artist: 'Priya Sharma',
  year: '2026',
  medium: 'Digital Photography',
  city: 'Goa',
  theme: 'Memory',
  image: 'https://images.unsplash.com/photo-1587922546307-776227941871?w=800',
  description: 'Exploring the fading memories of Goan fishing communities.',
  process: 'Created using long exposure photography combined with archival images from local families.'
},
```

4. Save the file
5. Refresh your website
6. See your artwork on the Gallery page!

---

## 🆘 Troubleshooting

**Content not appearing?**
- Check for missing commas between items
- Verify all required fields are filled
- Check browser console for errors
- Ensure ID is unique

**TypeScript errors?**
- Make sure theme/category matches exact options
- Check spelling of field names
- Ensure all quotes are properly escaped

---

**That's it!** You now have full control over all content without touching page code. Just edit `/data/store.ts` and everything updates automatically. 🎉
