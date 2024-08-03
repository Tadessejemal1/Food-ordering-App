import React from 'react'
import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from '@/components/layout/SectionHeader';
import { SessionProvider } from "next-auth/react";

const page = () => {
  return (
    <div>
      <Hero />
      <HomeMenu />
      <section className="text-center my-16" id="about">
        <SectionHeaders
          subHeader={'Our story'}
          mainHeader={'About us'}
        />
        <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>
          Welcome to FoodieGo, where we redefine the way you experience food delivery! Founded with a passion for connecting people with their favorite meals, we aim to make ordering food as delightful and seamless as possible.
          </p>
          <p>At FoodieGo, our mission is simple: to bring deliciousness to your doorstep with ease and efficiency. We understand that food is more than just sustenance; it’s about pleasure, convenience, and community.</p>
          <p>That’s why we work tirelessly to ensure you have access to a wide variety of high-quality restaurants and cuisines, all from the comfort of your home.</p>
        </div>
      </section>
      <section className="text-center my-8" id="contact">
        <SectionHeaders
          subHeader={'Don\'t hesitate'}
          mainHeader={'Contact us'}
        />
        <div className="mt-8">
          <a className="text-4xl underline text-gray-500" href="tel:+46738123123">
            +251 738 123 123
          </a>
        </div>
      </section>
    </div>
  )
}

export default page
