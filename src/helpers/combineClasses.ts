export default (...args: string[]) => {
  return args.filter((a) => a).join(" ");
};
