
function isNonEmptyString(v, min = 1) {
  return typeof v === "string" && v.trim().length >= min;
}

function isMobile(v) {
  return /^[0-9]{10,15}$/.test(v || "");
}

function isStrongPassword(v) {
  return typeof v === "string" && v.length >= 6;
}

module.exports = { isNonEmptyString, isMobile, isStrongPassword };
