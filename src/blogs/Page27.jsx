import React from 'react';
import '../App.css';

const Day27 = () => {
  return (
    <div className="px-10">

      <div className="heading">1. Created participatedstatus.ejs and /participated-bids-status route</div>

      <div className="description">
        <ul>
          <li><strong>/participated-bids-status:</strong> Handles POST requests to fetch and display the status of bids the user has participated in. Retrieves user details and the status of their bids.</li>
          <li><strong>Status Validation:</strong> Checks if the bid has been accepted, rejected, or is pending, and updates the status accordingly.</li>
        </ul>
      </div>

      <div className="heading">a. /participated-bids-status Code</div>
      <pre>
{`
router.post('/participated-bids-status', authenticate, async (req, res) => {
    const { bid_id } = req.body;
    const result1 = await Bid.getUserId(bid_id);
    const user_id = result1.user_id;
    const details = await Profile.findByUserId(user_id);
    const result2 = await Status.getResponse(bid_id);
    let status;
    if (result2) {
        const response = result2.response;
        if (response === 'yes') {
            status = 'Accepted';
        } else if (response === 'no') {
            status = 'Rejected';
        }
    } else {
        status = 'Pending';
    }
    res.render('web/pages/participatedstatus', { layout: "web/pages/participatedstatus", bid_id, details, status });
});
`}
      </pre>

      <div className="heading">b. participatedstatus.ejs Code</div>
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
        <div class="lg:text-5xl text-3xl text-yellow-400 lg:p-14 p-7 text-center">&lt; Participated Status &gt;</div>
        <form action="/participated-status" method="POST">
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
                    <div>Status</div>
                    <div class="lg:w-[415px] w-[300px] flex gap-4 lg:justify-start justify-center items-center">
                        <div class="bg-gradient-to-b from-cyan-700 to-cyan-900 rounded-lg lg:p-2 p-1 lg:w-[100px] w-[80px] text-center"><%= status %></div>
                    </div>
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

export default Day27;
