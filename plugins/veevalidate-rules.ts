import { configure, defineRule } from "vee-validate";

export default defineNuxtPlugin((nuxtApp) => {
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true,
  });

  defineRule("required", (value, target, ctx) => {
    if (value && value.toString().trim()) return true;
    else return parseMessage(ctx.field) + " is Required";
  });

  defineRule("email", (value: string, target, ctx) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
      return true;
    else return ctx.field + " is invalid";
  });
  defineRule("password", (value, target, ctx) => {
    if (value && value.toString().length > 5) return true;
    else return ctx.field + " must be 6+ chars";
  });
  defineRule("confirmPassword", (value, target: string, ctx) => {
    if (ctx.form[target] != value) return "Password does't match";
    else return true;
  });
  defineRule("phone", (value: string, target, ctx) => {
    if (
      /\d{9}/.test(value.toString().trim()) &&
      value.toString().trim().length === 9
    )
      return true;
    else return "invalid phonenumber!";
  });
  defineRule("uniquephone", (value, target: string, ctx) => {
    if (ctx.form[target] === value) return "please use different phonenumber!";
    else return true;
  });
});

function parseMessage(msg: string) {
  return msg.split("_").join(" ")
}
