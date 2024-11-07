export default (ops: any) => {
  let description = "";
  ops.map((element: any) => {
    description += element.insert;
  });
  return description;
};
