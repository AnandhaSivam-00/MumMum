const nodemailer = require("nodemailer");
const pug = require("pug");
const htmlToText = require("html-to-text");
const Email = require("../utils/email");

// Mocking dependencies
jest.mock("nodemailer");
jest.mock("pug");
jest.mock("html-to-text");

describe("Email Service", () => {
  let sendMailMock;
  let user;
  let url;

  beforeEach(() => {
    // Set environment variables required by the Email class
    process.env.EMAIL_HOST = "smtp.mailtrap.io";
    process.env.EMAIL_PORT = "2525";
    process.env.EMAIL_USERNAME = "testuser";
    process.env.EMAIL_PASSWORD = "testpassword";
    process.env.EMAIL_FROM = "admin@example.com";

    // Clear all mocks before each test
    jest.clearAllMocks();

    // Set up mock for nodemailer
    sendMailMock = jest.fn().mockResolvedValue(true);
    nodemailer.createTransport.mockReturnValue({
      sendMail: sendMailMock,
    });

    // Set up mock for pug
    pug.renderFile.mockReturnValue("<h1>Mocked HTML</h1>");

    // Set up mock for html-to-text
    htmlToText.convert.mockReturnValue("Mocked Text");

    // Set up mock user and url
    user = {
      email: "test@example.com",
      name: "Test User",
    };
    url = "http://example.com";
  });

  afterEach(() => {
    // Delete environment variables after each test
    delete process.env.EMAIL_HOST;
    delete process.env.EMAIL_PORT;
    delete process.env.EMAIL_USERNAME;
    delete process.env.EMAIL_PASSWORD;
    delete process.env.EMAIL_FROM;
  });

  test("sendWelcome sends registration email correctly", async () => {
    const email = new Email(user, url);
    await email.sendWelcome();

    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: "smtp.mailtrap.io",
      port: "2525",
      secure: false, // 2525 != 465
      auth: {
        user: "testuser",
        pass: "testpassword",
      },
    });

    expect(pug.renderFile).toHaveBeenCalledWith(
      expect.stringContaining("welcome.pug"),
      {
        firstName: "Test",
        url: url,
        subject: "welcome to the Mum Mum!",
      }
    );

    expect(htmlToText.convert).toHaveBeenCalledWith("<h1>Mocked HTML</h1>");

    expect(sendMailMock).toHaveBeenCalledWith({
      from: "MumMum <admin@example.com>",
      to: "test@example.com",
      subject: "welcome to the Mum Mum!",
      html: "<h1>Mocked HTML</h1>",
      text: "Mocked Text",
    });
  });

  test("sendLogin sends login email correctly", async () => {
    const email = new Email(user, url);
    await email.sendLogin();

    expect(pug.renderFile).toHaveBeenCalledWith(
      expect.stringContaining("login.pug"),
      {
        firstName: "Test",
        url: url,
        subject: "New login to your Mum Mum account",
      }
    );

    expect(sendMailMock).toHaveBeenCalledWith({
      from: "MumMum <admin@example.com>",
      to: "test@example.com",
      subject: "New login to your Mum Mum account",
      html: "<h1>Mocked HTML</h1>",
      text: "Mocked Text",
    });
  });

  test("sendPasswordReset sends forgot password email correctly", async () => {
    const email = new Email(user, url);
    await email.sendPasswordReset();

    expect(pug.renderFile).toHaveBeenCalledWith(
      expect.stringContaining("passwordReset.pug"),
      {
        firstName: "Test",
        url: url,
        subject: "Password Reset Token (valid for only 10 minutes)",
      }
    );

    expect(sendMailMock).toHaveBeenCalledWith({
      from: "MumMum <admin@example.com>",
      to: "test@example.com",
      subject: "Password Reset Token (valid for only 10 minutes)",
      html: "<h1>Mocked HTML</h1>",
      text: "Mocked Text",
    });
  });

  test("sendOrderPlaced sends order placed email correctly", async () => {
    const email = new Email(user, url);
    const order = { id: "12345", total: 100 };
    await email.sendOrderPlaced(order);

    expect(pug.renderFile).toHaveBeenCalledWith(
      expect.stringContaining("orderPlaced.pug"),
      {
        firstName: "Test",
        url: url,
        subject: "Order Confirmation - Mum Mum",
        order: order,
      }
    );

    expect(sendMailMock).toHaveBeenCalledWith({
      from: "MumMum <admin@example.com>",
      to: "test@example.com",
      subject: "Order Confirmation - Mum Mum",
      html: "<h1>Mocked HTML</h1>",
      text: "Mocked Text",
    });
  });
});
