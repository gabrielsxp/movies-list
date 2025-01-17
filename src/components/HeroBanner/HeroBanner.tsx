interface IHeroBanner { 
  title: string; 
  subtitle: string; 
  ctaText?: string; 
  ctaLink?: string; 
  backgroundImage: string; 
}

const HeroBanner = ({ title, subtitle, ctaText, ctaLink, backgroundImage }: IHeroBanner)=> {
  return (
    <div className="relative py-12 mb-8 flex items-center justify-center text-white rounded-lg">
      <div 
        className="absolute inset-0 bg-cover z-0 rounded-lg" 
        style={{backgroundImage: `url(${backgroundImage})`}}
        role="banner"
      />
      <div className="absolute inset-0 bg-black opacity-50 z-10 rounded-lg" />
      <div className="relative z-20 text-center">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-8">{subtitle}</p>
        {ctaLink && ctaText && <a 
          href={ctaLink} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          {ctaText}
        </a>}
      </div>
    </div>
  );
};

export default HeroBanner;
