import { z } from "zod";

// Regex for Japanese characters (hiragana, katakana, kanji)
const jpRegex = /^[\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Han}ー]+$/u;

const wordSchema = z
  .string()
  .trim()
  .min(1, "単語を入力してください")
  .max(20, "20文字以内で入力してください")
  .regex(jpRegex, "日本語の文字のみ入力してください")
  .refine(
    (val) => !/^[ー]+$/.test(val),
    { message: "記号は使えません" }
);
  
export default wordSchema