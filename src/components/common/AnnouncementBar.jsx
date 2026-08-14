export default function AnnouncementBar() {
  return (
    <div className="w-full bg-gentro-black text-gentro-white">
      <div className="container-gentro py-2 text-center">
        <p className="text-xs sm:text-sm tracking-gentro-wide uppercase font-medium">
          <span className="hidden xs:inline">
            FREE SHIPPING ON ORDERS OVER ৳2000 · SECURE CHECKOUT · 7-DAY EASY RETURNS
          </span>
          <span className="inline xs:hidden">
            FREE SHIPPING ON ORDERS OVER ৳2000
          </span>
        </p>
      </div>
    </div>
  )
}
