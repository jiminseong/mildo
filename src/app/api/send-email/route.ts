import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact, content, budget, schedule, reference_url, service_type } = body;

    // SMTP Transporter setup
    // NOTE: For Gmail, you might need an App Password if 2FA is on.
    const transporter = nodemailer.createTransport({
      service: "gmail", // You can change this to another service or use host/port
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "contact@mildolab.com",
      subject: `[밀도 문의] ${name}님의 새로운 문의입니다. (${service_type})`,
      html: `
        <h2>새로운 문의가 접수되었습니다.</h2>
        <p><strong>서비스 타입:</strong> ${service_type}</p>
        <p><strong>성함:</strong> ${name}</p>
        <p><strong>연락처:</strong> ${contact}</p>
        <p><strong>예산:</strong> ${budget || "미입력"}</p>
        <p><strong>일정:</strong> ${schedule || "미입력"}</p>
        <p><strong>참고 URL:</strong> ${reference_url || "없음"}</p>
        <hr />
        <h3>문의 내용</h3>
        <pre style="font-family: sans-serif; white-space: pre-wrap;">${content}</pre>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
