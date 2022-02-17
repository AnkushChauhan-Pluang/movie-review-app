const Tooltip = ({ text }) => {
  return (
    <span
      className="absolute -left-1/2 -bottom-9 m-2 w-max scale-0 rounded bg-neutral-600 px-2 py-1 text-xs font-semibold text-white
     shadow-md transition-all duration-100 group-hover:scale-100 "
    >
      {text}
    </span>
  );
};

export default Tooltip;
