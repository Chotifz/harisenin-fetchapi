const Navbarr = () => {
  return (
    <div className="navbar bg-gray-800 mb-7 text-white">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Fake Data Posts</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="profile.img"
                src="http://m.gettywallpapers.com/wp-content/uploads/2023/10/Minions-pfp.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-48"
          >
            <li>
              <a>Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Navbarr;
