import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  from: mongoose.Types.ObjectId;
  to: mongoose.Types.ObjectId;
  amount: number;
  token: string;
  fromChain: string;
  toChain: string;
  sideshiftId?: string;
  type: 'tip' | 'subscription' | 'ad' | 'dao_payout';
  post?: mongoose.Types.ObjectId;
  status: 'pending' | 'completed' | 'failed';
  txHash?: string;
  createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    from: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    fromChain: {
      type: String,
      required: true,
    },
    toChain: {
      type: String,
      required: true,
    },
    sideshiftId: {
      type: String,
      index: true,
    },
    type: {
      type: String,
      enum: ['tip', 'subscription', 'ad', 'dao_payout'],
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    txHash: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

TransactionSchema.index({ createdAt: -1 });

export default mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);

