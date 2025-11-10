import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  author: mongoose.Types.ObjectId;
  content: string;
  media: string[];
  ipfsHash: string;
  community?: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  reposts: mongoose.Types.ObjectId[];
  comments: mongoose.Types.ObjectId[];
  tips: mongoose.Types.ObjectId[];
  totalTips: number;
  isPremium: boolean;
  premiumPrice?: number;
  premiumToken?: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  visibility: 'public' | 'followers' | 'premium';
}

const PostSchema = new Schema<IPost>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
      maxlength: 10000,
    },
    media: [
      {
        type: String,
      },
    ],
    ipfsHash: {
      type: String,
      required: true,
      index: true,
    },
    community: {
      type: Schema.Types.ObjectId,
      ref: 'Community',
      index: true,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    reposts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    tips: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Transaction',
      },
    ],
    totalTips: {
      type: Number,
      default: 0,
    },
    isPremium: {
      type: Boolean,
      default: false,
    },
    premiumPrice: {
      type: Number,
      default: 0,
    },
    premiumToken: {
      type: String,
      default: 'USDC',
    },
    tags: [
      {
        type: String,
        lowercase: true,
      },
    ],
    visibility: {
      type: String,
      enum: ['public', 'followers', 'premium'],
      default: 'public',
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.index({ createdAt: -1 });
PostSchema.index({ tags: 1 });

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);

