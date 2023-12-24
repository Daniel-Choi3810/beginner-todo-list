import React from "react";

/**
 * Header component that displays the title and description of the app
 */

function Header() {
  return (
    <header className="mt-[4rem] text-sm text-white">
      <h1 className="text-4xl font-bold">Todo App</h1>
      <p className="mt-4 text-lg">Tap on tasks to edit</p>
    </header>
  );
}

export default Header;
