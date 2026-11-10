import { Hotel, Trees, Coffee, Bed, Mountain, Binoculars, UtensilsCrossed, Tent, Home, Church, Instagram } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import CategorySection from "@/components/CategorySection";
import PlaceCard from "@/components/PlaceCard";
import Footer from "@/components/Footer";
import CompactControlBar from "@/components/CompactControlBar";
import InteractiveMap from "@/components/InteractiveMap";
import BackToTop from "@/components/BackToTop";
import ChatModal from "@/components/ChatModal";
import { ChatOpenProvider } from "@/contexts/ChatOpenContext";
import { useLanguage } from "@/contexts/LanguageContext";


const Index = () => {
  const { lang, t } = useLanguage();
  const path = typeof window !== "undefined" ? window.location.pathname.replace(/\/+$/, "") || "/" : "/";
  const isRootPath = path === "/" || path === "/faifa-gateway";

  return (
    <ChatOpenProvider>
      <div className="min-h-screen bg-background" dir={lang === "ar" ? "rtl" : "ltr"}>
        {isRootPath && <Header />}
        <Navigation />
        <CompactControlBar />

        <main id="discover" className="container mx-auto px-6 md:px-8 py-4 space-y-10">

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
            mapLink="https://maps.app.goo.gl/aV8KzXz4JTAXTBPh6?g_st=ipc"
            icon={<Bed />}
          />
          <PlaceCard
            title="فندق فيفاء الفاخر – Faifa Luxury Hotel"
            description="يضم الفندق مقهى ومطلًا في الطابق العلوي."
            englishDescription="Rooftop café with a scenic view."
            mapLink="https://maps.app.goo.gl/WQnUcteQvjDkLqUb7?g_st=ipc"
            icon={<Bed />}
          />
          <PlaceCard
            title="فندق إيوان – Iwan Hotel"
            description="يضم الفندق مقهى ومطلًا في الطابق العلوي."
            englishDescription="Rooftop café with a scenic view."
            mapLink="https://maps.app.goo.gl/TvqSciP5UrBrPBNS8?g_st=ipc"
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
                className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg"
              >
                <Instagram size={16} />
                <span>للحجز والتواصل عبر الأنستقرام</span>
              </a>
            }
            mapLink="https://maps.app.goo.gl/ZgDkhJv2dHvs69oQ8?g_st=ipc"
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
            mapLink="https://maps.app.goo.gl/Cdfrj4YBB88aH2yf9?g_st=ipc"
            icon={<Mountain />}
          />
          <PlaceCard
            title="سوق النفيعة الشعبي"
            description="سوق شعبي يتيح التعرف على المنتجات المحلية وأجواء التسوق في فيفاء."
            mapLink="https://maps.app.goo.gl/TzAGVeryF34ooRbh7?g_st=ipc"
            icon={<Trees />}
          />
          <PlaceCard
            title="منتجع الباخرة – Al-Bakhira Resort"
            description="منتجع في فيفاء للاستراحة والاستمتاع بالأجواء الجبلية."
            englishDescription="A resort for relaxation amid Faifa’s mountain scenery."
            mapLink="https://maps.app.goo.gl/4No4mWgXs3vVz7CD7?g_st=ipc"
            icon={<Tent />}
          />
          <PlaceCard
            title="ممشى البن الخولاني – Khawlani Coffee Trail"
            description="ممشى سياحي مرتبط بتراث زراعة البن الخولاني."
            englishDescription="Coffee heritage walking trail."
            mapLink="https://maps.app.goo.gl/EkhwSPbHFqKNcyvs7?g_st=ipc"
            icon={<UtensilsCrossed />}
          />
          <PlaceCard
            title="مطل الدفرة – Al-Dafrah Viewpoint"
            description="مطل يتيح مشاهدة المناظر الجبلية في فيفاء."
            englishDescription="A viewpoint overlooking Faifa’s mountain scenery."
            mapLink="https://maps.app.goo.gl/ex9dGXbr9Vu8gCnc8?g_st=ipc"
            icon={<Binoculars />}
          />
          <PlaceCard
            title="مطل قرضة – Qarza Viewpoint"
            description="موقع لمشاهدة جبال فيفاء والتقاط الصور."
            englishDescription="A spot for mountain views and photography in Faifa."
            mapLink="https://maps.app.goo.gl/yibESTRS7VWEYEKz6?g_st=ipc"
            icon={<Binoculars />}
          />
          <PlaceCard
            title="المصلى المعلق"
            description="مصلى معروف في فيفاء، يُستخدم لصلاة العيد والمناسبات الدينية."
            englishDescription="Famous hanging mosque for holidays and occasions."
            mapLink="https://maps.app.goo.gl/kxuvxMzVTKzSKJ7Y9?g_st=ipc"
            icon={<Church />}
          />
          <PlaceCard
            title="مطل العبسية"
            description="مطل مرتفع في فيفاء يتيح مشاهدة الجبال والمناظر المحيطة."
            englishDescription="The highest point in the mountain where one can sit anywhere."
            mapLink="https://maps.app.goo.gl/7oTLeZDz1Pbap2Tk8?g_st=ipc"
            icon={<Binoculars />}
          />
          <PlaceCard
            title="إطلالة فيفا"
            description="مطل على طريق الأمير نايف يتيح مشاهدة المناظر الجبلية والتقاط الصور."
            englishDescription="A viewpoint on Prince Nayef Road overlooking the mountains."
            mapLink="https://www.google.com/maps/search/?api=1&query=Itlalat%20Fayfa%20%D9%81%D9%8A%D9%81%D8%A7%D8%A1&query_place_id=ChIJX85pNwAL_RURobW0_6Zxh7I"
            icon={<Binoculars />}
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
            mapLink="https://maps.app.goo.gl/Cjh7oPM5aX2QsdUR6?g_st=ipc"
            icon={<Coffee />}
          />
          <PlaceCard
            title="مقهى جارة الغيم – Jarat Al-Ghaim Café"
            description="مقهى بإطلالة مرتفعة على الجبال."
            englishDescription="Mountaintop view from above."
            mapLink="https://maps.app.goo.gl/FekVqv8zkzj5Fuk97?g_st=ipc"
            icon={<Coffee />}
          />
          <PlaceCard
            title="مقهى ومطل إيوان – Iwan Café & Viewpoint"
            description="مقهى مع جلسات مطلة على الطبيعة الجبلية."
            englishDescription="Café with a beautiful scenic view."
            mapLink="https://maps.app.goo.gl/yWadi31KNE7ykdN86?g_st=ipc"
            icon={<Coffee />}
          />
          <PlaceCard
            title="مقهى سكون"
            description="مقهى يوفر جلسات بإطلالة على جبال فيفاء."
            englishDescription="Beautiful and amazing view of the mountains."
            mapLink="https://maps.app.goo.gl/RA3bdJW8rLZzjTFi9?g_st=ipc"
            icon={<Coffee />}
          />
          <PlaceCard
            title="كافيه تالقة"
            description="مقهى يحمل اسمًا مستوحى من شجرة معمّرة في جبال فيفاء."
            englishDescription="New and beautiful café named after an ancient tree in the mountain."
            mapLink="https://maps.app.goo.gl/9MfLxBT1AghGifAR8?g_st=ipc"
            icon={<Coffee />}
          />
          <PlaceCard
            title="لب القهوة"
            description="مقهى في فيفاء لتناول القهوة والمشروبات."
            englishDescription="A coffee shop in Faifa serving coffee and drinks."
            mapLink="https://maps.app.goo.gl/EJ1xKPEnpdgGF9Z3A?g_st=ipc"
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
        </CategorySection>
      </main>

      {/* Interactive Map Section */}
      <div className="container mx-auto px-6">
        <InteractiveMap />
      </div>

      <Footer />
      <BackToTop />
      <ChatModal />
    </div>
    </ChatOpenProvider>
  );
};

export default Index;