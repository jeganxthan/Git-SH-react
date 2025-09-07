export const otpTemplate = (name: string, otp: string) => `
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
        color: #333333;
      "
    >
      <!-- Header -->
      <header>
        <table style="width: 100%;">
          <tbody>
            <tr>
              <td>
                <p
                  style="
                    font-size: 30px;
                    margin: 0;
                    font-weight: 600;
                    color: #2e44bf;
                  "
                >
                  GIT-SH
                </p>
              </td>
              <td style="text-align: right;">
                <span
                  style="font-size: 16px; line-height: 30px; color: #6c7ae0;"
                >
                  ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
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
            background-color: #e2e7ff;
            border-radius: 20px;
            text-align: center;
            border-top: 8px solid #2e44bf;
            max-width: 600px;
          "
        >
          <div style="max-width: 489px; margin: 0 auto;">
            <h1
              style="
                margin: 0;
                font-size: 24px;
                font-weight: 600;
                color: #2e2e2e;
              "
            >
              OTP Verification
            </h1>
            <p
              style="
                margin-top: 17px;
                font-size: 16px;
                font-weight: 500;
              "
            >
              Hey ${ name },
            </p>
            <p
              style="
                margin-top: 17px;
                font-size: 14px;
                font-weight: 400;
                color: #333;
              "
            >
              Use the following OTP to complete the procedure to change your email address. OTP is valid for
              <span style="font-weight: 600; color: #2e44bf;">5 minutes</span>.
            </p>
            <p
              style="
                margin-top: 50px;
                font-size: 20px;
                font-weight: 700;
                letter-spacing: 16px;
                color: #2e44bf;
              "
            >
              ${ otp }
            </p>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer
        style="
          width: 100%;
          max-width: 490px;
          margin: 40px auto 0;
          text-align: center;
          border-top: 1px solid #d0d7ff;
          padding-top: 16px;
        "
      >
        <p style="margin: 0; font-size: 13px; color: #888ea8;">
          &copy; ${new Date().getFullYear()} GIT-SH. All rights reserved.
        </p>
      </footer>
    </div>
  </body>
`;
