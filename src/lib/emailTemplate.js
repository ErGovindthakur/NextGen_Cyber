export const statusEmailTemplate = (name, status) => {
  return `
  <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:20px;">
    
    <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:10px;overflow:hidden;">
      
      <div style="background:#2563eb;color:white;padding:20px;text-align:center;">
        <h2>🚀 NextGen Cyber Cafe</h2>
      </div>

      <div style="padding:30px;">
        <h3>Hello ${name},</h3>

        <p style="font-size:15px;color:#444;">
          Your form has been processed by our team.
        </p>

        <div style="
          margin:20px 0;
          padding:15px;
          border-radius:8px;
          text-align:center;
          font-weight:bold;
          color:white;
          background:${status === "APPROVED" ? "#16a34a" : "#dc2626"};
        ">
          Status: ${status}
        </div>

        <p style="font-size:14px;color:#666;">
          ${
            status === "APPROVED"
              ? "Your form has been successfully approved. Our team will proceed further."
              : "Your form has been rejected. Please contact support or re-submit."
          }
        </p>

        <hr style="margin:25px 0;" />

        <p style="font-size:12px;color:#999;">
          Need help? Contact us anytime.
        </p>
      </div>

      <div style="background:#f1f5f9;padding:15px;text-align:center;font-size:12px;">
        © 2026 NextGen Cyber Cafe
      </div>

    </div>
  </div>
  `;
};