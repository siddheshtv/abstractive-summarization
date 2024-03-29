import React from "react";

const Footer = () => {
  return (
    <div className="">
      <footer class="bg-white shadow dark:bg-gray-800">
        <div class="w-full mx-auto p-4 md:flex md:items-center md:justify-center">
          <span class="text-xl p-4 text-center text-gray-400">
            © 2024{" "}
            <a href="/" class="hover:underline">
              Project Name&trade;
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
