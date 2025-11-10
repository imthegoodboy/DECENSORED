import mongoose, { Schema, Document } from 'mongoose';

export interface ICommunity extends Document {
  name: string;
  slug: string;
  description: string;
  avatar: string;
  banner: string;
  creator: mongoose.Types.ObjectId;
  members: mongoose.Types.ObjectId[];
  moderators: mongoose.Types.ObjectId[];
  posts: mongoose.Types.ObjectId[];
  rules: string[];
  daoAddress?: string;
  daoToken?: string;
  isTokenGated: boolean;
  requiredToken?: string;
  requiredTokenAmount?: number;
  treasury: number;
  treasuryToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const CommunitySchema = new Schema<ICommunity>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    avatar: {
      type: String,
      default: '',
    },
    banner: {
      type: String,
      default: '',
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    moderators: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    rules: [
      {
        type: String,
      },
    ],
    daoAddress: {
      type: String,
      default: '',
    },
    daoToken: {
      type: String,
      default: '',
    },
    isTokenGated: {
      type: Boolean,
      default: false,
    },
    requiredToken: {
      type: String,
      default: '',
    },
    requiredTokenAmount: {
      type: Number,
      default: 0,
    },
    treasury: {
      type: Number,
      default: 0,
    },
    treasuryToken: {
      type: String,
      default: 'USDC',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Community || mongoose.model<ICommunity>('Community', CommunitySchema);

