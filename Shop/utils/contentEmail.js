module.exports = function (link) {
  return `
  <div>
  <table
    cellpadding="0"
    cellspacing="0"
    style="
      font-family: Open Sans, -apple-system, BlinkMacSystemFont, Roboto,
        Helvetica Neue, Helvetica, Arial, sans-serif;
      border-collapse: collapse;
      width: 100%;
      background: #fff;
      border-radius: 3px;
      border: 1px solid #f0f0f0;
    "
  >
    <tbody>
      <tr>
        <td
          style="
            font-family: Open Sans, -apple-system, BlinkMacSystemFont, Roboto,
              Helvetica Neue, Helvetica, Arial, sans-serif;
          "
        >
          <table
            cellpadding="0"
            cellspacing="0"
            style="
              font-family: Open Sans, -apple-system, BlinkMacSystemFont, Roboto,
                Helvetica Neue, Helvetica, Arial, sans-serif;
              border-collapse: collapse;
              width: 100%;
            "
          >
            <tbody>
              <tr>
                <td
                  style="
                    font-family: Open Sans, -apple-system, BlinkMacSystemFont,
                      Roboto, Helvetica Neue, Helvetica, Arial, sans-serif;
                    padding: 40px 48px;
                  "
                >
                  <h1
                    style="
                      margin: 0 0 0.5em;
                      font-size: 28px;
                      font-weight: 300;
                      line-height: 130%;
                    "
                  >
                    Hello!
                  </h1>
                  <p>
                    Please click the button below to verify your email address.
                  </p>
                  <table
                    cellspacing="0"
                    cellpadding="0"
                    style="
                      font-family: Open Sans, -apple-system, BlinkMacSystemFont,
                        Roboto, Helvetica Neue, Helvetica, Arial, sans-serif;
                      border-collapse: collapse;
                      width: 100%;
                    "
                  >
                    <tbody>
                      <tr>
                        <td
                          align="center"
                          style="
                            font-family: Open Sans, -apple-system,
                              BlinkMacSystemFont, Roboto, Helvetica Neue,
                              Helvetica, Arial, sans-serif;
                          "
                        >
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            border="0"
                            style="
                              font-family: Open Sans, -apple-system,
                                BlinkMacSystemFont, Roboto, Helvetica Neue,
                                Helvetica, Arial, sans-serif;
                              background-color: #467fcf;
                              color: #fff;
                              border-radius: 3px;
                              width: auto;
                              border-collapse: separate;
                            "
                          >
                            <tbody>
                              <tr>
                                <td
                                  align="center"
                                  valign="top"
                                  style="
                                    font-family: Open Sans, -apple-system,
                                      BlinkMacSystemFont, Roboto, Helvetica Neue,
                                      Helvetica, Arial, sans-serif;
                                    line-height: 100%;
                                  "
                                >
                                  <a
                                    href="${link}"
                                    style="
                                      text-decoration: none;
                                      white-space: nowrap;
                                      font-weight: 600;
                                      font-size: 16px;
                                      padding: 12px 32px;
                                      border-radius: 3px;
                                      line-height: 100%;
                                      display: block;
                                      border: 1px solid transparent;
                                      background-color: #467fcf;
                                      color: #fff;
                                      border-color: #467fcf;
                                    "
                                    target="_blank"
                                  >
                                    <span
                                      style="
                                        color: #fff;
                                        font-size: 16px;
                                        text-decoration: none;
                                        white-space: nowrap;
                                        font-weight: 600;
                                        line-height: 100%;
                                      "
                                      >Verify Email Address</span
                                    >
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <p>
                    If you did not create an account, no further action is
                    required.
                  </p>
                  <p>
                    Regards,<br />
                    InfinityFree
                  </p>

                  <p>
                    If you're having trouble clicking the "Verify Email Address"
                    button, copy and paste the URL below into your web browser:
                    <span>
                      <a
                        href="${link}"
                        style="color: #467fcf; text-decoration: none"
                        target="_blank"
                      >${link}</a>
                    </span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>
</div>

  `;
};
