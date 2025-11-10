import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  walletAddress: string;
  username: string;
  displayName: string;
  bio: string;
  avatar: string;
  dateOfBirth?: Date;
  ensName?: string;
  lensHandle?: string;
  reputation: number;
  isProfileComplete: boolean;
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  posts: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isVerified: boolean;
  nftProfile?: string;
  subscriptionPrice?: number;
  subscriptionToken?: string;
  subscribers: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    walletAddress: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      default: '',
      maxlength: 500,
    },
    avatar: {
      type: String,
      default: '',
    },
    ensName: {
      type: String,
      default: '',
    },
    lensHandle: {
      type: String,
      default: '',
    },
    reputation: {
      type: Number,
      default: 0,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
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
    isVerified: {
      type: Boolean,
      default: false,
    },
    nftProfile: {
      type: String,
      default: '',
    },
    subscriptionPrice: {
      type: Number,
      default: 0,
    },
    subscriptionToken: {
      type: String,
      default: 'USDC',
    },
    subscribers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    dateOfBirth: {
      type: Date,
    },
    isProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

