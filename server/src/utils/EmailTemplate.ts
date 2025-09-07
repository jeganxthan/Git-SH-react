<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Static Template</title>

    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
      rel="stylesheet"
    />
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body
    style="
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: #ffffff;
      font-size: 14px;
    "
  >
    <div
      style="
        max-width: 680px;
        margin: 0 auto;
        padding: 45px 30px 60px;
        background: #f4f7ff;
        background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
        background-repeat: no-repeat;
        background-size: 800px 452px;
        background-position: top center;
        font-size: 14px;
        color: #434343;
      "
    >
      <header>
        <table style="width: 100%;">
          <tbody>
            <tr style="height: 0;">
              <td>
                <p style="font-size:30px;
                margin-top: 0;
                font-weight: 500;
                color: #e6ebf1;">
                  GIT-SH
                </p>
              </td>
              <td style="text-align: right;">
                <span
                  style="font-size: 16px; line-height: 30px; color: #ffffff;"
                  >${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </header>

      <main>
        <div
         style="
  margin: 70px auto 0;
  padding: 92px 30px 115px;
  background-color: rgb(169, 164, 245);
  border-radius: 30px;
  text-align: center;
  border-top: 8px solid #2e44bf;
  max-width: 600px;
">
          <div style="width: 100%; max-width: 489px; margin: 0 auto;">
            <h1
              style="
                margin: 0;
                font-size: 24px;
                font-weight: 500;
                color: #1f1f1f;
              "
            >
              otp
            </h1>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              Hey ${name},
            </p>
            <p
              style="
                margin: 0;
                margin-top: 17px;
                font-weight: 500;
                letter-spacing: 0.56px;
              "
            >
              Use the following OTP to complete the procedure to change your email address. OTP is
              valid for
              <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>.
            </p>
            <p
              style="
                margin: 0;
                margin-top: 60px;
                font-size: 10px;
                font-weight: 600;
                letter-spacing: 25px;
                color: #8397d1;
              "
            >
              ${otp}
            </p>
          </div>
        </div>
      </main>

      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 20px auto 0;
          text-align: center;
          border-top: 1px solid #7f89e7;
        "
      >
        <p style="margin: 0; margin-top: 16px; color: #434343;">
          &copy; ${new Date().getFullYear()} GIT-SH. All rights reserved.
        </p>
      </footer>
    </div>
  </body>
</html>
