import assert from "node:assert/strict";
import { pageFor } from "./course.mjs";

const html = pageFor({
  type: "checkout.session.completed",
  paid: true,
  student: "Maya",
  course: "Intro to product design",
  fee: "$49",
});

const status = html.match(/data-status="([^"]+)"/)?.[1];
assert.equal(status, "paid");
console.log("passed: when Stripe says paid, the site shows paid");
