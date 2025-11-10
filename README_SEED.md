# How to Seed Dummy Data

## Quick Start

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Visit the seed page:**
   Open your browser and go to: `http://localhost:3000/seed`

3. **Click "Seed Dummy Data" button**

4. **Wait for success message**

5. **Visit the home page:**
   Go to `http://localhost:3000` to see the dummy posts in your feed!

## What Gets Created

- **8 Dummy Users:**
  - alice_crypto, bob_web3, charlie_defi, diana_nft, eve_blockchain, frank_eth, grace_dao, henry_crypto
  - Each with unique profile, bio, and avatar

- **15 Dummy Posts:**
  - Various posts about crypto, DeFi, NFTs, blockchain, etc.
  - Some posts have random likes already
  - Posts are linked to users and the tech community

- **1 Tech Community:**
  - Name: "Technology"
  - Slug: "tech"
  - Description about tech discussions
  - Rules and guidelines
  - All dummy users are members

## Features You Can Test

1. **View Posts:**
   - Go to home page to see all posts
   - Posts show author, content, likes, comments

2. **Like Posts:**
   - Click the heart icon on any post
   - Like count updates immediately
   - Stored in MongoDB

3. **Comment on Posts:**
   - Click the comment icon
   - Write a comment
   - Comments are stored in MongoDB
   - View all comments in the modal

4. **View Trending:**
   - Go to `/trending` page
   - See posts sorted by engagement

5. **View Communities:**
   - Go to `/communities` page
   - Click on "Technology" community
   - See all posts in that community

6. **View User Profiles:**
   - Click on any user's name or avatar
   - See their profile and all their posts

7. **Search:**
   - Use the search bar in navbar
   - Search for users, posts, or communities

## Notes

- The seed script is idempotent - you can run it multiple times safely
- It won't create duplicate users (checks by wallet address)
- It won't create duplicate communities (checks by slug)
- Each run creates new posts (so you can accumulate more posts)

## Troubleshooting

If the seed page doesn't work:
1. Make sure MongoDB is running and connected
2. Check your `.env` file has `MONGODB_URI` set
3. Check browser console for errors
4. Check server logs for errors

