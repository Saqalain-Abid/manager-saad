import Image from "next/image";

const BOOK_IMAGES = [
  {
    src: "/saad-book/1.webp",
    alt: "Saad Ahmed — Project Manager, The SocialNexus",
    blurDataURL:
      "data:image/webp;base64,UklGRnwAAABXRUJQVlA4IHAAAABwAgCdASoMABAAA4BaJbACdAYw7zDEaPLnRjogAP21GmT/vcMc2kqZ7KThCezXHGAViy7qwODcvGt/q9NGa32krGp0IU08nzWmnC+4yCMiHR1WJmAt+hvXSW1x7gXiuWJVpaHJHrbec7dy/ZoQwAAA",
  },
  {
    src: "/saad-book/2.webp",
    alt: "Thank you, Saad — TSN, a farewell",
    blurDataURL:
      "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAAAwAgCdASoMABAAA4BaJYwCsAYvNv7xS/CvwAD+9xFGEWfTrvWySiEqNa24AOxVll5JS2whQ58D7CeOlryp/7WlQ0/QleIHzniWR7+9ryszp7SRQov3xDkxai4AAA==",
  },
  {
    src: "/saad-book/3.webp",
    alt: "From CEO, Osama Hashmi",
    blurDataURL:
      "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAADwAQCdASoMABAAA4BaJYgAAu1n4DJxxBAA/vUFCR6RmsRcyuQeUAi6i9ikiRIuBF2H9/a1WrZU9PqHmDjaHWS4TOmnBGbiK1p+OZtKRFQFgmQG81aok7+EJC7DEAAA",
  },
  {
    src: "/saad-book/4.webp",
    alt: "From HR, Amna Minhas",
    blurDataURL:
      "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAABQAgCdASoMABAAA4BaJbACsAYuRlajxI2Z+gAA/vPO58/Lo7zKTBGJ3a6tjuz9dFCEr3L/erdOwincexzLso2ca41jAMB5SCzlDBC03/eMHgrJqxqT7pmpWDIsvaGrAAA=",
  },
  {
    src: "/saad-book/5.webp",
    alt: "From Senior Designer, Wafa Manan",
    blurDataURL:
      "data:image/webp;base64,UklGRm4AAABXRUJQVlA4IGIAAABQAgCdASoMABAAA4BaJZgC7AYu5lb4E5G59QAA/vOvFUx+wd1ZzKermfKfsUqIY8Qj4FFoyc8spzooA8zMnuQRS1P1G2e7zfBFVqiAhcmOqZoVYsfHaiQtdF2qYJNYCIoAAA==",
  },
  {
    src: "/saad-book/7.webp",
    alt: "From Manager, Hira",
    blurDataURL:
      "data:image/webp;base64,UklGRmoAAABXRUJQVlA4IF4AAAAQAgCdASoMABAAA4BaJbACsAED+YjGM5BAAP7yPi8/Mzj+1F4EDA2bN7cZUTfndv3Jk0P1ECtZrnyzTIjrRiIbTtkBNlBvBbZrbNCqBqPj66fAQCmrlkPBpLIhgAAA",
  },
  {
    src: "/saad-book/9.webp",
    alt: "From Developer, Sharyar Ahmad",
    blurDataURL:
      "data:image/webp;base64,UklGRmgAAABXRUJQVlA4IFwAAAAQAgCdASoMABAAA4BaJZAAAt0OPGuJgrYAAP7yPakbhbuHg/6NLPxBFXBL9MtKRMM5oyltxx/FbjpyYhqdpkx+eJdiAeFHG2g0qRe5qjTCn39gmar5W/I34oAAAA==",
  },
  {
    src: "/saad-book/8.webp",
    alt: "From Dev, Hasan Munir",
    blurDataURL:
      "data:image/webp;base64,UklGRmYAAABXRUJQVlA4IFoAAAAQAgCdASoMABAAA4BaJZgAAxOfV6h1gq1AAP7yPakbhbLA04zDgD3CZvoFRqE9Cm1xmxuewDISvDVtasPfszuU95FsBdQRN1Rw9Y4bGBvN5VfK35G/UhU4AAA=",
  },
  {
    src: "/saad-book/10.webp",
    alt: "From Developer, Muhammad Huzaifa",
    blurDataURL:
      "data:image/webp;base64,UklGRmIAAABXRUJQVlA4IFYAAADQAQCdASoMABAAA4BaJQAAW6GTV1k4AAD+89BOWTzTqeZA6vn8NpKH/faGR1k6YJ8ZrVXZe9tm7958EmR8Z+Q41fJfZo+Gom7XBLfj9F38ISF2GIAAAA==",
  },
  {
    src: "/saad-book/6.webp",
    alt: "From Developer, Saqalain Abid",
    blurDataURL:
      "data:image/webp;base64,UklGRmwAAABXRUJQVlA4IGAAAAAQAgCdASoMABAAA4BaJZgC7AEPAuoJOnDAAP71BQil4yB3h14eFCxNevgIZ4WcMAiO9f71gdgCWzw9+2WczNISP7GcbMlVj7L6LRlfa6sWTRi6nfkcxmedISF2ktDAAAA=",
  },
  {
    src: "/saad-book/11.webp",
    alt: "Best Employee award",
    blurDataURL:
      "data:image/webp;base64,UklGRoIAAABXRUJQVlA4IHYAAAAwAgCdASoMABAAA4BaJYgCdAYu5vWLzJxyuAD+88ljbky0dWhvrvculIyO7y1pdYsejMJbCienQh7hjiV0giujJW0MT9rtbWP1jJSo0kubgXvul3Tcu365mUzmem5fJ96htonhhDATVaMXwn1k5ItJG8WigAAA",
  },
  {
    src: "/saad-book/13.webp",
    alt: "Because you are our best employee — a last word from the company",
    blurDataURL:
      "data:image/webp;base64,UklGRnQAAABXRUJQVlA4IGgAAAAQAgCdASoMABAAA4BaJQBOgCB/7IZ7YbsAAP71IydOeALZCnw1WK78gtSfdTWREhjapdhiAt11XoJLR7VZed/Qp8WJgVWu3psaQUWwK1/YFCv/3PhLgyxzxILrDNYUDoOr0ndceEeAAA==",
  },
  {
    src: "/saad-book/14.webp",
    alt: "Saad Ahmed, Project Manager — same team, different chapters",
    blurDataURL:
      "data:image/webp;base64,UklGRnAAAABXRUJQVlA4IGQAAAAQAgCdASoMABAAA4BaJQBdgCPg+cAFjjKAAP7uPpvLr0tAPy9gBmZN6WCunX7HGSHEMGoJJPggahMxfYzJW1vlVTHoLInob1Yy3qGW4JqtwoQL085l8et8pCr48zG6CONCCAAA",
  },
];

export const PAGES: React.ReactNode[] = BOOK_IMAGES.map(
  ({ src, alt, blurDataURL }, i) => (
    <div key={src} className="relative h-full w-full overflow-hidden bg-envelope-shade">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 88vw, min(560px, 76vh)"
        className="object-cover"
        placeholder="blur"
        blurDataURL={blurDataURL}
        preload={i < 2}
        loading={i < 2 ? "eager" : "lazy"}
      />
    </div>
  )
);
