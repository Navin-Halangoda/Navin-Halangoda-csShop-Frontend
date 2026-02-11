import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loder from "../../component/Loder";

export default function Adminmessage() {
  const [messages, setMessages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);

  const token = localStorage.getItem("token");

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/messages`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessages(res.data || []);
      setLoaded(true);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load messages");
      setLoaded(true);
    }
  };

  useEffect(() => {
    if (!loaded) {
      fetchMessages();
    }
  }, [loaded]);

  const handleMarkRead = async (messageId) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URI}/messages/${messageId}/read`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) =>
        prev.map((item) =>
          item._id === messageId ? { ...item, isRead: true } : item
        )
      );
      toast.success("Marked as read");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update message");
    }
  };

  const handleDelete = async (messageId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URI}/messages/${messageId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages((prev) => prev.filter((item) => item._id !== messageId));
      if (selectedMessage?._id === messageId) {
        setSelectedMessage(null);
        setReplyText("");
      }
      toast.success("Message deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete message");
    }
  };

  const openReply = (message) => {
    setSelectedMessage(message);
    setReplyText("");
  };

  const handleReply = async () => {
    if (!selectedMessage) return;
    if (!replyText.trim()) {
      toast.error("Reply message is required");
      return;
    }

    try {
      setSendingReply(true);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/messages/${selectedMessage._id}/reply`,
        { replyMessage: replyText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Reply sent");
      setSelectedMessage(null);
      setReplyText("");
      fetchMessages();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reply");
    } finally {
      setSendingReply(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-primmary via-accent/10 to-primmary p-6 lg:p-10">
      {loaded ? (
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-secondary mb-2">Messages</h1>
            <p className="text-secondary/60">Read, reply, and manage contact messages</p>
          </div>

          <div className="bg-white/80 rounded-2xl shadow-2xl border border-accent/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-accent2 to-accent text-white">
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">From</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-accent/10">
                  {messages.length === 0 ? (
                    <tr>
                      <td colSpan="10" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-secondary/40">
                          <p className="text-lg font-medium">No messages found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    messages.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-accent/5 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <div className="font-semibold text-secondary max-w-xs truncate">
                            {item.name}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-secondary/80 max-w-xs truncate">{item.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-secondary max-w-xs truncate">{item.subject}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-secondary max-w-xs truncate">
                            {new Date(item.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              item.isRead
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {item.isRead ? "Read" : "Unread"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-2">
                            <button
                              onClick={() => openReply(item)}
                              className="px-3 py-2 text-xs font-semibold rounded-lg bg-accent text-white hover:bg-accent2 transition"
                            >
                              Reply
                            </button>
                            <button
                              onClick={() => handleMarkRead(item._id)}
                              className="px-3 py-2 text-xs font-semibold rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
                            >
                              Mark Read
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="px-3 py-2 text-xs font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {selectedMessage && (
            <div className="mt-8 bg-white/80 rounded-2xl shadow-2xl border border-accent/20 p-6">
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-secondary">Reply</h2>
                  <p className="text-secondary/70">
                    To: {selectedMessage.email} ({selectedMessage.name})
                  </p>
                  <p className="text-secondary/70">Subject: {selectedMessage.subject}</p>
                </div>
                <div className="bg-white rounded-xl border border-accent/20 p-4">
                  <p className="text-secondary/80 whitespace-pre-line">{selectedMessage.message}</p>
                </div>
                <textarea
                  className="w-full min-h-[140px] rounded-xl border border-accent/20 p-4 focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleReply}
                    disabled={sendingReply}
                    className={`px-5 py-3 rounded-lg text-white font-semibold bg-accent hover:bg-accent2 transition ${
                      sendingReply ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                  >
                    {sendingReply ? "Sending..." : "Send Reply"}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedMessage(null);
                      setReplyText("");
                    }}
                    className="px-5 py-3 rounded-lg font-semibold border border-accent/30 text-secondary hover:bg-accent/10 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Loder />
      )}
    </div>
  );
}
