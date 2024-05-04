import React from "react";

const SearchResults = () => {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="items-start justify-between sm:flex">
        <div>
          <h2 className="text-gray-800 font-medium">Search Results</h2>
          <ul className="mt-3 space-y-3">
            {/* Radio */}
            <li className="flex items-center gap-x-2.5">
              <input
                type="radio"
                name="role"
                defaultChecked
                id="movies"
                className="form-radio border-gray-400 text-indigo-600 focus:ring-indigo-600 duration-150"
              />
              <label
                htmlFor="movies"
                className="text-sm text-gray-700 font-medium"
              >
                Movies
              </label>
            </li>
            <li className="flex items-center gap-x-2.5">
              <input
                type="radio"
                name="role"
                id="series"
                className="form-radio border-gray-400 text-indigo-600 focus:ring-indigo-600 duration-150"
              />
              <label
                htmlFor="series"
                className="text-sm text-gray-700 font-medium"
              >
                Series
              </label>
            </li>
          </ul>
        </div>
      </div>
      <ul className="mt-12 divide-y">
        {members.map((item, idx) => (
          <li key={idx} className="py-5 flex items-start justify-between">
            <div className="flex gap-3">
              <img
                src={item.avatar}
                className="flex-none w-12 h-12 rounded-full"
              />
              <div>
                <span className="block text-sm text-gray-700 font-semibold">
                  {item.name}
                </span>
                <span className="block text-sm text-gray-600">
                  {item.email}
                </span>
              </div>
            </div>
            <a
              href="javascript:void(0)"
              className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150 bg-white hover:bg-gray-100"
            >
              Manage
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
