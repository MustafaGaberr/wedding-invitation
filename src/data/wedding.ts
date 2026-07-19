export const wedding = {
  couple: { first: "Mohanad", second: "Menna" },
  dateISO: "2026-08-08T20:00:00+03:00",
  displayDate: "08.08.2026",
  displayTime: "8 O'Clock",
  hero: { image: "/hero.png" },
  envelope: { image: "/envelope.jpg" },
  music: "/music.mpeg",
  heroQuoteAr: [
    "حتى تحترق النجوم وتفنى العوالم",
    "حتى تتصادم الكواكب وتذبل الشموس",
    "وحتى ينطفئ القمر وتجف البحار والأنهار",
    "حتى أشيخ فتتآكل ذكرياتي",
    "حتى يعجز لساني عن لفظ اسمك",
    "حتى ينبض قلبي للمرة الأخيرة",
    "فقط عند ذلك ربما أتوقف",
    "ربما",
  ],
  quoteAr: [
    "حتى تحترق النجوم وتفنى العوالم",
    "حتى تتصادم الكواكب وتذبل الشموس",
    "وحتى ينطفئ القمر وتجف البحار والأنهار",
    "حتى أشيخ فتتآكل ذكرياتي",
    "حتى يعجز لساني عن لفظ اسمك",
    "حتى ينبض قلبي للمرة الأخيرة",
    "فقط عند ذلك ربما أتوقف",
    "ربما",
  ],
  quoteClosing: "Forever and ever",
  welcome:
    "From the very first moment, we knew our story was meant to be celebrated. We would be honoured to have you with us as we begin this new chapter — surrounded by the people we love most.",
  story: [
    {
      title: "First Meeting",
      date: "July 2, 2024",
      images: ["/gallery/1.jpeg"],
      textParts: [
        {
          type: "en",
          value:
            "Our first day at Sumitomo. Neither of us ever imagined we'd end up here. We used to joke, “We'll never be like ",
        },
        { type: "ar", value: "الفلاحين دول" },
        {
          type: "en",
          value: " who meet at work and end up getting married.” Well... here we are. 🤍😂",
        },
      ],
    },
    {
      title: "Meeting Her Family",
      date: "May 9, 2025",
      images: ["/gallery/2.jpeg", "/gallery/3.jpeg"],
      textParts: [
        {
          type: "en",
          value:
            "The day I met the kindest and warmest family I could have ever wished for. Uncle, Auntie, Mazen, Merhan, Marwan... and of course, Mr. Amr. 😂 That day, I didn't just meet her family—I felt like I had found another home. 🤍",
        },
      ],
    },
    {
      title: "The Ring Ceremony",
      date: "June 13, 2025",
      images: ["/gallery/4.jpeg", "/gallery/5.jpeg"],
      textParts: [
        {
          type: "en",
          value:
            "While the world was busy with breaking news about the first strike between Israel and Iran, we were busy choosing our rings. 😂 Honestly, it felt like the whole world was about to catch fire just because we decided to get married. 😂",
        },
      ],
    },
    {
      title: "Our Engagement",
      date: "August 1, 2025",
      images: ["/gallery/6.jpeg"],
      textParts: [
        {
          type: "en",
          value:
            "Without a doubt, one of the most beautiful days of our lives... if not the most beautiful one. ♥️ A day filled with love, laughter, happy tears, and the promise of forever.",
        },
      ],
    },
    {
      title: "The Day of Our Forever",
      date: "August 8, 2026",
      images: ["/gallery/7.jpeg"],
      textParts: [
        {
          type: "en",
          value:
            "The day you'll stand beside us as we close one beautiful chapter and begin the most meaningful one of our lives. Our forever story begins here, and it wouldn't feel complete without you celebrating it with us. 🤍",
        },
      ],
    },
  ] as const,
  gallery: [
    "/gallery/1.jpeg",
    "/gallery/2.jpeg",
    "/gallery/3.jpeg",
    "/gallery/4.jpeg",
    "/gallery/5.jpeg",
    "/gallery/6.jpeg",
    "/gallery/7.jpeg",
  ],
  venue: {
    startsAt: "8 PM",
    endsAt: "11 PM",
    name: "AQUA HOUSE CLUB",
    lines: ["KORNISH EL MAADI", "VENICIA"],
    qr: "/qrcode.png",
    mapsUrl: "https://www.google.com/maps?q=29.9400801,31.2742301&z=17&hl=en",
  },
  schedule: [
    {
      time: "8:00 PM",
      title: "Reception",
      note: "Guest Arrival",
      description: "Welcome, find your seat, and get ready to celebrate with us.",
    },
    {
      time: "8:30 PM",
      title: "Katb El Ketab",
      note: "The Beginning of Our Forever",
      description: "The moment we officially become husband and wife.",
    },
    {
      time: "9:00 PM",
      title: "Congratulations",
      note: "Celebrate With Us",
      description:
        "Share this special moment with us, exchange hugs, smiles, and heartfelt congratulations.",
    },
    {
      time: "9:20 PM",
      title: "Live Music",
      note: "Music That Speaks to the Heart",
      description: "Enjoy a selection of beautiful live violin melodies and heartfelt songs.",
    },
    {
      time: "9:45 PM",
      title: "Making Memories",
      note: "Capture Every Smile",
      description:
        "Take photos with us, leave us a message, record a voice note, and share your favorite moments using the QR code.",
    },
    {
      time: "10:00 PM",
      title: "High Tea",
      note: "Eat, Talk & Celebrate",
      description:
        "Let's enjoy delicious food, warm conversations, and a wonderful evening together.",
    },
    {
      time: "10:45 PM",
      title: "Bouquet Toss",
      note: "A Little Tradition & A Lot of Fun",
      description: "Let's see who might be celebrating next! 💐",
    },
    {
      time: "10:50 PM",
      title: "Our Wish sky lantern",
      note: "One Wish, One Forever",
      description: "A quiet moment for us to make a wish for the beautiful journey ahead.",
    },
    {
      time: "11:00 PM",
      title: "Farewell",
      note: "Until We Meet Again",
      description: "Thank you for being part of one of the most meaningful days of our lives. 🤍",
    },
  ],
  noteAr:
    "أحم… إحنا عارفين إنه فرح والله، بس طريقتنا في الفرحة هتكون بوجودكم معانا أكتر من أي حاجة، فخلّونا نفرح سوا من غير ما نرقص.\nساعدونا نبدأ أول يوم في حياتنا بداية جميلة 🤍",
};

export type StoryEvent = (typeof wedding.story)[number];
