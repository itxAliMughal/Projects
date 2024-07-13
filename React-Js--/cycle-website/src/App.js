import "./App.css";
import bannerWatch from "./Images/asian-businessman-isolated-png.webp";

function App() {
  return (
    <>
      <div className="bg-black text-white font-sans">
        <header className="flex justify-between items-center p-6 container">
          <nav className="hidden md:flex space-x-8">
            <img
              src="https://www.datocms-assets.com/99008/1685443206-jacob-co-light.svg"
              alt=""
              className="w-60"
            ></img>
            <a href="#" className="hover:underline">
              Our Story
            </a>
            <a href="#" className="hover:underline">
              Online Boutique
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <span>EN</span>
            <button className="p-2">
              <img alt="menu" src="https://placehold.co/20x20" />
            </button>
          </div>
        </header>

        <div className="section-one">
          <section className="pl-40 py-20 w-6/12" data-aos="slide-right">
            <h2 className="text-lg uppercase tracking-widest text-6xl underline decoration-1">
              Traditional Watchmaker
            </h2>
            <h1 className="text-8xl md:text-8xl font-bold my-4 underline decoration-1">
              Incomparable Timepieces
            </h1>
            <p className="max-w-2xl mx-auto mb-8 mt-8 text-1xl underline decoration-1">
              Ambassador watches exceed the standard. They are not mediocre,
              common, or antiquated. But instead, are testaments to exceptional
              craftsmanship that are instant classics which transfix everyone.
              Be a part of greatness. Be an ambassador.
            </p>
            <button className="border border-white py-2 px-6 rounded-full hover:bg-white hover:text-black transition">
              Discover Models
            </button>
          </section>
          <section
            className="bg-cover bg-center banner-image"
            data-aos="slide-left"
          >
            &nbsp;
          </section>
        </div>

        <section className="pt-60 bg-black">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg text-center">
              <img
                src="https://placehold.co/300x300"
                alt="Heritage 1921"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Heritage 1921</h3>
              <p className="text-sm uppercase tracking-widest mb-4">
                40MM Silver Timepiece
              </p>
            </div>
            <div className="p-6 rounded-lg text-center">
              <img
                src="https://placehold.co/300x300"
                alt="Heritage 1863"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Heritage 1863</h3>
              <p className="text-sm uppercase tracking-widest mb-4">
                40MM Rosegold Timepiece
              </p>
            </div>
            <div className="p-6 rounded-lg text-center">
              <img
                src="https://placehold.co/300x300"
                alt="Heritage 1959"
                className="mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Heritage 1959</h3>
              <p className="text-sm uppercase tracking-widest mb-4">
                40MM Rosegold Timepiece
              </p>
            </div>
          </div>
        </section>

        <div className="text-white pt-20 container">
          <div className="section-three">
            <main className="banner-2">
              <img src={bannerWatch} />
            </main>
            <div className="inset-0 flex flex-col justify-center items-start md:p-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                I. The Original
              </h1>
              <p className="text-lg md:text-xl mb-6">
                This tale begins with our namesake's profession, the ambassador.
                Like all envoys, the original ambassador's job was to be the
                manifestation of his homeland on foreign soils. But, he was
                always different. Regardless of where his work took him, he
                stood out and became renowned for his refined taste for
                everything vintage.
              </p>
              <p className="text-lg md:text-xl mb-6">
                His suits were tailored to fit his mid 20th century style, his
                hair reflected a comb-over that many thought had been lost to
                another era, and his demeanor was class itself. He captivated
                crowds and demanded crisp perfection. The ambassador was
                timeless.
              </p>
              <button className="bg-transparent border border-white text-white py-2 px-4 rounded hover:bg-white hover:text-zinc-900 transition">
                Continue Reading
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 md:p-16 max-w-6xl mx-auto rounded-md rounded-lg rounded rounded-full">
            <img
              src="https://placehold.co/400x400"
              alt="Image 1"
              className="w-full h-auto object-cover rounded-lg"
            />
            <img
              src="https://placehold.co/400x400"
              alt="Image 2"
              className="w-full h-auto object-cover rounded-lg"
            />
            <img
              src="https://placehold.co/400x400"
              alt="Image 3"
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="bg-white text-zinc-900 p-8 md:p-16 rounded-full mb-20 mt-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join The Adventure
            </h2>
            <p className="text-lg md:text-xl">
              Here at Ambassador, we value all of our customers from all over
              the world. In an effort to connect with all of you, we challenge
              everyone to participate in our #ambassadorwatches journey! After
              purchasing your watch, take a picture of yourself with your new
              accessory and tag your photograph with #ambassadorwatches. We will
              then pick certain photos to feature on our website.
            </p>
          </div>
        </div>
        <div className="bg-black text-white text-center p-8">
          <p className="mb-4">
            Batch One and Batch Two both sold out in just a few weeks.
          </p>
          <p className="mb-4">
            We're excited to launch Batch Three on Thursday.
          </p>
          <p className="mb-8">Mark your calendars.</p>
          <button className="border border-white text-white py-2 px-6 rounded-full mb-8">
            VIEW COLLECTION
          </button>
          <div className="flex justify-center space-x-4 mb-8">
            <img
              src="https://placehold.co/20x20"
              alt="icon1"
              className="w-5 h-5"
            />
            <img
              src="https://placehold.co/20x20"
              alt="icon2"
              className="w-5 h-5"
            />
            <img
              src="https://placehold.co/20x20"
              alt="icon3"
              className="w-5 h-5"
            />
            <img
              src="https://placehold.co/20x20"
              alt="icon4"
              className="w-5 h-5"
            />
          </div>
          <div className="flex justify-center space-x-4 mb-8">
            <img
              src="https://placehold.co/50x20"
              alt="guarantee"
              className="w-auto h-5"
            />
            <img
              src="https://placehold.co/50x20"
              alt="warranty"
              className="w-auto h-5"
            />
          </div>
          <p className="text-xs text-zinc-500">
            Copyright © 2015 Olio Devices. All rights reserved.
          </p>
          <a href="#" className="text-xs text-zinc-500 underline">
            Unsubscribe
          </a>
        </div>
      </div>
    </>
  );
}

export default App;
