import {
  FiMail,
  FiPhone,
  FiLock,
  FiGlobe,
  FiDollarSign,
  FiHome,
  FiEye,
  FiBell,
  FiShield,
} from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const SettingRow = ({
  IconComponent,
  title,
  subtitle,
  value,
  actionText,
  actionColor = "text-emerald-500",
  valueColor = "text-gray-400",
  titleClass = "text-white",
}) => (
  <div className="flex justify-between items-center p-4 border-b border-gray-700/50 last:border-b-0">
    <div className="flex items-start">
      <div className="w-5 h-5 mr-3 mt-1 text-emerald-500">{IconComponent}</div>
      <div>
        <p className={`font-medium ${titleClass}`}>{title}</p>
        <p className="text-gray-500 text-xs mt-0.5">{subtitle}</p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <span className={`text-sm ${valueColor}`}>{value}</span>
      <button
        className={`text-sm font-semibold ${actionColor} hover:opacity-80 transition`}
      >
        {actionText}
      </button>
    </div>
  </div>
);

const Profile = () => {
  const CARD_BG_COLOR = "bg-[#192c3b89]";
  const SECTION_PADDING = "p-4 sm:p-6";
  const navigate = useNavigate();
  return (
    <div className="flex justify-center p-10 min-h-screen  text-white">
      <div className=" max-w-7xl w-full gap-8">
        <header className="mb-6 flex items-center gap-3 ">
          <button
            onClick={() => navigate(-1)}
            className="font-bold border-1 border-gray-600 rounded-full p-3 hover:bg-gray-600"
          >
            <FaArrowLeft />
          </button>
          <span className="flex-1">
            <h2 className="font-semibold text-2xl">Profile</h2>
            <p className="text-gray-400 text-sm">
              Manage your account details, preferences, and privacy.
            </p>
          </span>
          {/* Action Buttons */}
          <div>
            <button className="text-white px-4 py-2 rounded-xl font-semibold hover:opacity-80 transition duration-200 mr-4">
              Cancel
            </button>
            <button className="bg-emerald-600 px-6 py-2 rounded-xl font-semibold hover:bg-emerald-700 transition-colors duration-200">
              Save changes
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="w-full  grid grid-cols-2 gap-3">
          {/* User Profile Card */}
          <div
            className={`${CARD_BG_COLOR} flex flex-col sm:flex-row col-span-2 items-start sm:items-center scroll-mt-10 ${SECTION_PADDING} rounded-2xl gap-3 mb-6 justify-between`}
          >
            <div className="flex items-center gap-4 ">
              {/* Profile Pic */}
              <div className="w-12 h-12 rounded-full bg-gray-600 cursor-pointer"></div>
              <div>
                <span className="font-semibold text-lg">JohnFkingRai</span>
                <p className="text-sm text-gray-400">@john Member since 2021</p>
              </div>
            </div>

            <button className="bg-emerald-600 p-2 px-4 rounded-xl font-semibold text-sm hover:bg-emerald-700 transition-colors duration-200">
              Edit profile
            </button>
          </div>

          {/* --- Account Section --- */}
          <section
            className={`${CARD_BG_COLOR} mt-5 ${SECTION_PADDING} rounded-xl scroll-mt-10`}
          >
            <p className="font-semibold text-base mb-1">Account</p>
            <p className="text-gray-500 text-sm mb-4">
              Basic account and sign-in details
            </p>

            <SettingRow
              IconComponent={<FiMail />}
              title="Email"
              subtitle="Primary email used for sign-in and notifications."
              value="johm@example.com"
              actionText="Change"
            />
            <SettingRow
              IconComponent={<FiPhone />}
              title="Phone"
              subtitle="Add a phone number for account recovery."
              value="Not added"
              actionText="Add"
              valueColor="text-gray-500"
              actionColor="text-gray-500 hover:text-white"
            />
            <SettingRow
              IconComponent={<FiLock />}
              title="Password"
              value=""
              actionText="Update"
            />
          </section>

          {/* --- Preferences Section --- */}
          <section
            className={`${CARD_BG_COLOR} ${SECTION_PADDING} mt-4 rounded-xl scroll-mt-10`}
          >
            <p className="font-semibold text-base mb-1">Preferences</p>
            <p className="text-gray-500 text-sm mb-4">
              Language, currency, and trip defaults.
            </p>
            <SettingRow
              IconComponent={<FiGlobe />}
              title="Language"
              subtitle="Choose the language used across the app."
              value="English (US)"
              actionText="Change"
            />
            <SettingRow
              IconComponent={<FiDollarSign />}
              title="Currency"
              subtitle="Default currency for prices in trips."
              value="USD ($)"
              actionText="Change"
            />
            <SettingRow
              IconComponent={<FiHome />}
              title="Default start location"
              subtitle="Set your home city for trip suggestions."
              value="Not set"
              actionText="Set up"
              valueColor="text-gray-500"
              actionColor="text-gray-500 hover:text-white"
            />
          </section>

          {/* --- Privacy & Security Section --- */}
          <section
            className={`${CARD_BG_COLOR} rounded-xl mt-4 scroll-mt-10 ${SECTION_PADDING} col-span-2`}
          >
            <p className="font-semibold text-base mb-1">Privacy & Security</p>
            <p className="text-gray-500 text-sm mb-4">
              Control who can see your profile and keep it secure.
            </p>
            <SettingRow
              IconComponent={<FiEye />}
              title="Profile visibility"
              subtitle="Choose who can view your trips and saved lists."
              value="Only friends"
              actionText="Edit"
            />
            <SettingRow
              IconComponent={<FiBell />}
              title="Notifications"
              subtitle="Trips, messages, reminders."
              value=""
              actionText="Manage"
            />
            <SettingRow
              IconComponent={<FiShield />}
              title="Two-factor authentication"
              subtitle="Add an extra layer of security to your account."
              value="Off"
              actionText="Set up"
              valueColor="text-gray-500"
              actionColor="text-gray-500 hover:text-white"
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Profile;
