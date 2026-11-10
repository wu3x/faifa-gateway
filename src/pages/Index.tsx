import { Hotel, Trees, Coffee, Bed, Mountain, Binoculars, UtensilsCrossed, Tent, Home, Church, Instagram, ArrowUpLeft, CloudFog, Footprints, Camera } from "lucide-react";
import Header from "@/components/Header";
import Navigation from "@/components/Navigation";
import CategorySection from "@/components/CategorySection";
import PlaceCard from "@/components/PlaceCard";
import DeveloperSection from "@/components/DeveloperSection";
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

        <section id="discover" className="relative overflow-hidden bg-[#102e28] text-white">
          <div className="pointer-events-none absolute -left-32 -bottom-40 h-96 w-96 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -left-16 -bottom-32 h-80 w-80 rounded-full border border-white/10" />
          <div className="container relative mx-auto grid gap-12 px-6 py-20 md:grid-cols-[1fr_1.1fr] md:items-center md:px-10 md:py-28">
            <div>
              <div className="mb-5 flex items-center gap-3 text-xs font-bold tracking-widest text-[#c9d9b6]"><span className="h-px w-10 bg-[#c9d9b6]" />{t("مرحبًا بك في فيفاء", "WELCOME TO FAIFA")}</div>
              <h2 className="max-w-xl text-3xl font-bold leading-[1.6] md:text-5xl md:leading-[1.5]">{t("ليست مجرد وجهة…", "More than a destination…")}<span className="block text-[#d9e4bd]">{t("إنها تجربة تُعاش.", "A place to experience.")}</span></h2>
              <p className="mt-6 max-w-xl text-base leading-9 text-white/70">{t("من بيوت الجبل وطرقه المتعرجة، إلى رائحة البن وإطلالات الضباب. جمعنا لك الأماكن التي تستحق الزيارة لتصنع رحلتك بطريقتك.", "From mountain homes and winding roads to coffee aromas and misty views. Find places worth visiting and make the journey your own.")}</p>
              <a href="#parks" className="mt-8 inline-flex items-center gap-3 border-b border-[#d9e4bd] pb-2 text-sm font-bold text-[#d9e4bd] transition hover:gap-5">{t("اكتشف أجمل الإطلالات", "Discover the viewpoints")} <ArrowUpLeft size={18}/></a>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12"><div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur"><CloudFog className="mb-9 text-[#d9e4bd]" size={30}/><h3 className="text-xl font-bold">{t("فوق الغيم", "Above the clouds")}</h3><p className="mt-2 text-sm leading-7 text-white/65">{t("مطلات تلامس السماء", "Views that touch the sky")}</p></div><div className="rounded-3xl border border-white/15 bg-white/5 p-6"><Footprints className="mb-9 text-[#d9e4bd]" size={30}/><h3 className="text-xl font-bold">{t("دروب الجبل", "Mountain trails")}</h3><p className="mt-2 text-sm leading-7 text-white/65">{t("تفاصيل لا تُنسى", "Memories along the way")}</p></div></div>
              <div className="space-y-4"><div className="rounded-3xl border border-white/15 bg-white/5 p-6"><Coffee className="mb-9 text-[#d9e4bd]" size={30}/><h3 className="text-xl font-bold">{t("روح البن", "Coffee culture")}</h3><p className="mt-2 text-sm leading-7 text-white/65">{t("نكهة الأرض وأهلها", "A taste of the land")}</p></div><div className="rounded-3xl border border-white/15 bg-white/10 p-6 backdrop-blur"><Camera className="mb-9 text-[#d9e4bd]" size={30}/><h3 className="text-xl font-bold">{t("لحظات تستحق", "Picture-perfect")}</h3><p className="mt-2 text-sm leading-7 text-white/65">{t("لكل زاوية حكاية", "Every corner tells a story")}</p></div></div>
            </div>
          </div>
        </section>
        <main className="container mx-auto px-6 md:px-8 py-4 space-y-10">

        {/* Hotels Section */}
        <CategorySection
          id="hotels"
          title={t("الفنادق", "Hotels")}
          icon={<Hotel />}
        >
          <PlaceCard
            title="فندق جارة الغيم – Jarat Al Gheim Hotel"
            description="يتواجد مطل وكافيه في أعلى الفندق."
            englishDescription="Rooftop café with a panoramic view."
            mapLink="https://maps.app.goo.gl/aV8KzXz4JTAXTBPh6?g_st=ipc"
            icon={<Bed />}
          />
          <PlaceCard
            title="فندق فيفاء الفاخر – Faifa Luxury Hotel"
            description="يتواجد مطل وكافيه في أعلى الفندق."
            englishDescription="Rooftop café with a scenic view."
            mapLink="https://maps.app.goo.gl/WQnUcteQvjDkLqUb7?g_st=ipc"
            icon={<Bed />}
          />
          <PlaceCard
            title="فندق إيوان – Iwan Hotel"
            description="يتواجد مطل وكافيه في أعلى الفندق."
            englishDescription="Rooftop café with a scenic view."
            mapLink="https://maps.app.goo.gl/TvqSciP5UrBrPBNS8?g_st=ipc"
            icon={<Bed />}
          />
          <PlaceCard
            title="بيت سهلان"
            description="بيت عتيق أعيد بريح عصرية وهوية فيفية أصيلة."
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
        </CategorySection>

        {/* Parks Section */}
        <CategorySection
          id="parks"
          title={t("المنتزهات", "Parks & Resorts")}
          icon={<Trees />}
        >
          <PlaceCard
            title="منتزه وإطلالة الخطم – Al-Khatm Park & Viewpoint"
            description="منتزه متكامل للعائلة."
            englishDescription="Family-friendly park with great views."
            mapLink="https://maps.app.goo.gl/Cdfrj4YBB88aH2yf9?g_st=ipc"
            icon={<Mountain />}
          />
          <PlaceCard
            title="سوق النفيعة الشعبي"
            description="تجربة تسوق بروح فيفاء، حيث تلتقي المحلات التراثية بمنتجات الجبال الأصيلة، في بيئة تعبّر عن هوية المكان."
            mapLink="https://maps.app.goo.gl/TzAGVeryF34ooRbh7?g_st=ipc"
            icon={<Trees />}
          />
          <PlaceCard
            title="منتجع الباخرة – Al-Bakhira Resort"
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
            mapLink="https://maps.app.goo.gl/ex9dGXbr9Vu8gCnc8?g_st=ipc"
            icon={<Binoculars />}
          />
          <PlaceCard
            title="مطل قرضة – Qarza Viewpoint"
            mapLink="https://maps.app.goo.gl/yibESTRS7VWEYEKz6?g_st=ipc"
            icon={<Binoculars />}
          />
          <PlaceCard
            title="المصلى المعلق"
            description="مصلى للأعياد والمناسبات مشهور جداً."
            englishDescription="Famous hanging mosque for holidays and occasions."
            mapLink="https://maps.app.goo.gl/kxuvxMzVTKzSKJ7Y9?g_st=ipc"
            icon={<Church />}
          />
          <PlaceCard
            title="مطل العبسية"
            description="أعلى نقطة في الجبل يمكن لشخص الجلوس في أي مكان."
            englishDescription="The highest point in the mountain where one can sit anywhere."
            mapLink="https://maps.app.goo.gl/7oTLeZDz1Pbap2Tk8?g_st=ipc"
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
            description="مطل على الجبال من الأعلى."
            englishDescription="Mountaintop view from above."
            mapLink="https://maps.app.goo.gl/FekVqv8zkzj5Fuk97?g_st=ipc"
            icon={<Coffee />}
          />
          <PlaceCard
            title="مقهى ومطل إيوان – Iwan Café & Viewpoint"
            description="كافيه مع إطلالة جميلة."
            englishDescription="Café with a beautiful scenic view."
            mapLink="https://maps.app.goo.gl/yWadi31KNE7ykdN86?g_st=ipc"
            icon={<Coffee />}
          />
          <PlaceCard
            title="مقهى سكون"
            description="إطلالة جميلة ورائعة على الجبال."
            englishDescription="Beautiful and amazing view of the mountains."
            mapLink="https://maps.app.goo.gl/RA3bdJW8rLZzjTFi9?g_st=ipc"
            icon={<Coffee />}
          />
          <PlaceCard
            title="كافية تالقة"
            description="مقهى جديد وجميل واسم مقتبس من شجرة مُعمرة في الجبل."
            englishDescription="New and beautiful café named after an ancient tree in the mountain."
            mapLink="https://maps.app.goo.gl/9MfLxBT1AghGifAR8?g_st=ipc"
            icon={<Coffee />}
          />
          <PlaceCard
            title="لب القهوة"
            mapLink="https://maps.app.goo.gl/EJ1xKPEnpdgGF9Z3A?g_st=ipc"
            icon={<Coffee />}
          />
        </CategorySection>
      </main>

      {/* Interactive Map Section */}
      <div className="container mx-auto px-6">
        <InteractiveMap />
      </div>

      <div className="container mx-auto px-6 mb-12">
        <DeveloperSection />
      </div>

      <Footer />
      <BackToTop />
      <ChatModal />
    </div>
    </ChatOpenProvider>
  );
};

export default Index;