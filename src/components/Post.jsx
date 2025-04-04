import React from 'react';
import { RiHeart3Line, RiChat1Line, RiShareForwardLine } from 'react-icons/ri';

const Post = ({ avatar, name, role, time, content, image, likes, comments }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Post Header */}
      <div className="flex items-center gap-3 mb-4">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h3 className="font-medium text-gray-900">{name}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>{role}</span>
            <span>•</span>
            <span>{time}</span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-gray-800 mb-4">{content}</p>
      {image && (
        <img
          src={image}
          alt=""
          className="w-full h-64 object-cover rounded-lg mb-4"
        />
      )}

      {/* Post Actions */}
      <div className="flex items-center gap-6 pt-4 border-t">
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
          <RiHeart3Line className="w-5 h-5" />
          <span>{likes}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
          <RiChat1Line className="w-5 h-5" />
          <span>{comments}</span>
        </button>
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800">
          <RiShareForwardLine className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
};

export default Post;
