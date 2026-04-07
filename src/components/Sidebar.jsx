import React from 'react';

const Sidebar = ({ modules, activeModule, setActiveModule }) => {
  return (
    <aside className="w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">D&D Manager</h1>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {modules.map((module) => (
          <button
            key={module.id}
            id={`sidebar-${module.id}`}
            onClick={() => setActiveModule(module.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeModule === module.id
                ? 'bg-indigo-50 dark:bg-indigo-90/30 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <span>{module.icon}</span>
            <span>{module.name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;