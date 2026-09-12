const BOOK_IMAGES = [
  { src: "/saad-book/1.png", alt: "Saad Ahmed — Project Manager, The SocialNexus" },
  { src: "/saad-book/2.png", alt: "Thank you, Saad — TSN, a farewell" },
  { src: "/saad-book/3.png", alt: "From CEO, Osama Hashmi" },
  { src: "/saad-book/4.png", alt: "From HR, Amna Minhas" },
  { src: "/saad-book/7.png", alt: "From Manager, Hira" },
  { src: "/saad-book/5.png", alt: "From Senior Designer, Wafa Manan" },
  { src: "/saad-book/9.png", alt: "From Developer, Sharyar Ahmad" },
  { src: "/saad-book/8.png", alt: "From Dev, Hasan Munir" },
  { src: "/saad-book/10.png", alt: "From Developer, Muhammad Huzaifa" },
  { src: "/saad-book/6.png", alt: "From Developer, Saqalain Abid" },
  { src: "/saad-book/11.png", alt: "Best Employee award" },
  // { src: "/saad-book/12-fixed.png", alt: "The whole team, together" },
  { src: "/saad-book/13.png", alt: "Because you are our best employee — a last word from the company" },
  { src: "/saad-book/14.png", alt: "Saad Ahmed, Project Manager — same team, different chapters" },
];

export const PAGES: React.ReactNode[] = BOOK_IMAGES.map(({ src, alt }, i) => (
  <div key={src} className="relative h-full w-full overflow-hidden bg-envelope-shade">
    <img
      src={src}
      alt={alt}
      loading={i < 2 ? "eager" : "lazy"}
      className="h-full w-full object-cover"
    />
  </div>
));
