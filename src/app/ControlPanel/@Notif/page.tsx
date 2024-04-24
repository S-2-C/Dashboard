export default async function NotifSlot() {
  return (
    <div className="bg-teal-background p-4 rounded-lg">
      <h1 className="text-4xl font-bold text-white text-center p-4">
        Notifications
      </h1>
      <p className="text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <div className="bg-blue p-4 rounded-lg shadow-md mb-4">
        {" "}
        {/* Added mb-4 for margin-bottom */}
        <text>Notification</text>
      </div>
      <div className="bg-blue p-4 rounded-lg shadow-md mb-4">
        {" "}
        {/* Added mb-4 for margin-bottom */}
        <text>Notification</text>
      </div>
    </div>
  );
}
