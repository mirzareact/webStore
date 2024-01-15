import React, { useState, useRef } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";
import emailjs from "@emailjs/browser";

const Kontakt = () => {
  const [loading, setLoading] = useState(false);

  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();



    emailjs
      .sendForm(
        "service_deagmhi",
        "template_amutjg4",
        form.current,
        "luFdXXTm_vD7degnb"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };
  return (
    <div>
      <NavBar />
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div className="text-black">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
              <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-cent">
                Kontakt
              </h2>
              <p className="mb-8 lg:mb-16 font-light text-centesm:text-xl">
                Imate tehnički problem? Želite li poslati povratne informacije o
                proizvodu? Trebate detalje o našem poslovnom planu? Želite
                postaviti pitanje? Javite nam.
              </p>
              <form ref={form} onSubmit={sendEmail} className="space-y-8">
                <label className="block mb-2 text-xl font-semibold">
                  Vaš email
                </label>
                <input
                  type="email"
                  id="email"
                  name="user_email"
                  className="block p-3 w-full text-sm rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="inkoskakanj@gmail.com"
                  required
                />

                <label className="block mb-2 text-xl font-semibold">
                  Ime i prezime
                </label>
                <input
                  type="text"
                  id="subject"
                  name="user_name"
                  className="block p-3 w-full text-sm rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Vaš razlog poruke"
                  required
                />

                <label className="block mb-2 text-xl font-semibold">
                  Vaša poruka
                </label>
                <textarea
                  id="message"
                  rows="6"
                  name="message"
                  className="block p-3 w-full text-sm rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                  placeholder="Ostavi poruku..."
                ></textarea>

                <input
                  type="submit"
                  value="Pošalji"
                  className="py-3 px-5 text-sm font-bold text-center text-white rounded-lg bg-green_blue-400 hover:bg-old_lace-400 cursor-pointer transition-all duration-150"
                />
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Kontakt;
