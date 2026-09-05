import { bai01 } from "./exercises/bai01";
import { bai02 } from "./exercises/bai02";
import { bai03 } from "./exercises/bai03";
import { bai04 } from "./exercises/bai04";
import { bai05, simulateTask } from "./exercises/bai05";
import { bai06 } from "./exercises/bai06";
import { bai07 } from "./exercises/bai07";
import { bai08 } from "./exercises/bai08";
import { bai09 } from "./exercises/bai09";
import { bai10 } from "./exercises/bai10";
import { bai11 } from "./exercises/bai11";
import { bai12 } from "./exercises/bai12";
import { bai13 } from "./exercises/bai13";
import { bai14 } from "./exercises/bai14";
import { bai15 } from "./exercises/bai15";
import { bai16 } from "./exercises/bai16";
import { bai17 } from "./exercises/bai17";
import { bai18 } from "./exercises/bai18";
import { bai19 } from "./exercises/bai19";
import { bai20 } from "./exercises/bai20";
import { bai21 } from "./exercises/bai21";
import { bai22 } from "./exercises/bai22";
import { bai23 } from "./exercises/bai23";
import { bai24 } from "./exercises/bai24";
import { bai25 } from "./exercises/bai25";
import { bai26 } from "./exercises/bai26";
import { bai27 } from "./exercises/bai27";
import { bai28 } from "./exercises/bai28";
import { bai29 } from "./exercises/bai29";
import { bai30 } from "./exercises/bai30";

async function main() {
  console.log("================================================================");
  console.log("    TRUONG DAI HOC CONG NGHIEP TP. HO CHI MINH (IUH)");
  console.log("    MON HOC: LAP TRINH THIET BI DI DONG");
  console.log("    THUC HANH TUAN 02: ASYNC / AWAIT & PROMISE (30 BAI)");
  console.log("    SINH VIEN: LE CHUAN - MSSV: 23695731 - LOP: DHKTMP19B");
  console.log("================================================================\n");

  console.log("-------------------- BÀI 01 --------------------");
  const res01 = await bai01();
  console.log("Result:", res01);

  console.log("\n-------------------- BÀI 02 --------------------");
  const res02 = await bai02();
  console.log("Resolved number:", res02);

  console.log("\n-------------------- BÀI 03 --------------------");
  try {
    await bai03();
  } catch (err: any) {
    console.log("Caught expected error:", err.message);
  }

  console.log("\n-------------------- BÀI 04 --------------------");
  await bai04();

  console.log("\n-------------------- BÀI 05 --------------------");
  const res05 = await simulateTask(1500);
  console.log("Task message:", res05);

  console.log("\n-------------------- BÀI 06 --------------------");
  await bai06();

  console.log("\n-------------------- BÀI 07 --------------------");
  await bai07();

  console.log("\n-------------------- BÀI 08 --------------------");
  await bai08();

  console.log("\n-------------------- BÀI 09 --------------------");
  await bai09();

  console.log("\n-------------------- BÀI 10 --------------------");
  await bai10();

  console.log("\n-------------------- BÀI 11 --------------------");
  await bai11();

  console.log("\n-------------------- BÀI 12 --------------------");
  await bai12();

  console.log("\n-------------------- BÀI 13 --------------------");
  await bai13();

  console.log("\n-------------------- BÀI 14 --------------------");
  await bai14();

  console.log("\n-------------------- BÀI 15 --------------------");
  await bai15();

  console.log("\n-------------------- BÀI 16 --------------------");
  await bai16();

  console.log("\n-------------------- BÀI 17 --------------------");
  await bai17();

  console.log("\n-------------------- BÀI 18 --------------------");
  await bai18();

  console.log("\n-------------------- BÀI 19 --------------------");
  await bai19();

  console.log("\n-------------------- BÀI 20 --------------------");
  await bai20();

  console.log("\n-------------------- BÀI 21 --------------------");
  await bai21();

  console.log("\n-------------------- BÀI 22 --------------------");
  await bai22();

  console.log("\n-------------------- BÀI 23 --------------------");
  await bai23();

  console.log("\n-------------------- BÀI 24 --------------------");
  await bai24();

  console.log("\n-------------------- BÀI 25 --------------------");
  await bai25();

  console.log("\n-------------------- BÀI 26 --------------------");
  await bai26();

  console.log("\n-------------------- BÀI 27 --------------------");
  await bai27();

  console.log("\n-------------------- BÀI 28 --------------------");
  await bai28();

  console.log("\n-------------------- BÀI 29 --------------------");
  await bai29();

  console.log("\n-------------------- BÀI 30 --------------------");
  await bai30();

  console.log("\n================================================================");
  console.log("    DA HOAN THANH KIEM THU TRON VEN 30 BAI TAP ASYNC!");
  console.log("================================================================");
}

main().catch((err) => console.error("Error in main:", err));
