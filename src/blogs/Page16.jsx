import React from 'react';
import '../App.css';

const Day16 = () => {
  return (
    <div className="px-10">

      <div className="heading">1. Created layout.ejs layout</div>
      
      <div className="description">
        <ul>
          <li><strong>layout.ejs:</strong> This layout file is the backbone of the AuctionBay web application, setting up the overall structure and styling of the site. It includes the navigation bar, main content area, and dynamic partial includes based on user login status.</li>
          <li><strong>Responsive Design:</strong> The layout utilizes Tailwind CSS classes to ensure a responsive and visually appealing design across different devices and screen sizes.</li>
          <li><strong>Dynamic Content:</strong> The layout dynamically includes different partial views depending on whether the user is logged in or not, providing a personalized experience.</li>
          <li><strong>Navigation and Main Content:</strong> The navigation bar and main content area are structured using flexbox for easy alignment and spacing, making the layout both flexible and modern.</li>
        </ul>
      </div>
      
      <div className="heading">a. layout.ejs Code</div>
      <pre>
{`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AuctionBay</title>
    <link href="/src/input.css" type="text/css" rel="stylesheet">
    <link href="/src/output.css" type="text/css" rel="stylesheet">
    <!-- <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"> -->
</head>
<body class="text-white font-body_font">
    <div class="absolute top-0 z-[-2] min-h-screen h-auto w-full bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">
        <nav class="flex lg:flex-row flex-col lg:justify-between lg:px-16 lg:py-14 px-8 py-7 gap-4">
            <div class="lg:text-6xl text-4xl text-center text-yellow-400">&lt; AuctionBay &gt;</div>
            <div class="flex justify-center lg:gap-6 gap-4">
                
                <% if (page === 'loggedin') { %>
                    <%- include('../partials/loggedin') %>
                <% } else if (page === 'notloggedin') { %>
                    <%- include('../partials/notloggedin') %>
                <% } %> 

            </div>
        </nav>
        <main class="flex lg:flex-row flex-col lg:gap-0 gap-8">
            <div class="lg:px-16 px-8 py-0 flex flex-col lg:gap-14 gap-7">            
                <div class="w-full text-justify lg:text-3xl text-lg lg:leading-relaxed">Welcome to AuctionBay, the ultimate online platform for buying and selling 
                unique items. Whether you're looking to place a bid on rare collectibles, post your own treasures for auction, or find unbeatable deals, our 
                community-driven marketplace has something for everyone. Sign up now to start bidding, winning, and experiencing the thrill of the auction!</div>
                <div class="lg:text-3xl text-lg">Get Started Now!</div>
                <div class="flex lg:gap-6 gap-4">
                    <a href="/postbid"><button class="bg-gradient-to-b from-lime-700 to-lime-900 lg:text-3xl text-lg lg:px-4 lg:py-3 px-2 py-1 rounded-full 
                    transform transition-transform duration-150 ease-in-out active:scale-95 lg:w-[120px] w-[80px]">Post</button></a>
                    <a href="/checkbid"><button class="bg-gradient-to-b from-lime-700 to-lime-900 lg:text-3xl text-lg lg:px-4 lg:py-3 px-2 py-1 rounded-full 
                    transform transition-transform duration-150 ease-in-out active:scale-95 lg:w-[120px] w-[80px]">Check</button></a>
                </div>
            </div>
            <div class="flex justify-center items-center w-full lg:px-16">
                <% if (page === 'loggedin') { %>
                    <%- include('../partials/wishlist') %>
                <% } %> 
            </div>
        </main>
    </div>
</body>
</html>
`}
      </pre>

    </div>
  );
};

export default Day16;
