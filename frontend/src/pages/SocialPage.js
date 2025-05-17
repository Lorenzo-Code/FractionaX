import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBell, FaUsers, FaCommentDots, FaThumbsUp, FaReply } from "react-icons/fa";
import { FiSend } from "react-icons/fi";

const SocialPage = () => {
  const [groups, setGroups] = useState([]); // List of group chats
  const [selectedGroup, setSelectedGroup] = useState(null); // Active group
  const [groupMessages, setGroupMessages] = useState([]); // Messages in the selected group
  const [alerts, setAlerts] = useState([]); // Management alerts
  const [newsFeed, setNewsFeed] = useState([]); // Newsfeed posts
  const [messageInput, setMessageInput] = useState(""); // Input for group messages
  const [commentInputs, setCommentInputs] = useState({}); // Input for comments
  const [user] = useState({ id: 1, name: "John Doe", avatar: "https://i.pravatar.cc/150" }); // Current user

  const API_BASE_URL = "https://api.fractionax.com";

  useEffect(() => {
    fetchGroups();
    fetchAlerts();
    fetchNewsFeed();
  }, []);

  const fetchGroups = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/user-groups`);
      setGroups(data.groups);
    } catch (error) {
      console.error("Error fetching groups:", error);
    }
  };

  const fetchAlerts = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/alerts`);
      setAlerts(data.alerts);
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  const fetchNewsFeed = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/news-feed`);
      setNewsFeed(data.posts);
    } catch (error) {
      console.error("Error fetching news feed:", error);
    }
  };

  const fetchGroupMessages = async (groupId) => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/groups/${groupId}/messages`);
      setGroupMessages(data.messages);
    } catch (error) {
      console.error("Error fetching group messages:", error);
    }
  };

  const sendGroupMessage = async () => {
    if (!messageInput.trim()) return;

    const newMessage = {
      sender: user,
      content: messageInput.trim(),
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post(`${API_BASE_URL}/groups/${selectedGroup.id}/send-message`, newMessage);
      setGroupMessages([...groupMessages, newMessage]);
      setMessageInput(""); // Clear input
    } catch (error) {
      console.error("Error sending group message:", error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      await axios.post(`${API_BASE_URL}/news-feed/${postId}/like`);
      setNewsFeed(
        newsFeed.map((post) =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        )
      );
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleAddComment = async (postId) => {
    if (!commentInputs[postId]?.trim()) return;

    const newComment = {
      author: user.name,
      content: commentInputs[postId],
      timestamp: new Date().toISOString(),
    };

    try {
      await axios.post(`${API_BASE_URL}/news-feed/${postId}/comment`, newComment);
      setNewsFeed(
        newsFeed.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, newComment] }
            : post
        )
      );
      setCommentInputs({ ...commentInputs, [postId]: "" }); // Clear comment input
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      {/* Hero Section */}
      <div className="bg-gray-800 p-6 rounded-lg mb-6 shadow-lg">
        <h1 className="text-4xl font-extrabold text-center mb-4">Welcome to the FractionaX Social Hub</h1>
        <p className="text-center text-gray-300 text-lg">
          Connect, Collaborate, and Stay Informed.
        </p>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Management Notifications */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FaBell /> Management Notifications
          </h2>
          <ul className="space-y-4">
            {alerts.length > 0 ? (
              alerts.map((alert) => (
                <li key={alert.id} className="p-3 rounded-lg bg-gray-700">
                  <h3 className="font-bold">{alert.title}</h3>
                  <p className="text-sm">{alert.content}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-400">No notifications to show.</p>
            )}
          </ul>
        </div>


        {/* Investment Groups */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FaUsers /> Investment Groups
          </h2>
          <ul className="space-y-4">
            {groups.length > 0 ? (
              groups.map((group) => (
                <li
                  key={group.id}
                  onClick={() => {
                    setSelectedGroup(group);
                    fetchGroupMessages(group.id);
                  }}
                  className={`p-3 rounded-lg cursor-pointer ${
                    selectedGroup?.id === group.id ? "bg-blue-500 text-white" : "bg-gray-700"
                  }`}
                >
                  <h3 className="font-bold">{group.name}</h3>
                  <p className="text-sm text-gray-300">{group.investors.length} investors</p>
                </li>
              ))
            ) : (
              <p className="text-gray-400">No groups available.</p>
            )}
          </ul>
          {selectedGroup && (
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">{selectedGroup.name} Group Chat</h3>
              <div className="h-64 overflow-y-auto bg-gray-700 p-3 rounded-lg">
                {groupMessages.length > 0 ? (
                  groupMessages.map((msg, index) => (
                    <div key={index} className={`mb-4 ${msg.sender.id === user.id ? "text-right" : ""}`}>
                      <p
                        className={`inline-block px-4 py-2 rounded-lg ${
                          msg.sender.id === user.id ? "bg-blue-500" : "bg-gray-800"
                        }`}
                      >
                        {msg.content}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No messages yet.</p>
                )}
              </div>
              <div className="flex gap-2 mt-4">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
                  placeholder="Type a message..."
                />
                <button
                  onClick={sendGroupMessage}
                  className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600 flex items-center gap-1"
                >
                  <FiSend /> Send
                </button>
              </div>
            </div>
          )}
        </div>
        {/* News Feed */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FaCommentDots /> News Feed
          </h2>
          <ul className="space-y-4">
            {newsFeed.length > 0 ? (
              newsFeed.map((post) => (
                <li key={post.id} className="p-3 bg-gray-700 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <img
                      src={post.authorAvatar || "https://i.pravatar.cc/40"}
                      alt={post.author}
                      className="w-8 h-8 rounded-full"
                    />
                    <h3 className="font-bold">{post.author}</h3>
                    <p className="text-sm text-gray-400">
                      {new Date(post.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <p className="mb-4">{post.content}</p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className="flex items-center gap-1 text-sm text-gray-300 hover:text-blue-400"
                    >
                      <FaThumbsUp /> {post.likes} Likes
                    </button>
                    <button className="flex items-center gap-1 text-sm text-gray-300 hover:text-green-400">
                      <FaReply /> {post.comments.length} Comments
                    </button>
                  </div>

                  {/* Comments Section */}
                  <div className="mt-4 space-y-2">
                    {post.comments.map((comment, index) => (
                      <div key={index} className="p-2 bg-gray-800 rounded-lg">
                        <p className="text-sm">
                          <span className="font-bold">{comment.author}</span>: {comment.content}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(comment.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Add Comment */}
                  <div className="flex gap-2 mt-4">
                    <input
                      type="text"
                      value={commentInputs[post.id] || ""}
                      onChange={(e) =>
                        setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                      }
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
                      placeholder="Add a comment..."
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="bg-blue-500 px-4 py-2 rounded-lg text-white hover:bg-blue-600"
                    >
                      Comment
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-400">No posts yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SocialPage;
