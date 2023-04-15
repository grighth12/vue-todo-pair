import { test, expect } from "@playwright/test";

test("인풋에 사용자의 입력값이 반영되어야 한다.", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("textbox", { name: /할 일을 입력하세요/ }).click();
  await page
    .getByRole("textbox", { name: /할 일을 입력하세요/ })
    .fill("안녕하세요");

  await expect(
    page.getByRole("textbox", { name: /할 일을 입력하세요/ })
  ).toHaveValue("안녕하세요");
});

test("사용자의 입력이 제출되면, 인풋은 초기화되어야 한다.", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("textbox", { name: "할 일을 입력하세요." }).click();
  await page
    .getByRole("textbox", { name: "할 일을 입력하세요." })
    .fill("할 일 A");
  await page.getByRole("button", { name: "제출하기" }).click();

  await expect(
    page.getByRole("textbox", { name: "할 일을 입력하세요." })
  ).toHaveValue("");
});

test("사용자의 입력이 제출되면, 할 일 목록에 추가되어야 한다.", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("textbox", { name: "할 일을 입력하세요." }).click();
  await page
    .getByRole("textbox", { name: "할 일을 입력하세요." })
    .fill("할 일 A");
  await page.getByRole("button", { name: "제출하기" }).click();

  const toDoListInnerTexts = await page
    .getByTestId("todo-list")
    .allInnerTexts();
  expect(toDoListInnerTexts.some((text) => text.match(/할 일 A/))).toBe(true);
});

test("빈 값을 제출한 경우, 오류 메세지가 출력되어야 한다.", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("textbox", { name: "할 일을 입력하세요." }).click();
  await page.getByRole("textbox", { name: "할 일을 입력하세요." }).fill("");
  await page.getByRole("button", { name: "제출하기" }).click();

  await expect(page.getByText("할 일을 입력해주세요.")).toBeVisible();
});

test.only("할 일의 체크박스를 체크하면, 완료 목록으로 이동해야 한다.", async ({
  page,
}) => {
  await page.goto("/");

  await page.getByRole("textbox", { name: "할 일을 입력하세요." }).click();
  await page
    .getByRole("textbox", { name: "할 일을 입력하세요." })
    .fill("할 일 A");
  await page.getByRole("button", { name: "제출하기" }).click();
  await page.getByRole("checkbox", { name: /할 일 A/ }).check();

  const toDoListInnerTexts = await page
    .getByTestId("done-list")
    .allInnerTexts();
  expect(toDoListInnerTexts.some((text) => text.match(/할 일 A/))).toBe(true);
});
// test("완료 목록의 할 일의 체크박스를 해제하면, 다시 할 일 목록으로 이동해야 한다.")
// test("할 일 목록의 할 일을 삭제하면, 할 일 목록에서 삭제되어야 한다.")
// test("완료 목록의 할 일을 삭제하면, 완료 목록에서 삭제되어야 한다.")
