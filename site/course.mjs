export function pageFor(checkout) {
  let status;
  if (checkout.type === "checkout.session.completed" && checkout.paid === true) {
    status = "paid";
  } else {
    status = "waiting";
  }

  const label = status === "paid" ? "Paid" : "Unpaid";
  const tone = status === "paid" ? "paid" : "unpaid";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Maya's class</title>
  <style>
    :root { color-scheme: light; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      min-height: 100vh;
      font-family: Georgia, "Iowan Old Style", serif;
      background: #f3efe7;
      color: #1c1915;
    }
    main {
      max-width: 640px;
      margin: 0 auto;
      padding: 48px 20px 64px;
    }
    header p {
      margin: 0;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-family: "Segoe UI", sans-serif;
      font-size: 12px;
      color: #6d6458;
    }
    h1 { margin: 8px 0 28px; font-size: 40px; font-weight: 500; }
    .card {
      background: #fffdf9;
      border: 1px solid #e4dccf;
      border-radius: 18px;
      padding: 28px;
    }
    .row {
      display: flex;
      justify-content: space-between;
      gap: 16px;
      padding: 12px 0;
      border-top: 1px solid #efe8dc;
      font-family: "Segoe UI", sans-serif;
    }
    .row span { color: #6d6458; }
    .badge {
      margin-top: 22px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border-radius: 999px;
      padding: 8px 14px;
      font-family: "Segoe UI", sans-serif;
      font-weight: 650;
    }
    .badge.unpaid { background: #fde8e4; color: #9b2c1b; }
    .badge.paid { background: #e5f6ea; color: #146c36; }
    .note { margin: 18px 0 0; color: #6d6458; font-family: "Segoe UI", sans-serif; }
  </style>
</head>
<body>
  <main>
    <header>
      <p>Community course</p>
      <h1>Maya's class</h1>
    </header>
    <section class="card">
      <div class="row"><span>Student</span><strong>${checkout.student}</strong></div>
      <div class="row"><span>Course</span><strong>${checkout.course}</strong></div>
      <div class="row"><span>Fee</span><strong>${checkout.fee}</strong></div>
      <div class="row"><span>Stripe</span><strong>Fee received</strong></div>
      <div class="badge ${tone}" data-status="${status}">${label}</div>
      <p class="note">Maya paid the fees. This page should say paid.</p>
    </section>
  </main>
</body>
</html>`;
}
