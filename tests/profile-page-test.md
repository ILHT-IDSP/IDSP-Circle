# Test Script for Profile Pages

## Setup

1. Start the development server: `npm run dev`
2. Create two test user accounts (if they don't already exist)
    - User 1: Test account for yourself
    - User 2: Another test account to test the follow/unfollow functionality

## Test Cases

### 1. Basic Navigation

-   [ ] Navigate to your own profile using `/profile` - should redirect to `/{your-username}`
-   [ ] Navigate directly to `/{your-username}` - should show your profile with "Edit Profile" button
-   [ ] Navigate to another user's profile `/{other-username}` - should show their profile with "Follow" button

### 2. Own Profile Functionality

-   [ ] Verify "Edit Profile" button appears on your own profile
-   [ ] Verify Settings gear icon appears on your own profile
-   [ ] Click on profile image - upload dialog should appear
-   [ ] Click "Edit Profile" - should navigate to edit profile page

### 3. Other User Profile Functionality

-   [ ] Verify "Follow" button appears on other user profiles you're not following
-   [ ] Click "Follow" - button should change to "Following"
-   [ ] Click "Following" - unfollow confirmation should appear
-   [ ] Confirm unfollow - button should change back to "Follow"

### 4. Profile Information

-   [ ] Verify profile shows correct username
-   [ ] Verify profile shows correct name (if set)
-   [ ] Verify profile shows correct bio (if set)
-   [ ] Verify circles count is correct
-   [ ] Verify albums count is correct
-   [ ] Verify followers count updates when you follow/unfollow

### 5. Navigation Bar

-   [ ] Click profile icon in nav bar - should navigate to your own profile page

## Notes

-   If any errors occur, note the error messages and page state
-   If design issues are found, take screenshots for reference
