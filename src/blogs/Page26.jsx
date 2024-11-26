import React from 'react';
import '../App.css';

const Day26 = () => {
  return (
    <div className="px-10">

      <div className="heading">1. Created postedstatus.ejs and /posted-bids-status route</div>

      <div className="description">
        <ul>
          <li><strong>/posted-bids-status:</strong> Handles POST requests to fetch and display the status of posted bids. Depending on the auction type (forward or reverse), it retrieves the highest or lowest bidder and displays their details along with the bid amount and acceptance status.</li>
          <li><strong>Bidder Validation:</strong> Validates whether a bidder exists for the auction and fetches their details, including username, name, contact number, email, years of experience, and bid amount.</li>
          <li><strong>Status Check:</strong> Checks and updates the acceptance status of the bid (Accepted/Rejected).</li>
        </ul>
      </div>

      <div className="heading">a. /posted-bids-status Code</div>
      <pre>
{`
router.post('/posted-bids-status', authenticate, async (req, res) => {
    const { bid_id, auction } = req.body;
    let bidder;
    if (auction === 'forward') {
        bidder = await Contract.getHighestBidder(bid_id);
    } else if (auction === 'reverse') {
        bidder = await Contract.getLowestBidder(bid_id);
    }
    if (!bidder) {
        return res.status(400).render('web/layouts/auth', { page: 'error', status: 400, message: 'This auction has not happened yet' });
    }
    const user_id = bidder.user_id;
    const details = await Profile.findByUserId(user_id);
    const value = bidder.value;
    const result = await Status.getResponse(bid_id);
    let status;
    if (result) {
        const response = result.response;
        if (response === 'yes') {
            status = 'Accepted';
        } else if (response === 'no') {
            status = 'Rejected';
        }
    } else {
        status = '';
    }
    res.render('web/pages/postedstatus', { layout: "web/pages/postedstatus", details, value, bid_id, status });
});
`}
      </pre>

      <div className="heading">b. postedstatus.ejs Code</div>
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
</head>
<body class="text-white font-body_font flex">
    <div class="absolute top-0 z-[-2] h-auto w-auto min-h-full min-w-full flex flex-col items-center bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] 
    bg-[size:20px_20px]">
        <div class="lg:text-5xl text-3xl text-yellow-400 lg:p-14 p-7 text-center">&lt; Posted Status &gt;</div>
        <form action="/posted-status" method="POST">
            <div class="flex flex-col lg:gap-8 gap-4 justify-center items-center lg:text-xl text-base">
                <input type="hidden" name="bid_id" value="<%= bid_id %>">
                <div class="flex lg:flex-row flex-col lg:gap-8 gap-1 justify-between lg:w-[650px] w-[300px] items-center">
                    <div>Username</div>
                    <div class="bg-white rounded-md p-2 text-black">
                        <input class="lg:w-[400px] w-[300px] lg:text-left text-center" name="username" value="<%= details.username %>" readonly>
                    </div>
                </div>
                <div class="flex lg:flex-row flex-col lg:gap-8 gap-1 justify-between lg:w-[650px] w-[300px] items-center">
                    <div>Name</div>
                    <div class="bg-white rounded-md p-2 text-black">
                        <input class="lg:w-[400px] w-[300px] lg:text-left text-center" name="name" value="<%= details.first_name %> <%= details.last_name %>" readonly>
                    </div>
                </div>
                <div class="flex lg:flex-row flex-col lg:gap-8 gap-1 justify-between lg:w-[650px] w-[300px] items-center">
                    <div>Contact Number</div>
                    <div class="bg-white rounded-md p-2 text-black">
                        <input class="lg:w-[400px] w-[300px] lg:text-left text-center" name="contact_no" value="<%= details.contact_no %>" readonly>
                    </div>
                </div>
                <div class="flex lg:flex-row flex-col lg:gap-8 gap-1 justify-between lg:w-[650px] w-[300px] items-center">
                    <div>Email</div>
                    <div class="bg-white rounded-md p-2 text-black">
                        <input class="lg:w-[400px] w-[300px] lg:text-left text-center" name="email" value="<%= details.email %>" readonly>
                    </div>
                </div>
                <div class="flex lg:flex-row flex-col lg:gap-8 gap-1 justify-between lg:w-[650px] w-[300px] items-center">
                    <div>Years of Experience</div>
                    <div class="bg-white rounded-md p-2 text-black">
                        <input class="lg:w-[400px] w-[300px] lg:text-left text-center" name="years_of_experience" value="<%= details.years_of_experience %>" readonly>
                    </div>
                </div>
                <div class="flex lg:flex-row flex-col lg:gap-8 gap-1 justify-between lg:w-[650px] w-[300px] items-center">
                    <div>Bid Amount</div>
                    <div class="bg-white rounded-md p-2 text-black">
                        <input class="lg:w-[400px] w-[300px] lg:text-left text-center" name="value" value="<%= value %>" readonly>
                    </div>
                </div>
                <div class="flex lg:flex-row flex-col lg:gap-8 gap-1 justify-between lg:w-[650px] w-[300px] items-center">
                    <% if (status) { %>
                        <div>Status</div>
                        <div class="lg:w-[415px] w-[300px] flex gap-4 lg:justify-start justify-center items-center">
                            <div class="bg-gradient-to-b from-cyan-700 to-cyan-900 rounded-lg lg:p-2 p-1 lg:w-[100px] w-[80px] text-center"><%= status %></div>
                        </div>
                    <% } else { %>                    
                        <div>Do you accept?</div>
                        <div class="lg:w-[415px] w-[300px] flex lg:justify-start justify-center gap-4">
                            <button type="submit" name="response" value="yes" class="bg-gradient-to-b from-lime-700 to-lime-900 rounded-lg lg:p-2 p-1 
                            transform transition-transform duration-150 ease-in-out active:scale-95 lg:w-[50px] w-[40px]">Yes</button>
                            <button type="submit" name="response" value="no" class="bg-gradient-to-b from-red-700 to-red-900 rounded-lg lg:p-2 p-1 
                            transform transition-transform duration-150 ease-in-out active:scale-95 lg:w-[50px] w-[40px]">No</button>                        
                        </div>
                    <% } %>
                </div>
            </div>
        </form>
    </div> 
</body>
</html>
`}
      </pre>

    </div>
  );
};

export default Day26;
