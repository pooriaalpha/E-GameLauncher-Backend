// src/models/Game.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IGame extends Document {
  title: string;
  description: string;
  price: number;
  discount?: number;
  releaseDate: Date;
  developer: string;
  publisher: string;
  genres: string[];
  tags: string[];
  platforms: string[];
  requirements: {
    minimum: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      storage: string;
    };
    recommended?: {
      os: string;
      processor: string;
      memory: string;
      graphics: string;
      storage: string;
    };
  };
  images: {
    cover: string;
    screenshots: string[];
  };
  downloadUrl?: string;
  installSize: number;
  version: string;
  rating: number;
  ratingCount: number;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const GameSchema = new Schema<IGame>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    discount: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    releaseDate: {
      type: Date,
      required: true
    },
    developer: {
      type: String,
      required: true
    },
    publisher: {
      type: String,
      required: true
    },
    genres: [{
      type: String,
      required: true
    }],
    tags: [{
      type: String
    }],
    platforms: [{
      type: String,
      required: true,
      enum: ['Windows', 'macOS', 'Linux']
    }],
    requirements: {
      minimum: {
        os: { type: String, required: true },
        processor: { type: String, required: true },
        memory: { type: String, required: true },
        graphics: { type: String, required: true },
        storage: { type: String, required: true }
      },
      recommended: {
        os: { type: String },
        processor: { type: String },
        memory: { type: String },
        graphics: { type: String },
        storage: { type: String }
      }
    },
    images: {
      cover: { type: String, required: true },
      screenshots: [{ type: String }]
    },
    downloadUrl: {
      type: String
    },
    installSize: {
      type: Number,
      required: true,
      min: 0
    },
    version: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    ratingCount: {
      type: Number,
      default: 0,
      min: 0
    },
    isPublished: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Create an index for searching
GameSchema.index({ 
  title: 'text', 
  developer: 'text', 
  publisher: 'text',
  genres: 'text',
  tags: 'text'
});

export default mongoose.model<IGame>('Game', GameSchema);