import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RiSearchLine, RiBellLine, RiMapPin2Line } from 'react-icons/ri';
import Layout from '../components/Layout';
import { useUser } from '../context/UserContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { userType } = useUser();
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: {
        name: 'Shikhar Dhawan',
        avatar: '/avatars/shikhar.jpg',
        time: '38 mins ago'
      },
      content: 'Sharing my latest training and match highlights! Grateful for the journey and teammates who push me forward!',
      images: ['src/assets/Blog-Post-Images-1080x675.png', 'src/assets/paris-olympics-athletics.avif'],
      likes: '7.6K',
      comments: [
        {
          user: { name: 'Suga', avatar: '/avatars/suga.jpg' },
          content: 'Your hard work is paying off! Keep pushing forward!!',
          likes: '6'
        },
        {
          user: { name: 'Tharu', avatar: '/avatars/tharu.jpg' },
          content: "You're my favorite athlete! Keep inspiring us!",
          likes: '2'
        },
        {
          user: { name: 'Sanju', avatar: '/avatars/sanju.jpg' },
          content: 'Same here!!',
          likes: '2'
        }
      ]
    }
  ]);

  const handleProfileClick = () => {
    if (userType === 'ATHLETE') {
      navigate('/profile');
    }
  };

  return (
    <Layout>
      <div>
        {/* Header */}
        <header className="bg-white py-4 px-8 flex items-center justify-between border-b sticky top-0 z-20">
          <h1 className="text-xl font-semibold text-[#2D3748]">Dashboard</h1>
          <div className="flex items-center gap-6">
            <div className="relative">
              <RiSearchLine className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg w-72 focus:outline-none focus:ring-1 focus:ring-yellow-400 text-sm"
              />
            </div>
            <button className="text-gray-600 hover:text-gray-800">
              <RiBellLine className="w-6 h-6" />
            </button>
            <div 
              className={`flex items-center gap-3 ${userType === 'ATHLETE' ? 'cursor-pointer' : ''}`}
              onClick={handleProfileClick}
            >
              <img
                src="src\assets\pngtree-user-flat-yellow-color-rounded-vector-icon-yellow-customer-avatar-vector-png-image_19496060-removebg-preview.png"
                alt="Profile"
                className="w-9 h-9 rounded-full border-2 border-white shadow-sm"
              />
              <div>
                <p className="text-sm font-medium">ABC</p>
                <p className="text-xs text-gray-500">Profile</p>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="p-8 flex gap-8">
          {/* Feed */}
          <div className="flex-1 max-w-2xl">
            {/* Create Post */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex gap-4">
                <img
                  src="src\assets\pngtree-user-flat-yellow-color-rounded-vector-icon-yellow-customer-avatar-vector-png-image_19496060-removebg-preview.png"
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <input
                  type="text"
                  placeholder="What's on your mind?"
                  className="flex-1 bg-gray-50 rounded-lg px-4 focus:outline-none focus:ring-1 focus:ring-yellow-400"
                />
              </div>
              <div className="flex gap-4 mt-4 border-t pt-4">
                <button className="flex-1 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 py-2 rounded-lg">
                  Live Video
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 py-2 rounded-lg">
                  Image/Video
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 text-gray-600 hover:bg-gray-50 py-2 rounded-lg">
                  Activity
                </button>
              </div>
            </div>

            {/* Posts */}
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm p-4 mb-6">
                {/* Post Header */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src="src\assets\pngtree-user-flat-yellow-color-rounded-vector-icon-yellow-customer-avatar-vector-png-image_19496060-removebg-preview.png"
                    alt={post.user.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{post.user.name}</p>
                    <p className="text-sm text-gray-500">{post.user.time}</p>
                  </div>
                </div>

                {/* Post Content */}
                <p className="mb-4 text-gray-800">{post.content}</p>

                {/* Post Images */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {post.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt="Post"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  ))}
                </div>

                {/* Post Stats */}
                <div className="flex items-center justify-between py-2 border-t border-b mb-4">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400">❤️</span>
                    <span className="text-sm text-gray-600">{post.likes} Likes</span>
                  </div>
                  <span className="text-sm text-gray-600">{post.comments.length} Comments</span>
                </div>

                {/* Comments */}
                <div className="space-y-4">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="flex gap-3">
                      <img
                        src="src\assets\pngtree-user-flat-yellow-color-rounded-vector-icon-yellow-customer-avatar-vector-png-image_19496060-removebg-preview.png"
                        alt={comment.user.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="font-medium text-sm">{comment.user.name}</p>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                          <span>{comment.likes} Likes</span>
                          <button>Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="flex gap-3 mt-4">
                  <img
                    src="src\assets\pngtree-user-flat-yellow-color-rounded-vector-icon-yellow-customer-avatar-vector-png-image_19496060-removebg-preview.png"
                    alt="Profile"
                    className="w-8 h-8 rounded-full"
                  />
                  <input
                    type="text"
                    placeholder="Type your comment here..."
                    className="flex-1 bg-gray-50 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-yellow-400"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="w-80 space-y-6">
            {/* Health Center Map */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <RiMapPin2Line className="text-yellow-400" />
                Health Center
              </h2>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="src\assets\Screenshot 2025-03-28 113823.png"
                  alt="Health Centers Map"
                  className="w-full h-48 object-cover"
                />
              </div>
              <button className="w-full mt-4 bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500">
                Visit
              </button>
            </div>

            {/* AI Assistant */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-lg font-semibold">AI Assistant</h2>
                <span className="text-xs text-gray-500">Wed 8:21 AM</span>
              </div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    🤖
                  </div>
                  <div className="flex-1">
                    <p className="text-sm bg-gray-50 rounded-lg p-3">
                      Hello, I'm AI Ass... How can I help you today?
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    🤖
                  </div>
                  <div className="flex-1">
                    <p className="text-sm bg-gray-50 rounded-lg p-3">
                      Here are the available options for your health records.
                    </p>
                  </div>
                </div>
                <button className="w-full bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500">
                  Find Nearby Sports Hospitals & Clinics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;