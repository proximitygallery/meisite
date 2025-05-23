import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

// Define CORS allowed origins - adding additional variations
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://meisite.vercel.app',
  'https://www.meisite.vercel.app',
  'https://meisite-proximitygallery.vercel.app',
];

export default defineConfig({
  name: 'mei-portfolio',
  title: 'Mei Lenehan Portfolio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wdql4853',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  basePath: '/studio',
  
  // Improved CORS settings
  cors: {
    allowCredentials: true,
    allowOrigins: allowedOrigins,
    allowHeaders: ['Authorization', 'Content-Type'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  },
  
  // Authentication settings
  auth: {
    loginMethod: 'cookie',
    redirectOnSingle: true,
  },
  
  // API version
  apiVersion: '2023-01-01',
  
  plugins: [
    deskTool(),
    visionTool(),
  ],
  
  schema: {
    types: [
      {
        name: 'profile',
        title: 'Profile',
        type: 'document',
        fields: [
          {
            name: 'name',
            title: 'Name',
            type: 'string'
          },
          {
            name: 'bio',
            title: 'Bio',
            type: 'text'
          }
        ]
      },
      {
        name: 'design',
        title: 'Design Work',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string'
          },
          {
            name: 'author',
            title: 'Author',
            type: 'string'
          },
          {
            name: 'publisher',
            title: 'Publisher',
            type: 'string'
          },
          {
            name: 'year',
            title: 'Year',
            type: 'number'
          },
          {
            name: 'cover',
            title: 'Cover Image',
            type: 'image',
            options: {
              hotspot: true
            }
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text'
          },
          {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }]
          }
        ]
      },
      {
        name: 'artwork',
        title: 'Artwork',
        type: 'document',
        fields: [
          {
            name: 'title',
            title: 'Title',
            type: 'string'
          },
          {
            name: 'year',
            title: 'Year',
            type: 'number'
          },
          {
            name: 'medium',
            title: 'Medium',
            type: 'string'
          },
          {
            name: 'dimensions',
            title: 'Dimensions',
            type: 'string'
          },
          {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
              hotspot: true
            }
          },
          {
            name: 'description',
            title: 'Description',
            type: 'text'
          },
          {
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{ type: 'string' }]
          }
        ]
      }
    ]
  }
}); 