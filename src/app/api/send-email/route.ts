import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, contact, content, budget, schedule, reference_url, service_type } = body;

    // Verify environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("❌ Email environment variables are missing!");
      return NextResponse.json(
        { error: "Server configuration error: Missing email credentials" },
        { status: 500 },
      );
    }

    // SMTP Transporter setup
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
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

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("❌ Failed to send email:", error);
    return NextResponse.json(
      { error: "Failed to send email", details: error.message },
      { status: 500 },
    );
  }
}
