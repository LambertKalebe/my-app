import checkName from "./checkName";

async function isAdm() {
  const admList = ["Kalebe", "vinimontanhez"];
  const user = await checkName();

  return admList.includes(user);
}

export default isAdm;
