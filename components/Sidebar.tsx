import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

export default function Sidebar() {
  return (
    <aside
        className="
    hidden md:flex
    w-16 md:w-20
    bg-[#0f1724]
    rounded-2xl
    p-3 md:p-4
    flex-col gap-6 items-center
  "
    >
      <div className="w-10 h-10 rounded-xl bg-[#1e293b] text-white flex items-center justify-center">
        <WbSunnyOutlinedIcon />
      </div>
    </aside>
  );
}
