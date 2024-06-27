export const EmailVerificationMail = (link) => {
   return  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            padding: 10px 0;
            background-color: #4CAF50;
            color: #ffffff;
            border-radius: 5px 5px 0 0;
        }
        .content {
            padding: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            background-color: #4CAF50;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            padding: 10px 0;
            color: #888888;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Email Verification</h1>
        </div>
        <div class="content">
            <p>Dear User,</p>
            <p>Thank you for registering with us. Please verify your email address by clicking the button below:</p>
            <a href=${link} class="button">Verify Email</a>
            <p>If you did not create an account, no further action is required.</p>
            <p>Best regards,</p>
            <p>@GraphCommunity</p>
        </div>
        <div class="footer">
            <img src="https://i.ibb.co/WV1NjFT/logo-2.png" width=200 />
            <p>&copy; ©2024 Garph Community. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
`;
}