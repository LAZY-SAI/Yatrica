import AdminLayout from "./adminLayout";
import Panel from "../../components/admin/Panel";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
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

//   const handleDelete = useCallback((id) => {
//     setRecentNotificaiton((prev) => prev.filter((id = !id)));
//   });

  const handleChannel = (id) => {
    setSelectedChannel(id);
  };

  const handleSubmit = () => {
    setMessage("");
    setTitle("");
  };

  useEffect(() => {
    fetch("api/notification.json")
      .then((res) => res.json())
      .then((data) => setRecentNotificaiton(data));
  });
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
                onSubmit={() => handleSubmit()}
              >
                <div className="flex flex-col">
                  <label className="font-bold mb-2 text-gray-300">Title</label>
                  <input
                    type="text"
                    placeholder="title"
                    value={title}
                    className="p-3 bg-gray-700 text-white rounded-lg border  border-gray-600 focus:border-emerald-600  focus:ring-emerald-400 focus:outline-none transition duration-150 "
                  />
                </div>

                <div className="flex flex-col">
                  <label className="font-bold mb-2 text-gray-300">
                    Message
                  </label>
                  <input
                    type="text"
                    value={message}
                    placeholder="title"
                    className="p-3 bg-gray-700 text-white rounded-lg border  border-gray-600 focus:border-emerald-600  focus:ring-emerald-400 focus:outline-none transition duration-150 "
                  />
                </div>

                <button
                  type="submit"
                  className="mt-4 bg-emerald-600 hover:bg-emerald-500 p-3 rounded-xl transition duration-150 text-white font-bold text-lg shadow-lg shadow-emerald-600/40 disabled:bg-gray-500"
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
              {recentNotification.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center p-3 bg-gray-800 rounded-2xl"
                >
                  <div className="flex flex-col gap-2 ">
                    <span className="font-semibold text-xl">{item.title}</span>
                    <p className="overflow-y-auto">{item.message}</p>
                  </div>
                  <buttton 
                //   onClick={()=> handleDelete(item.id)}
                  className="p-3 text-red-500">
                    <MdDelete />
                  </buttton>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* <div className="col-span-1 ">
          <Panel title={"Preview"}>
            <div className="flex flex-col bg-gray-700 ">
              <span className="font-bold text-xl">{title}</span>
              <p>{message}</p>
            </div>
          </Panel>
        </div> */}
      </div>
    </AdminLayout>
  );
};

export default Notify;
