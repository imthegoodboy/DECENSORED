import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Post from '@/models/Post';
import Community from '@/models/Community';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectDB();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Create dummy users with emoji avatars
    const emojis = ['🥺', '🤕', '😭', '😗', '😂'];
    const dummyUsers = [
      { username: 'alice_crypto', displayName: 'Alice Crypto', bio: 'Blockchain enthusiast | DeFi trader | NFT collector', walletAddress: '0x1111111111111111111111111111111111111111', emoji: emojis[0] },
      { username: 'bob_web3', displayName: 'Bob Web3', bio: 'Web3 developer | Building the future of the internet', walletAddress: '0x2222222222222222222222222222222222222222', emoji: emojis[1] },
      { username: 'charlie_defi', displayName: 'Charlie DeFi', bio: 'DeFi researcher | Yield farmer | Smart contract auditor', walletAddress: '0x3333333333333333333333333333333333333333', emoji: emojis[2] },
      { username: 'diana_nft', displayName: 'Diana NFT', bio: 'NFT artist | Digital creator | Metaverse explorer', walletAddress: '0x4444444444444444444444444444444444444444', emoji: emojis[3] },
      { username: 'eve_blockchain', displayName: 'Eve Blockchain', bio: 'Blockchain consultant | Crypto educator | Community builder', walletAddress: '0x5555555555555555555555555555555555555555', emoji: emojis[4] },
      { username: 'frank_eth', displayName: 'Frank ETH', bio: 'Ethereum maximalist | Smart contract developer', walletAddress: '0x6666666666666666666666666666666666666666', emoji: emojis[0] },
      { username: 'grace_dao', displayName: 'Grace DAO', bio: 'DAO contributor | Governance expert | Community organizer', walletAddress: '0x7777777777777777777777777777777777777777', emoji: emojis[1] },
      { username: 'henry_crypto', displayName: 'Henry Crypto', bio: 'Crypto trader | Technical analyst | Market researcher', walletAddress: '0x8888888888888888888888888888888888888888', emoji: emojis[2] },
    ];

    const createdUsers = [];
    for (const userData of dummyUsers) {
      let user = await User.findOne({ walletAddress: userData.walletAddress });
      if (!user) {
        user = await User.create({
          username: userData.username,
          displayName: userData.displayName,
          bio: userData.bio,
          walletAddress: userData.walletAddress,
          avatar: (userData as any).emoji || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.displayName)}&background=0ea5e9&color=fff`,
          reputation: Math.floor(Math.random() * 100),
          isProfileComplete: true,
          dateOfBirth: new Date(1990 + Math.floor(Math.random() * 20), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)),
        });
      }
      createdUsers.push(user);
    }

    // Create Tech community
    let techCommunity = await Community.findOne({ slug: 'tech' });
    if (!techCommunity) {
      techCommunity = await Community.create({
        name: 'Technology',
        slug: 'tech',
        description: 'Discuss the latest in technology, programming, blockchain, and innovation. Share your projects, ask questions, and connect with fellow tech enthusiasts.',
        avatar: 'https://ui-avatars.com/api/?name=Tech&background=0ea5e9&color=fff',
        banner: '',
        creator: createdUsers[0]._id,
        members: createdUsers.map(u => u._id),
        moderators: [createdUsers[0]._id],
        posts: [],
        rules: [
          'Be respectful to all members',
          'No spam or self-promotion',
          'Keep discussions relevant to technology',
          'Share knowledge and help others',
        ],
      });
    }

    // Create dummy posts
    const dummyPosts = [
      { content: 'Just discovered an amazing new DeFi protocol! The APY is insane. Anyone else tried it? 🚀', author: 0, community: techCommunity._id, tags: ['defi', 'crypto'] },
      { content: 'Building my first smart contract on Ethereum. The learning curve is steep but so rewarding! Any tips for a beginner?', author: 1, community: techCommunity._id, tags: ['ethereum', 'smart-contracts', 'web3'] },
      { content: 'The future of social media is decentralized. No more censorship, no more data harvesting. We own our content! 💪', author: 2, community: techCommunity._id, tags: ['web3', 'decentralization'] },
      { content: 'Minted my first NFT collection today! The gas fees were brutal but the community support made it worth it. Check it out!', author: 3, tags: ['nft', 'art'] },
      { content: 'DAO governance is the future of organizations. We\'re seeing real democracy in action. What do you think?', author: 4, community: techCommunity._id, tags: ['dao', 'governance'] },
      { content: 'Ethereum 2.0 is going to change everything. Lower fees, faster transactions, better scalability. Can\'t wait!', author: 5, community: techCommunity._id, tags: ['ethereum', 'blockchain'] },
      { content: 'Just joined a new DAO focused on climate action. Using blockchain to track carbon credits. This is the future! 🌍', author: 6, community: techCommunity._id, tags: ['dao', 'climate', 'blockchain'] },
      { content: 'Market analysis: BTC is showing strong support at $40k. Bullish pattern forming. Not financial advice! 📈', author: 7, tags: ['crypto', 'trading'] },
      { content: 'Started learning Solidity last week. The syntax is similar to JavaScript but the concepts are completely different. Loving it!', author: 1, community: techCommunity._id, tags: ['solidity', 'programming'] },
      { content: 'Cross-chain bridges are getting better every day. The interoperability is amazing. Which bridge do you prefer?', author: 0, community: techCommunity._id, tags: ['blockchain', 'defi'] },
      { content: 'NFT marketplace just launched! Check out the amazing collection from digital artists around the world. Support creators! 🎨', author: 3, tags: ['nft', 'art', 'marketplace'] },
      { content: 'Smart contract security is crucial. Always audit your code before deploying. One bug can cost millions! 🔒', author: 1, community: techCommunity._id, tags: ['security', 'smart-contracts'] },
      { content: 'The metaverse is expanding rapidly. Virtual land prices are going crazy. Are we early or is this a bubble?', author: 3, tags: ['metaverse', 'nft'] },
      { content: 'Layer 2 solutions are solving Ethereum\'s scalability issues. Arbitrum, Optimism, Polygon - which one do you use?', author: 5, community: techCommunity._id, tags: ['ethereum', 'layer2', 'scalability'] },
      { content: 'Just deployed my first dApp! The feeling of seeing your code running on the blockchain is incredible. Web3 is the future! 🎉', author: 1, community: techCommunity._id, tags: ['dapp', 'web3', 'blockchain'] },
    ];

    const createdPosts = [];
    for (const postData of dummyPosts) {
      const author = createdUsers[postData.author];
      const ipfsHash = `ipfs_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      
      const post = await Post.create({
        author: author._id,
        content: postData.content,
        ipfsHash,
        community: postData.community || undefined,
        tags: postData.tags || [],
        visibility: 'public',
        likes: [],
        reposts: [],
        comments: [],
        totalTips: 0,
      });

      // Add some random likes
      const numLikes = Math.floor(Math.random() * 8) + 1;
      const likers = createdUsers.sort(() => 0.5 - Math.random()).slice(0, numLikes);
      post.likes = likers.map(u => u._id);
      await post.save();

      // Add post to user's posts array
      author.posts.push(post._id);
      await author.save();

      // Add post to community if it has one
      if (postData.community) {
        techCommunity.posts.push(post._id);
      }

      createdPosts.push(post);
    }

    await techCommunity.save();

    res.status(200).json({
      message: 'Dummy data created successfully',
      users: createdUsers.length,
      posts: createdPosts.length,
      communities: 1,
    });
  } catch (error: any) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'Failed to seed data', details: error.message });
  }
}

