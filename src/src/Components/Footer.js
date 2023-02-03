import React from "react";

function Footer() {
  return (
    <footer className="container mx-auto fixed bottom-0 left-0 right-0 py-3 bg-white dark:bg-dark-mode">
      <p className="text-xs text-center text-dark-content dark:text-light-content w-full">
        &copy;{new Date().getFullYear()} - <span className="font-bold">Léo SEGUIN</span>
      </p>
    </footer>
  );
}

export default Footer;