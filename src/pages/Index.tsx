import { Hotel, Trees, Coffee, Bed, Mountain, Binoculars, UtensilsCrossed, Tent, Home, Church, Instagram, Camera } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import CategorySection from "@/components/CategorySection";
import PlaceCard from "@/components/PlaceCard";
import Footer from "@/components/Footer";
import CompactControlBar from "@/components/CompactControlBar";
import BackToTop from "@/components/BackToTop";
import { useLanguage } from "@/contexts/LanguageContext";


const Index = () => {
  const { lang, t } = useLanguage();
  const path = typeof window !== "undefined" ? window.location.pathname.replace(/\/+$/, "") || "/" : "/";
  const isRootPath = path === "/" || path === "/faifa-gateway";

  return (
    <>
      <div className="min-h-screen bg-background" dir={lang === "ar" ? "rtl" : "ltr"}>
        {isRootPath && <Header />}
        <Navigation />
        <CompactControlBar />

        <main id="discover" className="container mx-auto px-4 md:px-8 py-4 space-y-4">

        {/* Hotels Section */}
        <CategorySection
          id="hotels"
          title={t("الفنادق", "Hotels")}
          icon={<Hotel />}
        >
          <PlaceCard
            title="فندق جارة الغيم – Jarat Al Gheim Hotel"
            description="يضم الفندق مقهى ومطلًا في الطابق العلوي."
            englishDescription="Rooftop café with a panoramic view."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%81%D9%86%D8%AF%D9%82%20%D8%AC%D8%A7%D8%B1%D8%A9%20%D8%A7%D9%84%D8%BA%D9%8A%D9%85%20%E2%80%93%20Jarat%20Al%20Gheim%20Hotel%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJJfW_SAwL_RURP4zchhlsRRM"
            icon={<Bed />}
          />
          <PlaceCard
            title="فندق فيفاء الفاخر – Faifa Luxury Hotel"
            description="يضم الفندق مقهى ومطلًا في الطابق العلوي."
            englishDescription="Rooftop café with a scenic view."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%81%D9%86%D8%AF%D9%82%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1%20%D8%A7%D9%84%D9%81%D8%A7%D8%AE%D8%B1%20%E2%80%93%20Faifa%20Luxury%20Hotel%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJYzGU3XgL_RUROH_ozRuHUsg"
            icon={<Bed />}
          />
          <PlaceCard
            title="فندق إيوان – Iwan Hotel"
            description="يضم الفندق مقهى ومطلًا في الطابق العلوي."
            englishDescription="Rooftop café with a scenic view."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%81%D9%86%D8%AF%D9%82%20%D8%A5%D9%8A%D9%88%D8%A7%D9%86%20%E2%80%93%20Iwan%20Hotel%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJJ9IjBAAN_RURcDbBphS0Gjo"
            icon={<Bed />}
          />
          <PlaceCard
            title="بيت سهلان"
            description="بيت تراثي أُعيد تأهيله بلمسات عصرية تحافظ على الهوية الفيفية الأصيلة."
            englishDescription="An old house renovated with a modern touch and authentic Faifa identity."
            additionalContent={
              <a 
                href="https://www.instagram.com/bieatsahlan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex max-w-full items-center justify-center gap-1.5 rounded-xl border border-fuchsia-400/25 bg-fuchsia-500/10 px-2.5 py-2 text-[10px] font-medium leading-snug text-fuchsia-300 transition-colors hover:border-fuchsia-400/50 hover:bg-fuchsia-500/20 sm:px-3 sm:text-xs"
              >
                <Instagram size={14} className="shrink-0" />
                <span>للحجز عبر إنستقرام</span>
              </a>
            }
            mapLink="https://www.google.com/maps/search/?api=1&query=%D8%A8%D9%8A%D8%AA%20%D8%B3%D9%87%D9%84%D8%A7%D9%86%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJBf7W054L_RURB0jVNOcdRU8"
            icon={<Home />}
          />
          <PlaceCard
            title="أكواخ الندى"
            description="أكواخ للإقامة في فيفاء، توفر تجربة مبيت وسط الطبيعة الجبلية."
            englishDescription="Cabin accommodation amid Faifa's mountain scenery."
            mapLink="https://www.google.com/maps/search/?api=1&query=Al%20Nada%20Cabins%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJBRZxYwAL_RUR2dSSKpb-7tU"
            icon={<Home />}
          />
          <PlaceCard
            title="شاليه فيفا – Viva Cottage"
            description="شاليه للإقامة والاستراحة في أجواء فيفاء الجبلية."
            englishDescription="A private cottage for stays and relaxation in Faifa."
            mapLink="https://www.google.com/maps/search/?api=1&query=Viva%20Cottage%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJVVP4m3UN_RURJr6GKR8LRnc"
            icon={<Home />}
          />
          <PlaceCard
            title="سكني"
            description="وحدات سكنية للإقامة على شارع السربة في فيفاء."
            englishDescription="Accommodation units on Al-Sarbah Street in Faifa."
            mapLink="https://www.google.com/maps/search/?api=1&query=Sakani%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJ9ejhLM8L_RUReFAuNZ7IDqc"
            icon={<Bed />}
          />
          <PlaceCard
            title="الوادي الأخضر للغرف والشقق"
            description="غرف وشقق للإقامة على طريق الملك عبدالله بن عبدالعزيز في فيفاء."
            englishDescription="Rooms and apartments on King Abdullah bin Abdulaziz Road."
            mapLink="https://www.google.com/maps/search/?api=1&query=Alwadi%20Alakhdar%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJ0VukEwAN_RURSRxQ5qK0u3I"
            icon={<Bed />}
          />
          <PlaceCard
            title="الدثنة للشقق المفروشة"
            description="شقق مفروشة للإقامة في منطقة غمان بفيفاء."
            englishDescription="Furnished apartments in the Ghumman area of Faifa."
            mapLink="https://www.google.com/maps/search/?api=1&query=Al%20Dathnah%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJVY1bGZsL_RURb6IxmnImSOw"
            icon={<Bed />}
          />
          <PlaceCard
            title="السحاب فيو"
            description="منشأة إقامة في فيفاء مدرجة ضمن خيارات المبيت على الخرائط."
            englishDescription="An accommodation option listed in Faifa."
            mapLink="https://www.google.com/maps/search/?api=1&query=Al%20Sahab%20View%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJe213Y7gL_RURJpXe1zJbocE"
            icon={<Bed />}
          />
          <PlaceCard
            title="فيفاء للوحدات السكنية"
            description="وحدات سكنية مفروشة تناسب الباحثين عن إقامة في فيفاء."
            englishDescription="Furnished accommodation units in Faifa."
            mapLink="https://www.google.com/maps/search/?api=1&query=Fayfa%20Residential%20Units%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJ8Qt9GH8L_RUR4tqnQurpXKA"
            icon={<Bed />}
          />
          <PlaceCard
            title="مطل الحبيل"
            description="وحدات إقامة بإطلالة جبلية في فيفاء، مناسبة للاستراحة والمبيت."
            englishDescription="Mountain-view holiday accommodation in Faifa."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%85%D8%B7%D9%84%20%D8%A7%D9%84%D8%AD%D8%A8%D9%8A%D9%84%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJZUjfbAAN_RURZzrZ5oQnsKw"
            icon={<Home />}
          />
          <PlaceCard
            title="شاليه اللعثة"
            description="شاليه للإقامة وسط جبال فيفاء بإطلالة طبيعية وأجواء هادئة."
            englishDescription="A peaceful mountain-view chalet for a stay in Faifa."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D8%B4%D8%A7%D9%84%D9%8A%D9%87%20%D8%A7%D9%84%D9%84%D8%B9%D8%AB%D8%A9%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJjfCPSAAN_RURTJDqRYZO_EI"
            icon={<Home />}
          />
        </CategorySection>

        {/* Parks Section */}
        <CategorySection
          id="parks"
          title={t("المنتزهات", "Parks & Resorts")}
          icon={<Trees />}
        >
          <PlaceCard
            title="منتزه وإطلالة الخطم – Al-Khatm Park & Viewpoint"
            description="منتزه عائلي يتيح الاستمتاع بإطلالات على جبال فيفاء."
            englishDescription="Family-friendly park with great views."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%85%D9%86%D8%AA%D8%B2%D9%87%20%D9%88%D8%A5%D8%B7%D9%84%D8%A7%D9%84%D8%A9%20%D8%A7%D9%84%D8%AE%D8%B7%D9%85%20%E2%80%93%20Al-Khatm%20Park%20%26%20Viewpoint%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJ0S-FYgAL_RURDFfl15IKUBs"
            icon={<Mountain />}
          />
          <PlaceCard
            title="سوق النفيعة الشعبي"
            description="سوق شعبي يتيح التعرف على المنتجات المحلية وأجواء التسوق في فيفاء."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D8%B3%D9%88%D9%82%20%D8%A7%D9%84%D9%86%D9%81%D9%8A%D8%B9%D8%A9%20%D8%A7%D9%84%D8%B4%D8%B9%D8%A8%D9%8A%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJ2S9lTgAL_RURBexSPhTtbWM"
            icon={<Trees />}
          />
          <PlaceCard
            title="منتجع الباخرة – Al-Bakhira Resort"
            description="منتجع في فيفاء للاستراحة والاستمتاع بالأجواء الجبلية."
            englishDescription="A resort for relaxation amid Faifa’s mountain scenery."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%85%D9%86%D8%AA%D8%AC%D8%B9%20%D8%A7%D9%84%D8%A8%D8%A7%D8%AE%D8%B1%D8%A9%20%E2%80%93%20Al-Bakhira%20Resort%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJWcyJndQN_RURHpyLNhDeO1Y"
            icon={<Tent />}
          />
          <PlaceCard
            title="ممشى البن الخولاني – Khawlani Coffee Trail"
            description="ممشى سياحي مرتبط بتراث زراعة البن الخولاني."
            englishDescription="Coffee heritage walking trail."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%85%D9%85%D8%B4%D9%89%20%D8%A7%D9%84%D8%A8%D9%86%20%D8%A7%D9%84%D8%AE%D9%88%D9%84%D8%A7%D9%86%D9%8A%20%E2%80%93%20Khawlani%20Coffee%20Trail%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJifw28oYL_RURLDMNgNGl3VE"
            icon={<UtensilsCrossed />}
          />
          <PlaceCard
            title="مطل الدفرة – Al-Dafrah Viewpoint"
            description="مطل يتيح مشاهدة المناظر الجبلية في فيفاء."
            englishDescription="A viewpoint overlooking Faifa’s mountain scenery."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%85%D8%B7%D9%84%20%D8%A7%D9%84%D8%AF%D9%81%D8%B1%D8%A9%20%E2%80%93%20Al-Dafrah%20Viewpoint%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJFXNJ1nML_RURD30ckEfyRrs"
            icon={<Binoculars />}
          />
          <PlaceCard
            title="مطل قرضة – Qarza Viewpoint"
            description="موقع لمشاهدة جبال فيفاء والتقاط الصور."
            englishDescription="A spot for mountain views and photography in Faifa."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%85%D8%B7%D9%84%20%D9%82%D8%B1%D8%B6%D8%A9%20%E2%80%93%20Qarza%20Viewpoint%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJTzUfMBN1_RURYI0ii4gk1mE"
            icon={<Binoculars />}
          />
          <PlaceCard
            title="إطلالة فيفا"
            description="مطل على طريق الأمير نايف يتيح مشاهدة المناظر الجبلية والتقاط الصور."
            englishDescription="A viewpoint on Prince Nayef Road overlooking the mountains."
            mapLink="https://www.google.com/maps/search/?api=1&query=Itlalat%20Fayfa%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJX85pNwAL_RURobW0_6Zxh7I"
            icon={<Binoculars />}
          />
          <PlaceCard
            title="مزرعة المقبلات العليا للبن السعودي"
            description="مزرعة بن سعودية في فيفاء، تتميز بالمدرجات الزراعية والأجواء الريفية."
            englishDescription="A Saudi coffee farm in Faifa with scenic agricultural terraces."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%85%D8%B2%D8%B1%D8%B9%D8%A9%20%D8%A7%D9%84%D9%85%D9%82%D8%A8%D9%84%D8%A7%D8%AA%20%D8%A7%D9%84%D8%B9%D9%84%D9%8A%D8%A7%20%D9%84%D9%84%D8%A8%D9%86%20%D8%A7%D9%84%D8%B3%D8%B9%D9%88%D8%AF%D9%8A%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJNf7lasEL_RURY5dd-I8umNk"
            icon={<Trees />}
          />
          <PlaceCard
            title="حديقة البلدية"
            description="حديقة وممشى في منطقة الجوة بفيفاء، مناسبة للتنزه والمشي."
            englishDescription="A municipal garden and walking area in Al-Jawwah, Faifa."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D8%AD%D8%AF%D9%8A%D9%82%D8%A9%20%D8%A7%D9%84%D8%A8%D9%84%D8%AF%D9%8A%D8%A9%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJ-Y4cNooJ_RURb9Tf8oqNrbw"
            icon={<Trees />}
          />
          <PlaceCard
            title="منتزه مطل بردان"
            description="مطل ومنتزه جبلي في بردان للاستمتاع بالمشاهد الطبيعية."
            englishDescription="A mountain viewpoint and park in Bardan."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%85%D9%86%D8%AA%D8%B2%D9%87%20%D9%85%D8%B7%D9%84%20%D8%A8%D8%B1%D8%AF%D8%A7%D9%86%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJ6x4UCQAL_RURUA4JBKo2cGI"
            icon={<Binoculars />}
          />
          <PlaceCard
            title="مزرعة فيفاء لإنتاج البن"
            description="مزرعة لإنتاج البن السعودي في مدرجات فيفاء الزراعية، مستقلة في الدليل عن ممشى البن."
            englishDescription="A Saudi coffee farm on Faifa's agricultural terraces."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%85%D8%B2%D8%B1%D8%B9%D8%A9%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1%20%D9%84%D8%A5%D9%86%D8%AA%D8%A7%D8%AC%20%D8%A7%D9%84%D8%A8%D9%86%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJ04nG6qkL_RURwR7QzNpxvKM"
            icon={<Trees />}
          />
        </CategorySection>

        {/* Cafes Section */}
        <CategorySection
          id="cafes"
          title={t("الكافيهات", "Cafés")}
          icon={<Coffee />}
        >
          <PlaceCard
            title="مقهى جارة القمر – Jarat Al-Qamar Café"
            description="إطلالة مميزة على جبال فيفاء."
            englishDescription="Unique view of Faifa mountains."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%85%D9%82%D9%87%D9%89%20%D8%AC%D8%A7%D8%B1%D8%A9%20%D8%A7%D9%84%D9%82%D9%85%D8%B1%20%E2%80%93%20Jarat%20Al-Qamar%20Caf%C3%A9%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJr1A1u4IL_RURuzkyGgZ9gXQ"
            icon={<Coffee />}
          />
          <PlaceCard
            title="مقهى جارة الغيم – Jarat Al-Ghaim Café"
            description="مقهى بإطلالة مرتفعة على الجبال."
            englishDescription="Mountaintop view from above."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%85%D9%82%D9%87%D9%89%20%D8%AC%D8%A7%D8%B1%D8%A9%20%D8%A7%D9%84%D8%BA%D9%8A%D9%85%20%E2%80%93%20Jarat%20Al-Ghaim%20Caf%C3%A9%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJJfW_SAwL_RURP4zchhlsRRM"
            icon={<Coffee />}
          />
          <PlaceCard
            title="مقهى ومطل إيوان – Iwan Café & Viewpoint"
            description="مقهى مع جلسات مطلة على الطبيعة الجبلية."
            englishDescription="Café with a beautiful scenic view."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%85%D9%82%D9%87%D9%89%20%D9%88%D9%85%D8%B7%D9%84%20%D8%A5%D9%8A%D9%88%D8%A7%D9%86%20%E2%80%93%20Iwan%20Caf%C3%A9%20%26%20Viewpoint%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJJ9IjBAAN_RURcDbBphS0Gjo"
            icon={<Coffee />}
          />
          <PlaceCard
            title="مقهى سكون"
            description="مقهى يوفر جلسات بإطلالة على جبال فيفاء."
            englishDescription="Beautiful and amazing view of the mountains."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%85%D9%82%D9%87%D9%89%20%D8%B3%D9%83%D9%88%D9%86%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJT0ZqXwAL_RURYa283CoExWk"
            icon={<Coffee />}
          />
          <PlaceCard
            title="كافيه تالقة"
            description="مقهى يحمل اسمًا مستوحى من شجرة معمّرة في جبال فيفاء."
            englishDescription="New and beautiful café named after an ancient tree in the mountain."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%83%D8%A7%D9%81%D9%8A%D9%87%20%D8%AA%D8%A7%D9%84%D9%82%D8%A9%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJ0wr7IwAN_RURRnYq0byhnV0"
            icon={<Coffee />}
          />
          <PlaceCard
            title="لب القهوة"
            description="مقهى في فيفاء لتناول القهوة والمشروبات."
            englishDescription="A coffee shop in Faifa serving coffee and drinks."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%84%D8%A8%20%D8%A7%D9%84%D9%82%D9%87%D9%88%D8%A9%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJPVihu2gL_RURTL0fmTwCk5s"
            icon={<Coffee />}
          />
          <PlaceCard
            title="غيمة – Cloud"
            description="مقهى على طريق طلعة فيفاء باتجاه بلغازي، مناسب للتوقف وتناول القهوة."
            englishDescription="A café along the road to Faifa near Balgazi."
            mapLink="https://www.google.com/maps/search/?api=1&query=Ghima%20Cloud%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJFX0E2xUN_RURNVdN1tkP49w"
            icon={<Coffee />}
          />
          <PlaceCard
            title="مقهى البرنسيسة"
            description="مقهى للقهوة والحلويات على الشارع العام في الجوه."
            englishDescription="A coffee and dessert café on the main road in Al-Jawwah."
            mapLink="https://www.google.com/maps/search/?api=1&query=Princessa%20Cafe%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJJajrZKML_RURgTzv0n4ADA8"
            icon={<Coffee />}
          />
          <PlaceCard
            title="مقهى روز بسنت النسائي"
            description="مقهى مخصص للنساء في فيفاء، مع جلسات مطلة على الطبيعة الجبلية."
            englishDescription="A women-only café with mountain-view seating."
            mapLink="https://www.google.com/maps/search/?api=1&query=Rose%20Basnat%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJcwE9kSwL_RURDeVHUtSGO6o"
            icon={<Coffee />}
          />
          <PlaceCard
            title="ديوانية واسع الخاطر"
            description="ديوانية وجلسات في محيط منتزه الخطم بفيفاء."
            englishDescription="A gathering spot near Al-Khatm Park in Faifa."
            mapLink="https://www.google.com/maps/search/?api=1&query=Wasee%20Alkhater%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJd2QoJQAL_RURET82j0TiqP0"
            icon={<Coffee />}
          />
          <PlaceCard
            title="أُلفة"
            description="مقهى في فيفاء لتناول القهوة والاستراحة."
            englishDescription="A café for coffee and a short break in Faifa."
            mapLink="https://www.google.com/maps/search/?api=1&query=Olfa%20Cafe%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJyXO1DQAL_RURUDrR1e0FWNg"
            icon={<Coffee />}
          />
          <PlaceCard
            title="مطعم ومقهى ريف وكيف"
            description="مطعم ومقهى بجلسات وإطلالات جبلية في فيفاء."
            englishDescription="A restaurant and café with mountain-view seating in Faifa."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%85%D8%B7%D8%B9%D9%85%20%D9%88%D9%85%D9%82%D9%87%D9%89%20%D8%B1%D9%8A%D9%81%20%D9%88%D9%83%D9%8A%D9%81%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJ40mu0xwL_RUR83PtQku4SJo"
            icon={<Coffee />}
          />
        </CategorySection>

        {/* Scenic photo spots */}
        <CategorySection id="photo-spots" title={t("أماكن سرية للتصوير", "Hidden Photo Spots")} icon={<Camera />}>
          <PlaceCard
            title="مطل العبسية"
            description="مطل مرتفع في فيفاء يتيح مشاهدة الجبال والمناظر المحيطة."
            englishDescription="The highest point in the mountain where one can sit anywhere."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%85%D8%B7%D9%84%20%D8%A7%D9%84%D8%B9%D8%A8%D8%B3%D9%8A%D8%A9%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJ67KW7CUL_RURLrq41W9qDig"
            icon={<Binoculars />}
          />
          <PlaceCard
            title="المصلى المعلق"
            description="مصلى معروف في فيفاء، يُستخدم لصلاة العيد والمناسبات الدينية."
            englishDescription="Famous hanging mosque for holidays and occasions."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D8%A7%D9%84%D9%85%D8%B5%D9%84%D9%89%20%D8%A7%D9%84%D9%85%D8%B9%D9%84%D9%82%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJJzfbcAAL_RURW7wYY9wcr8s"
            icon={<Church />}
          />
          <PlaceCard
            title="مطل اللعثة"
            description="إطلالة من مرتفعات اللعثة على جبال فيفاء والسهول المحيطة. موقع النقطة الدقيقة على الخرائط غير مؤكد."
            englishDescription="Scenic views from Al-Laathah highlands; exact map pin is not verified."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%85%D8%B7%D9%84%20%D8%A7%D9%84%D9%84%D8%B9%D8%AB%D8%A9%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1"
            icon={<Binoculars />}
          />
          <PlaceCard
            title="كهف فيفاء الأثري"
            description="كهف طبيعي في قرية الضحي بجبل الحكمي، وجهة لمحبي استكشاف المعالم الجبلية."
            englishDescription="A natural cave near Al-Duha village on Jabal Al-Hakami."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%83%D9%87%D9%81%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1%20%D8%A7%D9%84%D8%A3%D8%AB%D8%B1%D9%8A%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJaU3jMQAN_RURhKMaJ1wzJM4"
            icon={<Mountain />}
          />
          <PlaceCard
            title="المطل الزجاجي المعلق"
            description="إطلالة زجاجية معلقة للتصوير ومشاهدة جبال فيفاء. يُنصح بالتنسيق قبل الزيارة."
            englishDescription="A glass viewing platform for mountain photos; contact ahead before visiting."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D8%A7%D9%84%D9%85%D8%B7%D9%84%20%D8%A7%D9%84%D8%B2%D8%AC%D8%A7%D8%AC%D9%8A%20%D8%A7%D9%84%D9%85%D8%B9%D9%84%D9%82%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJr5DTdgAL_RURpVPQaHKkURk"
            icon={<Binoculars />}
          />
          <PlaceCard
            title="المطل الشهير بفيفاء"
            description="نقطة إطلالة جبلية طبيعية للتصوير ومشاهدة المدرجات والقمم."
            englishDescription="A natural mountain viewpoint overlooking Faifa's terraces and peaks."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D8%A7%D9%84%D9%85%D8%B7%D9%84%20%D8%A7%D9%84%D8%B4%D9%87%D9%8A%D8%B1%20%D8%A8%D9%81%D9%8A%D9%81%D8%A7%D8%A1%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJEYQ_xmIL_RURb3ekTzw0f5Q"
            icon={<Binoculars />}
          />
          <PlaceCard
            title="وادي الطرارة"
            description="وادٍ طبيعي وشلالات موسمية؛ تجنب مجرى الوادي أثناء الأمطار والسيول."
            englishDescription="A scenic valley with seasonal waterfalls; avoid the watercourse during rain and floods."
            mapLink="https://www.google.com/maps/search/?api=1&query=%D9%88%D8%A7%D8%AF%D9%8A%20%D8%A7%D9%84%D8%B7%D8%B1%D8%A7%D8%B1%D8%A9%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJUSVCadQN_RURQZdfj0c5GrE"
            icon={<Mountain />}
          />
        </CategorySection>
      </main>

      <Footer />
      <BackToTop />
    </div>
    </>
  );
};

export default Index;