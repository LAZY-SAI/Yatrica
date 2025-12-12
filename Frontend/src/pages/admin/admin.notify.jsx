import AdminLayout from "./adminLayout";
import Panel from "../../components/admin/Panel";
import { useState, useEffect, useCallback } from "react";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns"; 
const Notify = () => {
  const channel = [
    { id: 1, name: "In-app" },
    { id: 2, name: "In-Web" },
    { id: 3, name: "Email" },
  ];

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedChannel, setSelectedChannel] = useState(channel[0].id);
  const [recentNotification, setRecentNotificaiton] = useState([]);

 
  const getChannelName = (id) => {
    return channel.find((c) => c.id === id)?.name || "Unknown";
  };

  const handleDelete = useCallback((id) => {
    setRecentNotificaiton((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleChannel = (id) => {
    setSelectedChannel(id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newId = Date.now();
    const newNotification = {
      id: newId,
      title: title,
      message: message,
   
      channelId: selectedChannel,
      timestamps: new Date().toISOString(),
    };
    setRecentNotificaiton((prev) => [
      newNotification, 
      ...prev,
    ]);

    setTitle("");
    setMessage("");
    console.log("new notification added", newNotification);
  };

  useEffect(() => {
    fetch("api/notification.json")
      .then((res) => res.json())
      .then((data) => setRecentNotificaiton(data));
  }, []);

  return (
    <AdminLayout
      header={
        <header className="flex justify-between items-center pb-4 border-b border-gray-400">
          <div>
            <h2 className="text-xl font-bold">Notify</h2>
            <p className="text-sm text-gray-400">Reach Travelers with update</p>
          </div>
        </header>
      }
    >
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <Panel
            title="Compose message"
            subtitle="Choose channel for Your Notification"
            className="gap-3 flex flex-col"
          >
            <div className="flex flex-col gap-4">
              <h4 className="text-gray-300 font-semibold text-sm mt-2">
                Delivery Channels
              </h4>

              <div className="flex gap-4 items-center">
                {channel.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleChannel(item.id)}
                    className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200
                      ${
                        selectedChannel === item.id
                          ? "bg-emerald-600 hover:bg-emerald-600/30"
                          : "bg-gray-600"
                      }
                    `}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 flex flex-col rounded-2xl">
              <form
                className="flex flex-col gap-6 p-4 rounded-3xl mt-4 border-gray-700 "
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col">
                  <label className="font-bold mb-2 text-gray-300">Title</label>
                  <input
                    type="text"
                    placeholder="Notification Title"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    className="p-3 bg-gray-700 text-white rounded-lg border  border-gray-600 focus:border-emerald-600  focus:ring-emerald-400 focus:outline-none transition duration-150 "
                    required 
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-bold mb-2 text-gray-300">
                    Message
                  </label>
                  <textarea 
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Notification Message"
                    className="p-3 bg-gray-700 text-white rounded-lg border  border-gray-600 focus:border-emerald-600  focus:ring-emerald-400 focus:outline-none transition duration-150 resize-none"
                    required 
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 bg-emerald-600 hover:bg-emerald-500 p-3 rounded-xl transition duration-150 text-white font-bold text-lg shadow-lg shadow-emerald-600/40 "
                >
                  Send Notification
                </button>
              </form>
            </div>
          </Panel>
        </div>
        <div className="col-span-1 ">
          <Panel title={"Recent Notifications"}>
            <div className="flex flex-col gap-3">
            
              {recentNotification.length === 0 ? (
                <p className="text-gray-400 text-center py-4">
                  No recent notifications found.
                </p>
              ) : (
                recentNotification.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start p-3 bg-gray-800 rounded-2xl justify-between" // Added justify-between
                  >
                    <div className="flex flex-col gap-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {/* Channel  */}
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                            item.channelId === 3 ? "bg-blue-600" : "bg-purple-600" // Basic color coding
                        }`}>
                            {getChannelName(item.channelId)}
                        </span>
                        {/* Title */}
                        <span className="font-semibold text-lg truncate">
                          {item.title}
                        </span>
                      </div>
                      {/* Message */}
                      <p className="text-sm text-gray-300 line-clamp-2"> 
                        {item.message}
                      </p>
                      {/* Timestamp */}
                      <span className="text-xs text-gray-500 pt-1">
                        {item.timestamps 
                          ? format(new Date(item.timestamps), "MMM d, yyyy h:mm a") // Format date
                          : "No Date"}
                      </span>
                    </div>
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-1 ml-2 flex-shrink-0 text-red-500" // Adjusted padding and added flex-shrink-0
                    >
                      <div className="p-2 rounded-full hover:bg-gray-700 transition-colors">
                        <MdDelete size={20} />
                      </div>
                    </button>
                  </div>
                ))
              )}
            </div>
          </Panel>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Notify;