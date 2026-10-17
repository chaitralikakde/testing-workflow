import assert from "node:assert/strict";
import { pageFor } from "./course.mjs";

const html = pageFor({
  type: "checkout.session.completed",
  paid: true,
  student: "Maya",
  email: "maya@class.test",
  studentId: "stu_maya",
  course: "Intro to product design",
  fee: "$49",
});

function row(email) {
  const match = html.match(new RegExp(`data-email="${email}" data-status="([^"]+)" data-id="([^"]+)"`));
  return { status: match?.[1], id: match?.[2] };
}

const maya = row("maya@class.test");
const ava = row("ava@class.test");
const summary = `Maya=${maya.status}, Ava=${ava.status}`;

assert.equal(maya.status, "paid", `payment wrote the wrong row: ${summary}`);
assert.equal(ava.status, "unpaid", `payment wrote the wrong row: ${summary}`);
assert.equal(maya.id, "stu_maya");
assert.equal(ava.id, "stu_ava");
assert.equal(html.match(/data-email=/g)?.length, 2);
console.log("passed: Maya's payment updates Maya only");
