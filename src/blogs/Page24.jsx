import React from 'react';
import '../App.css';

const Day24 = () => {
  return (
    <div className="px-10">

      <div className="heading">1. Created postedbids.ejs and /postedbids route</div>

      <div className="description">
        <ul>
          <li><strong>/postedbids:</strong> Handles GET requests to display the bids that the current user has posted. Fetches the user's posted bids from the database and renders them in the postedbids.ejs view.</li>
          <li><strong>Bid Management:</strong> Renders a table with details of the posted bids, including the auction type, title, description, base price, date, time, and status.</li>
          <li><strong>Editing and Deleting Bids:</strong> Provides options to check the status of posted bids, as well as to edit or delete them for better bid management.</li>
        </ul>
      </div>

      <div className="heading">a. /postedbids Code</div>
      <pre>
{`
router.get('/postedbids', authenticate, async (req, res) => {
    const user_id = req.cookies.user_id;
    const rows = await Bid.findByUserId(user_id);
    res.render('web/pages/postedbids', { layout: "web/pages/postedbids", rows: rows });
});
`}
      </pre>

      <div className="heading">b. postedbids.ejs Code</div>
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
    <style>
        table {
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid #000000;
        }
        th {
            text-align: left;
        }
    </style>
</head>
<body class="text-white font-body_font flex">
    <div class="absolute top-0 z-[-2] min-h-screen h-auto w-full flex flex-col items-center bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] 
    bg-[size:20px_20px]">
        <div class="lg:text-5xl text-3xl text-yellow-400 lg:p-14 p-7 text-center">&lt; Posted &gt;</div>
        <div class="flex justify-center items-center lg:gap-10 gap-2">
            <button class="forward lg:w-[300px] w-[160px] text-center lg:text-3xl text-base lg:py-4 py-2 rounded-full bg-gradient-to-b from-sky-700 to-sky-900 
            transform transition-transform duration-150 ease-in-out active:scale-95">Forward Auction</button>
            <button class="reverse opacity-50 lg:w-[300px] w-[160px] text-center lg:text-3xl text-base lg:py-4 py-2 rounded-full bg-gradient-to-b from-lime-700 
            to-lime-900 transform transition-transform duration-150 ease-in-out active:scale-95">Reverse Auction</button>
        </div>
        <div class="lg:my-14 my-7 w-full flex justify-center items-center text-white lg:text-xl text-xs lg:overflow-hidden overflow-y-auto overflow-x-auto lg:px-14 
        px-7">
            <div class="w-full lg:overflow-hidden overflow-x-scroll">
                <table class="lg:w-full w-[200%]">
                    <thead class="bg-violet-900">
                        <tr>
                            <th class="lg:w-[15%] w-[25%] text-center lg:p-2 p-1">By</th>
                            <th class="lg:w-[20%] w-[40%] text-center lg:p-2 p-1">Title</th>
                            <th class="lg:w-[30%] w-[60%] text-center lg:p-2 p-1">Description</th>
                            <th class="lg:w-[10%] w-[20%] text-center lg:p-2 p-1">Base Price</th>
                            <th class="lg:w-[14%] w-[24%] text-center lg:p-2 p-1">Date</th>
                            <th class="lg:w-[6%] w-[16%] text-center lg:p-2 p-1">Time</th>
                            <th class="lg:w-[5%] w-[15%] text-center lg:p-2 p-1">Status</th>
                        </tr>
                    </thead>
                    <tbody class="bg-gray-800">
                        <% rows.forEach(row => { %>
                            <tr class="<%= row.auction %>">
                                <td class="lg:p-2 p-1"><%= row.name %></td>
                                <td class="lg:p-2 p-1"><%= row.title %></td>
                                <td class="lg:p-2 p-1"><%= row.description %></td>
                                <td class="lg:p-2 p-1 text-center"><%= row.price %></td>
                                <td class="lg:p-2 p-1 text-center"><%= row.date.toString().split('00:00:00')[0] %></td>
                                <td class="lg:p-2 p-1 text-center"><%= row.time %></td>
                                <td class="lg:p-2 p-1 text-center">
                                    <div class="flex flex-col justify-center items-center gap-2">
                                        <form action="/posted-bids-status" method="POST">
                                            <input type="hidden" name="bid_id" value="<%= row.bid_id %>">
                                            <input type="hidden" name="auction" value="<%= row.auction %>">
                                            <button type="submit" class="bg-gradient-to-b from-cyan-700 to-cyan-900 rounded-lg lg:p-2 p-1 transform 
                                            transition-transform duration-150 ease-in-out active:scale-95">Check</button>
                                        </form>
                                        <div class="flex lg:flex-row flex-col gap-2">
                                            <form action="/edit-posted-bids" method="POST">
                                                <input type="hidden" name="bid_id" value="<%= row.bid_id %>">
                                                <input type="hidden" name="user_id" value="<%= row.user_id %>">
                                                <input type="hidden" name="name" value="<%= row.name %>">
                                                <input type="hidden" name="email" value="<%= row.email %>">
                                                <input type="hidden" name="title" value="<%= row.title %>">
                                                <input type="hidden" name="auction" value="<%= row.auction %>">
                                                <input type="hidden" name="type" value="<%= row.type %>">
                                                <input type="hidden" name="contact" value="<%= row.contact %>">
                                                <input type="hidden" name="description" value="<%= row.description %>">
                                                <input type="hidden" name="price" value="<%= row.price %>">
                                                <button type="submit" class="bg-gradient-to-b from-lime-700 to-lime-900 rounded-lg lg:p-2 p-1 transform 
                                                transition-transform duration-150 ease-in-out active:scale-95"><img src="/img/edit.svg" alt="" 
                                                class="lg:w-[20px] w-[15px]"></button>
                                            </form>
                                            <form action="/delete-posted-bids" method="POST">
                                                <input type="hidden" name="bid_id" value="<%= row.bid_id %>">
                                                <button type="submit" class="bg-gradient-to-b from-red-700 to-red-900 rounded-lg lg:p-2 p-1 transform 
                                                transition-transform duration-150 ease-in-out active:scale-95"><img src="/img/delete.svg" alt="" 
                                                class="lg:w-[20px] w-[15px]"></button>
                                            </form>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        <% }); %>
                    </tbody>
                </table>  
            </div>
        </div>          
    </div>    

    <script>
        document.querySelector('.forward').addEventListener('click', () => {
            document.querySelector('.reverse').classList.add('opacity-50')
            document.querySelector('.forward').classList.remove('opacity-50')
            filterRows('forward');
        })
        document.querySelector('.reverse').addEventListener('click', () => {
            document.querySelector('.forward').classList.add('opacity-50')
            document.querySelector('.reverse').classList.remove('opacity-50')
            filterRows('reverse');
        })
        function filterRows(auction){
            const rows = document.querySelectorAll('tbody tr');
            rows.forEach(row => {
                if(row.classList.contains(auction)){
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            })
        }
        filterRows('forward');
    </script>
</body>
</html>
`}
      </pre>

    </div>
  );
};

export default Day24;
